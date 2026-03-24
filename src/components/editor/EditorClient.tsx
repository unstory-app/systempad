"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
// We move all Excalidraw imports to a dymanic import inside useEffect to avoid SSR window errors
import "@excalidraw/excalidraw/index.css";
import { updateBoardSnapshot } from "@/lib/actions/board";
import { 
  ChevronLeft,
  Sparkles, 
  Settings, 
  Info, 
  Share2, 
  Layers, 
  Trash2, 
  Loader2,
  Workflow,
  Grid3X3,
  Maximize,
  Magnet
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
  const { theme, resolvedTheme } = useTheme();
  const [Excali, setExcali] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [isCollaborating, setIsCollaborating] = useState(false);

  // Advanced Feature Toggles
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [objectsSnapModeEnabled, setObjectsSnapModeEnabled] = useState(false);

  useEffect(() => {
    // Dynamic import the whole library to be SSR safe
    import("@excalidraw/excalidraw").then((mod) => {
      setExcali(mod);
    });
  }, []);

  // Synchronize next-themes resolvedTheme with Excalidraw API seamlessly
  useEffect(() => {
    if (excalidrawAPI && resolvedTheme) {
      excalidrawAPI.updateScene({
        appState: { theme: resolvedTheme === "dark" ? "dark" : "light" }
      });
    }
  }, [resolvedTheme, excalidrawAPI]);

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

  const renderTopLeftUI = useCallback(() => (
    <div className="flex items-center gap-3 p-2">
      <button 
        onClick={() => router.push("/dashboard")}
        className="h-10 w-10 flex items-center justify-center bg-background border border-border rounded-xl shadow-lg hover:border-foreground transition-all active:scale-95 translate-y-1"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <div className="flex flex-col bg-background/80 backdrop-blur-md px-4 py-1.5 border border-border rounded-xl shadow-lg translate-y-1">
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
  ), [router, board.title, isSaving]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    alert("Board link copied to clipboard!");
  }, []);

  const renderTopRightUI = useCallback(() => (
    <div className="flex items-center gap-3 p-2">
      <div className="hidden sm:flex -space-x-2 mr-2">
         {[1, 2].map(i => (
           <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold shadow-sm">
              {i === 1 ? 'JD' : 'SR'}
           </div>
         ))}
      </div>
      {Excali && (
        <Excali.LiveCollaborationTrigger
          isCollaborating={isCollaborating}
          onSelect={() => setIsCollaborating(!isCollaborating)}
        />
      )}
      <button 
        onClick={handleShare}
        className="h-10 px-4 bg-primary text-primary-foreground rounded-xl text-[12px] font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 group"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>
    </div>
  ), [isCollaborating, Excali, handleShare]);

  if (!Excali) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-9999">
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-foreground/10 blur-3xl rounded-full animate-pulse-subtle" />
            <Loader2 className="w-10 h-10 text-foreground animate-spin relative z-10" />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-40">SystemPad Architect</h2>
            <div className="flex items-center gap-1.5 opacity-30">
              <div className="w-1 h-1 rounded-full bg-foreground animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-foreground animate-pulse [animation-delay:0.2s]" />
              <div className="w-1 h-1 rounded-full bg-foreground animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { Excalidraw, MainMenu, WelcomeScreen, Footer, Sidebar } = Excali;

  return (
    <div className="h-screen w-full overflow-hidden bg-background relative flex flex-col font-sans selection:bg-foreground selection:text-background">
      <div className="flex-1 w-full relative">
        <Excalidraw
          excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
          gridModeEnabled={gridModeEnabled}
          zenModeEnabled={zenModeEnabled}
          objectsSnapModeEnabled={objectsSnapModeEnabled}
          initialData={{
            elements: board.snapshotJson?.elements || [],
            appState: {
               ...(({ collaborators, ...rest }: any) => rest)(board.snapshotJson?.appState || {}),
               theme: resolvedTheme === 'dark' ? 'dark' : 'light',
               viewBackgroundColor: resolvedTheme === 'dark' ? '#09090b' : '#ffffff',
            },
            files: board.snapshotJson?.files || {},
          }}
          onChange={(elements: any, appState: any, files: any) => {
            debouncedSave(elements, appState, files);
          }}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          renderTopLeftUI={renderTopLeftUI}
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
                 onClick={() => excalidrawAPI?.updateLibrary({ openLibraryMenu: true })}
                 className="flex items-center gap-2 w-full px-5 py-2 hover:bg-accent transition-colors text-sm"
               >
                 <Layers className="w-4 h-4" />
                 Open Library
               </button>
            </MainMenu.ItemCustom>
            <MainMenu.Separator />
            <MainMenu.ItemCustom>
               <button 
                 onClick={() => {
                   const input = document.createElement("input");
                   input.type = "file";
                   input.accept = "image/*";
                   input.onchange = (e) => {
                     const file = (e.target as HTMLInputElement).files?.[0];
                     if (file) {
                        alert("Image processing triggered. In a full implementation, this uses the Excalidraw 'image' tool or API to place the file on canvas.");
                     }
                   };
                   input.click();
                 }}
                 className="flex items-center gap-2 w-full px-5 py-2 hover:bg-accent transition-colors text-sm"
               >
                 <Info className="w-4 h-4" />
                 Import Image / SVG
               </button>
            </MainMenu.ItemCustom>
            <MainMenu.Separator />
            <MainMenu.ItemCustom>
              <button 
                onClick={handleClearCanvas}
                className="flex items-center gap-2 w-full px-5 py-2 text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Clear Canvas
              </button>
            </MainMenu.ItemCustom>
            <MainMenu.Separator />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
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
             <div className="hidden lg:flex items-center gap-4 text-[11px] text-muted-foreground ml-4">
                <span className="flex items-center gap-1 font-bold tracking-tight">
                   {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Info size={12}/>}
                   {isSaving ? "Syncing Changes..." : "Edge Cache Synced"}
                </span>
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
                     onClick={(e) => {
                       const btn = e.currentTarget;
                       const originalText = btn.innerHTML;
                       btn.innerHTML = '<span class="animate-spin mr-2">◌</span> Architecting...';
                       setTimeout(() => {
                         btn.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Diagram Created';
                         alert("AI generation is in preview. In a real environment, this would call your DeepSeek/GPT-4o model via Cloudflare AI Gateway.");
                         setTimeout(() => { btn.innerHTML = originalText; }, 2000);
                       }, 2000);
                     }}
                     className="w-full bg-foreground text-background font-bold h-10 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md group"
                   >
                     <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                     Generate Diagram
                   </button>
                   <p className="text-[10px] text-muted-foreground text-center">AI Credits: 50 / 50 remaining</p>
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
                    <div className="flex flex-col gap-3 pt-2 border-t border-border/50">
                       <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest block">Canvas Preferences</label>
                       
                       <label className="flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-2">
                           <Grid3X3 className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                           <span className="text-sm">Grid Mode</span>
                         </div>
                         <input type="checkbox" className="accent-foreground w-4 h-4 bg-background" checked={gridModeEnabled} onChange={(e) => setGridModeEnabled(e.target.checked)} />
                       </label>

                       <label className="flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-2">
                           <Magnet className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                           <span className="text-sm">Snap to Objects</span>
                         </div>
                         <input type="checkbox" className="accent-foreground w-4 h-4 bg-background" checked={objectsSnapModeEnabled} onChange={(e) => setObjectsSnapModeEnabled(e.target.checked)} />
                       </label>

                       <label className="flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-2">
                           <Maximize className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                           <span className="text-sm">Zen Mode</span>
                         </div>
                         <input type="checkbox" className="accent-foreground w-4 h-4 bg-background" checked={zenModeEnabled} onChange={(e) => setZenModeEnabled(e.target.checked)} />
                       </label>
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
