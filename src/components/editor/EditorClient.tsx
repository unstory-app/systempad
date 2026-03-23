"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
// We move all Excalidraw imports to a dymanic import inside useEffect to avoid SSR window errors
import { updateBoardSnapshot } from "@/lib/actions/board";
import { 
  ChevronLeft,
  Sparkles, 
  Settings, 
  Info, 
  Share2, 
  Layers, 
  Trash2, 
  History as LucideHistory,
  Workflow,
  Loader2
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface EditorClientProps {
  board: {
    id: string;
    title: string;
    snapshotJson: {
      elements?: readonly any[];
      appState?: any;
      files?: any;
    } | null;
  };
}

export function EditorClient({ board }: EditorClientProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const [Excali, setExcali] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [isCollaborating, setIsCollaborating] = useState(false);

  useEffect(() => {
    // Dynamic import the whole library to be SSR safe
    import("@excalidraw/excalidraw").then((mod) => {
      setExcali(mod);
    });
  }, []);

  // Debounced save function
  const debouncedSave = useMemo(
    () => debounce(async (elements: readonly any[], appState: any, files: any) => {
      setIsSaving(true);
      try {
        await updateBoardSnapshot(board.id, { elements, appState, files });
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setTimeout(() => setIsSaving(false), 800);
      }
    }, 2000),
    [board.id]
  );

  const handleClearCanvas = useCallback(() => {
    if (excalidrawAPI && window.confirm("Clear entire canvas?")) {
      excalidrawAPI.resetScene();
    }
  }, [excalidrawAPI]);

  const renderTopRightUI = useCallback(() => (
    <div className="flex items-center gap-3 p-2">
      <div className="flex -space-x-2 mr-2">
         {[1, 2].map(i => (
           <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold shadow-sm">
              {i === 1 ? 'JD' : 'SR'}
           </div>
         ))}
         <div className="w-8 h-8 rounded-full border-2 border-background bg-foreground text-background flex items-center justify-center text-[10px] font-bold shadow-sm">
            +3
         </div>
      </div>
      {Excali && (
        <Excali.LiveCollaborationTrigger
          isCollaborating={isCollaborating}
          onSelect={() => setIsCollaborating(!isCollaborating)}
        />
      )}
      <button className="h-10 px-5 bg-foreground text-background rounded-xl text-[12px] font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 group">
        <Share2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
        Share Prototype
      </button>
    </div>
  ), [isCollaborating, Excali]);

  if (!Excali) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="w-8 h-8 animate-spin text-foreground/20" />
           <span className="text-[12px] font-bold tracking-widest text-muted-foreground uppercase opacity-50">Initializing System Architect...</span>
        </div>
      </div>
    );
  }

  const { Excalidraw, MainMenu, WelcomeScreen, Footer, Sidebar } = Excali;

  return (
    <div className="h-screen w-full overflow-hidden bg-background relative flex flex-col font-sans selection:bg-foreground selection:text-background">
      {/* Premium Header Overlay */}
      <div className="absolute top-4 left-4 z-[999] flex items-center gap-3">
        <button 
          onClick={() => router.push("/dashboard")}
          className="h-10 w-10 flex items-center justify-center bg-background border border-border rounded-xl shadow-lg hover:border-foreground transition-all active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex flex-col bg-background/80 backdrop-blur-md px-4 py-1.5 border border-border rounded-xl shadow-lg">
          <div className="flex items-center gap-2">
             <h1 className="text-[14px] font-bold tracking-tight text-foreground truncate max-w-[150px]">{board.title}</h1>
             <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold opacity-60 line-clamp-1">
              {isSaving ? "Synchronizing changes..." : "System Integrity Verified"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <Excalidraw
          excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
          initialData={{
            elements: board.snapshotJson?.elements || [],
            appState: {
               // Defensive: remove properties that shouldn't be restored or have incompatible types (like Map)
               ...(({ collaborators, ...rest }: any) => rest)(board.snapshotJson?.appState || {}),
               theme: theme === 'dark' ? 'dark' : 'light',
               viewBackgroundColor: theme === 'dark' ? '#09090b' : '#ffffff',
            },
            files: board.snapshotJson?.files || {},
          }}
          onChange={(elements: any, appState: any, files: any) => {
            debouncedSave(elements, appState, files);
          }}
          theme={theme === "dark" ? "dark" : "light"}
          renderTopRightUI={renderTopRightUI}
          UIOptions={{
            canvasActions: {
              loadScene: false,
              saveToActiveFile: false,
              toggleTheme: true,
              export: { saveFileToDisk: true },
            },
            tools: { image: true },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.Export />
            <MainMenu.Separator />
            <MainMenu.ItemCustom>
              <button 
                onClick={handleClearCanvas}
                className="flex items-center gap-2 w-full px-4 py-2 text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Clear Canvas
              </button>
            </MainMenu.ItemCustom>
            <MainMenu.DefaultItems.ChangeCanvasBackground />
            <MainMenu.Separator />
            <MainMenu.DefaultItems.ToggleTheme />
            <MainMenu.DefaultItems.Help />
          </MainMenu>

          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Hints.HelpHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Logo>
                <div className="w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center mb-4 rotate-3 hover:rotate-0 transition-transform shadow-xl border border-border">
                  <Workflow className="w-10 h-10 text-background" />
                </div>
              </WelcomeScreen.Center.Logo>
              <WelcomeScreen.Center.Heading>SystemPad Architect</WelcomeScreen.Center.Heading>
              <WelcomeScreen.Center.Menu>
                <WelcomeScreen.Center.MenuItemLoadScene />
                <WelcomeScreen.Center.MenuItemHelp />
              </WelcomeScreen.Center.Menu>
            </WelcomeScreen.Center>
          </WelcomeScreen>

          <Footer>
             <Sidebar.Trigger 
               name="advanced" 
               icon={<Sparkles size={16} />} 
               title="AI & Settings"
               className="bg-accent/50 hover:bg-accent transition-colors border border-border" 
             />
             <div className="hidden md:flex items-center gap-4 text-[11px] text-muted-foreground ml-4">
                <span className="flex items-center gap-1">
                   {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Info size={12}/>}
                   {isSaving ? "Saving binary data..." : "Auto-save active"}
                </span>
                <span className="flex items-center gap-1"><LucideHistory size={12}/> Vercel Edge Cache Enabled</span>
             </div>
          </Footer>
          
          <Sidebar name="advanced">
            <Sidebar.Header>
               <div className="flex items-center gap-2 px-2 py-1">
                  <Sparkles className="w-4 h-4 text-foreground" />
                  <span className="font-bold tracking-tight">Advanced Module</span>
               </div>
            </Sidebar.Header>
            <Sidebar.Tabs>
              <Sidebar.Tab tab="ai">
                 <div className="flex items-center gap-2 px-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Diagrammer</span>
                 </div>
              </Sidebar.Tab>
              <Sidebar.Tab tab="details">
                 <div className="flex items-center gap-2 px-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Configuration</span>
                 </div>
              </Sidebar.Tab>
              
              <Sidebar.TabTriggers>
                <Sidebar.TabTrigger tab="ai">AI</Sidebar.TabTrigger>
                <Sidebar.TabTrigger tab="details">Settings</Sidebar.TabTrigger>
              </Sidebar.TabTriggers>

              <Sidebar.Tab tab="ai" className="p-4 flex flex-col gap-6">
                <div className="p-4 bg-accent/30 rounded-xl border border-border/50">
                  <p className="text-[13px] font-medium leading-relaxed">
                    Instantly transform architectural descriptions into visual diagrams.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                   <textarea 
                     placeholder="e.g. A server connected to a Postgres database with a Load Balancer"
                     className="w-full h-32 bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-all resize-none placeholder:text-muted-foreground/30"
                   />
                   <button 
                     disabled
                     className="w-full bg-foreground text-background font-bold h-10 rounded-lg opacity-50 cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md"
                   >
                     <Sparkles className="w-4 h-4" />
                     Generate Diagram
                   </button>
                   <p className="text-[10px] text-muted-foreground text-center">AI Credits: 50 / 50 remaining</p>
                </div>
                <div className="mt-8 border-t border-border pt-6">
                   <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Quick Templates</h4>
                   <div className="grid grid-cols-2 gap-2">
                      {["Microservices", "Event Driven", "Cloud Native", "VPC Layout"].map(t => (
                        <button key={t} className="p-2 border border-border rounded-md text-[11px] hover:bg-accent transition-colors text-left font-medium">
                          {t}
                        </button>
                      ))}
                   </div>
                </div>
              </Sidebar.Tab>
              
              <Sidebar.Tab tab="details" className="p-4">
                 <div className="space-y-6">
                    <div>
                       <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Display Name</label>
                       <input 
                         defaultValue={board.title}
                         className="w-full bg-background border border-border rounded-lg p-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-foreground"
                       />
                    </div>
                    <div>
                       <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Architectural Standard</label>
                       <select className="w-full bg-background border border-border rounded-lg p-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-foreground appearance-none">
                          <option>Excalidraw Default</option>
                          <option>UML Standard</option>
                          <option>AWS Architecture</option>
                          <option>Google Cloud</option>
                       </select>
                    </div>
                    <div className="pt-6 border-t border-border">
                       <button className="flex items-center gap-2 text-[12px] font-medium text-foreground p-2 rounded-lg hover:bg-accent w-full transition-colors">
                          <Settings className="w-4 h-4" />
                          Advanced Environment Settings
                       </button>
                    </div>
                 </div>
              </Sidebar.Tab>
            </Sidebar.Tabs>
          </Sidebar>
        </Excalidraw>
      </div>
    </div>
  );
}

// Simple debounce helper
function debounce<T extends (...args: any[]) => any>(fn: T, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}
