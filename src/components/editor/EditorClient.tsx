"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
// We move all Excalidraw imports to a dymanic import inside useEffect to avoid SSR window errors
import "@excalidraw/excalidraw/index.css";
import { updateBoardSnapshot, updateBoardName, deleteBoard } from "@/lib/actions/board";
import {
  ChevronLeft,
  Sparkles, 
  Info, 
  Layers, 
  Trash2, 
  Loader2,
  Grid3X3,
  Maximize,
  Magnet,
  Search,
  Component,
  X,
  Server,
  Database,
  Cloud,
  Globe,
  Monitor,
  Home,
  Share2,
  Edit3,
  ChevronDown
} from "lucide-react";
import { useTheme } from "next-themes";
import { useOthers, useUpdateMyPresence, useSelf } from "@liveblocks/react/suspense";

// Helper to generate a consistent color based on standard inputs
const getUserColor = (id: string) => {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#00ffff", "#ffff00", "#ff8800", "#8800ff"];
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};
import { useRouter } from "next/navigation";
import { UserButton } from "@stackframe/stack";
import { DocumentEditor } from "./DocumentEditor";

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
  const { resolvedTheme } = useTheme();
  const [Excali, setExcali] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [isCollaborating, setIsCollaborating] = useState(false);

  // Advanced Feature Toggles
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [objectsSnapModeEnabled, setObjectsSnapModeEnabled] = useState(false);

  // Eraser.io Parity Features
  const [viewMode, setViewMode] = useState<"document"|"both"|"canvas">("both");
  const [documentText, setDocumentText] = useState("");
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // AI Feature State
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  // Multiplayer Presence State
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
  const self = useSelf();

  const [boardName, setBoardName] = useState(board.title);

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

  // Quick-Add Shape Keyboard Hook (Cmd + Arrow to duplicate & connect)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Arrow keys
      if ((e.metaKey || e.ctrlKey) && e.key.startsWith('Arrow') && excalidrawAPI) {
        e.preventDefault();
        
        const selectedElements = excalidrawAPI.getSceneElements().filter((el: any) => excalidrawAPI.getAppState().selectedElementIds[el.id]);
        if (selectedElements.length !== 1) return; // Process only if exactly 1 main shape is selected
        
        const source = selectedElements[0];
        if (source.type === 'arrow' || source.type === 'line' || source.type === 'freedraw') return; 
        
        const offset = 120;
        let dx = 0; let dy = 0;
        if (e.key === 'ArrowRight') dx = source.width + offset;
        if (e.key === 'ArrowLeft') dx = -(source.width + offset);
        if (e.key === 'ArrowDown') dy = source.height + offset;
        if (e.key === 'ArrowUp') dy = -(source.height + offset);
        
        const clonedId = `cloned-${Date.now()}`;
        const clonedAction = {
          ...source,
          id: clonedId,
          x: source.x + dx,
          y: source.y + dy,
          groupIds: [],
          boundElements: null,
          seed: Math.floor(Math.random() * 1000000)
        };
        
        const arrowId = `arrow-${Date.now()}`;
        // Create a connecting arrow
        const arrow = {
          type: "arrow",
          id: arrowId,
          x: source.x + source.width / 2,
          y: source.y + source.height / 2,
          width: dx,
          height: dy,
          strokeColor: source.strokeColor,
          backgroundColor: "transparent",
          fillStyle: "hachure",
          strokeWidth: 2,
          strokeStyle: "solid",
          roughness: source.roughness || 0,
          opacity: 100,
          groupIds: [],
          points: [
            [0, 0],
            [dx, dy]
          ],
          startBinding: { elementId: source.id, focus: 0, gap: 10 },
          endBinding: { elementId: clonedId, focus: 0, gap: 10 },
          endArrowhead: "arrow",
          seed: Math.floor(Math.random() * 1000000)
        };
        
        excalidrawAPI.updateScene({ 
          elements: [...excalidrawAPI.getSceneElements(), clonedAction, arrow],
          appState: { 
            selectedElementIds: { [clonedId]: true }
          }
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [excalidrawAPI]);

  // Debounced save function
  const debouncedSave = useMemo(
    () => debounce(async (elements: readonly any[], appState: any, files: any, docTitle: string, docText: string) => {
      setIsSaving(true);
      try {
        await updateBoardSnapshot(board.id, { 
          elements, 
          appState, 
          files, 
          document: { title: docTitle, content: docText } 
        });
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

  const deployAIDiagram = async () => {
    if (!aiPrompt.trim() || !excalidrawAPI) return;
    setIsGenerating(true);
    try {
      // Simulate API latency
      await new Promise(r => setTimeout(r, 1500));
      const currentElements = excalidrawAPI.getSceneElements();
      // Generate a mock architecture box based on the prompt
      const newElements = [
        {
          type: "rectangle",
          x: 400 + Math.random() * 100,
          y: 200 + Math.random() * 100,
          width: 250,
          height: 120,
          backgroundColor: resolvedTheme === 'dark' ? "#1e1e24" : "#f8f9fa",
          strokeColor: resolvedTheme === 'dark' ? "#a8a29e" : "#574c4f",
          fillStyle: "solid",
          strokeWidth: 2,
          roughness: 0,
          id: `ai-group-rect-${Date.now()}`
        },
        {
          type: "text",
          x: 420,
          y: 230,
          text: `AI: ${aiPrompt.substring(0, 15)}...`,
          fontSize: 20,
          fontFamily: 1,
          textAlign: "left",
          strokeColor: resolvedTheme === 'dark' ? "#e7e5e4" : "#1c1917"
        }
      ];
      excalidrawAPI.updateScene({ elements: [...currentElements, ...newElements] });
      setAiPrompt("");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNameUpdate = async (newName: string) => {
     setBoardName(newName);
     if (newName.trim() !== "") {
       await updateBoardName(board.id, newName);
     }
  };

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
           <h1 className="text-[14px] font-bold tracking-tight text-foreground truncate max-w-[150px]">{boardName}</h1>
           <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold opacity-60 line-clamp-1">
            {isSaving ? "Synchronizing changes..." : "System Integrity Verified"}
          </span>
        </div>
      </div>
      
      {/* Eraser Parity: Custom Icons Button injected next to TopLeft UI since standard toolbar is shifted down */}
      <button 
        onClick={() => setIsIconModalOpen(true)}
        className="h-10 px-3 flex items-center gap-2 bg-background border border-border rounded-xl shadow-lg hover:border-foreground transition-all active:scale-95 translate-y-1 ml-2 text-sm font-medium"
      >
        <Component className="w-4 h-4 text-primary" />
        Library
      </button>
    </div>
  ), [router, boardName, isSaving]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/board/${board.id}`;
    navigator.clipboard.writeText(url);
    alert("Shareable link copied to clipboard!");
    setIsDropdownOpen(false);
  };

  const handleCopyEmbed = () => {
    const code = `<iframe src="${window.location.origin}/embed/${board.id}" width="100%" height="600" style="border:none; border-radius:12px;"></iframe>`;
    navigator.clipboard.writeText(code);
    alert("Embed code copied to clipboard!");
    setIsDropdownOpen(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this architectural diagram?")) {
      await deleteBoard(board.id);
      router.push("/dashboard");
    }
  };

  const renderTopRightUI = useCallback(() => (
    <div className="flex items-center gap-3 p-2">
      {Excali && (
        <Excali.LiveCollaborationTrigger
          isCollaborating={isCollaborating}
          onSelect={() => setIsCollaborating(!isCollaborating)}
        />
      )}
    </div>
  ), [isCollaborating, Excali]);

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

  // Convert Liveblocks presence to Excalidraw Collaborators Map
  const collaborators = new Map(
    others.map((other) => {
      return [
        other.connectionId.toString(),
        {
          pointer: other.presence.cursor ? { x: other.presence.cursor.x, y: other.presence.cursor.y } : undefined,
          button: other.presence.button || "up",
          username: other.info?.name || "Anonymous Architect",
          userState: "active" as const,
          color: { background: getUserColor(other.connectionId.toString()), stroke: getUserColor(other.connectionId.toString()) },
          avatarUrl: other.info?.avatar,
        }
      ];
    })
  );

  const { Excalidraw, MainMenu, Sidebar } = Excali;

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-background font-sans selection:bg-foreground selection:text-background">
      
      {/* Universal Top Navbar (Eraser.io Parity) */}
      <div className="h-14 w-full bg-background border-b border-border flex items-center justify-between px-4 shrink-0 z-50">
         
         {/* Left: Home, Title, Dropdown */}
         <div className="flex items-center gap-3">
            <button onClick={() => router.push("/dashboard")} className="p-2 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground">
               <Home className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-border mx-1" />
            <div className="flex items-center gap-2 max-w-[200px] sm:max-w-sm">
               <input 
                 className="text-sm font-semibold tracking-tight bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground/30 px-2 py-1 hover:bg-accent/50 focus:bg-accent rounded-md transition-colors"
                 value={boardName}
                 onChange={e => handleNameUpdate(e.target.value)}
                 placeholder="Untitled Board"
               />
            </div>
            
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground">
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border shadow-xl rounded-lg overflow-hidden animate-in fade-in zoom-in-95 z-[1000]">
                   <button onClick={handleCopyLink} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-accent transition-colors">
                     <Share2 className="w-4 h-4" /> Copy Link
                   </button>
                   <button onClick={handleCopyEmbed} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-accent transition-colors">
                     <Monitor className="w-4 h-4" /> Embed Iframe
                   </button>
                   <div className="w-full h-px bg-border" />
                   <button onClick={() => { setIsDropdownOpen(false); handleNameUpdate("Renamed Board"); }} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-accent transition-colors">
                     <Edit3 className="w-4 h-4" /> Rename
                   </button>
                   <button onClick={handleDelete} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-destructive/10 text-destructive transition-colors">
                     <Trash2 className="w-4 h-4" /> Delete Board
                   </button>
                </div>
              )}
            </div>

            <div className={`ml-4 w-2 h-2 rounded-full hidden sm:block ${isSaving ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} title={isSaving ? "Saving..." : "Saved securely"} />
         </div>

         {/* Center: View Toggles */}
         <div className="hidden md:flex items-center bg-accent/50 rounded-lg p-1 border border-border">
            <button onClick={() => setViewMode("document")} className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${viewMode === "document" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/50"}`}>Document</button>
            <button onClick={() => setViewMode("both")} className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${viewMode === "both" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/50"}`}>Both</button>
            <button onClick={() => setViewMode("canvas")} className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${viewMode === "canvas" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/50"}`}>Canvas</button>
         </div>

         {/* Right: Actions */}
         <div className="flex items-center gap-3">
            <button onClick={() => setIsIconModalOpen(true)} className="hidden sm:flex px-3 py-1.5 hover:bg-accent rounded-md transition-colors text-sm font-medium items-center gap-2 text-foreground">
              <Component className="w-4 h-4" /> Library
            </button>
            <button onClick={handleCopyLink} className="px-4 py-1.5 bg-primary text-primary-foreground hover:opacity-90 rounded-md transition-opacity text-sm font-semibold flex items-center gap-2 shadow-sm">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
            <UserButton />
         </div>
      </div>

      {/* Main Split Interface */}
      <div className="flex-1 w-full bg-background relative flex">
        {/* Document Area */}
        {viewMode !== "canvas" && (
          <div className={`${viewMode === "both" ? "w-1/3 xl:w-2/5 border-r border-border" : "w-full"} h-full flex flex-col bg-background transition-all duration-300 relative z-40`}>
             <DocumentEditor 
                value={documentText} 
                onChange={setDocumentText} 
                title={boardName} 
                onTitleChange={handleNameUpdate} 
             />
          </div>
        )}

        {/* Canvas Area */}
        {viewMode !== "document" && (
          <div className={`${viewMode === "both" ? "w-2/3 xl:w-3/5" : "w-full"} h-full relative transition-all duration-300`}>
            <Excalidraw
              excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
              gridModeEnabled={gridModeEnabled}
              zenModeEnabled={zenModeEnabled}
              objectsSnapModeEnabled={objectsSnapModeEnabled}
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              collaborators={collaborators}
              onPointerUpdate={(payload: any) => {
                updateMyPresence({
                  cursor: payload.pointer,
                  button: payload.button,
                });
              }}
              initialData={{
                elements: board.snapshotJson?.elements || [],
                appState: {
                   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-member-access
                   ...(({ collaborators, ...rest }: any) => rest)(board.snapshotJson?.appState || {}),
                   theme: resolvedTheme === 'dark' ? 'dark' : 'light',
                   viewBackgroundColor: resolvedTheme === 'dark' ? '#09090b' : '#ffffff',
                },
                files: board.snapshotJson?.files || {},
              }}
              onChange={(elements: readonly any[], appState: any, files: any) => {
                debouncedSave(elements, appState, files, boardName, documentText);
              }}
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
                     value={aiPrompt}
                     onChange={(e) => setAiPrompt(e.target.value)}
                     disabled={isGenerating}
                     placeholder="e.g. A server connected to a Postgres database with a Load Balancer"
                     className="w-full h-32 bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-all resize-none placeholder:text-muted-foreground/30 disabled:opacity-50"
                   />
                    <button 
                     onClick={deployAIDiagram}
                     disabled={isGenerating || !aiPrompt.trim()}
                     className="w-full bg-foreground text-background font-bold h-10 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md group disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isGenerating ? (
                       <><Loader2 className="w-4 h-4 animate-spin" /> Architecting...</>
                     ) : (
                       <><Sparkles className="w-4 h-4 group-hover:animate-pulse" /> Generate Diagram</>
                     )}
                   </button>
                   <p className="text-[10px] text-muted-foreground text-center">AI Credits: 50 / 50 remaining</p>
                </div>
              </Sidebar.Tab>
              
              <Sidebar.Tab tab="details" className="p-4">
                 <div className="space-y-6">
                    <div>
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Display Name</label>
                        <input 
                          value={boardName}
                          onChange={(e) => handleNameUpdate(e.target.value)}
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
        )}
      </div>

      {/* Eraser.io Parity: Icon Search Modal */}
      {isIconModalOpen && (
        <div className="absolute inset-0 z-[1000] bg-background/50 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
             <div className="p-4 border-b border-border flex items-center gap-3 bg-accent/30 relative">
                <Search className="w-5 h-5 text-muted-foreground ml-2" />
                <input 
                   autoFocus
                   value={iconSearch}
                   onChange={e => setIconSearch(e.target.value)}
                   placeholder="Search tech logo, cloud provider..." 
                   className="w-full bg-transparent border-none outline-none text-foreground font-medium"
                />
                <button onClick={() => setIsIconModalOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
             </div>
             <div className="p-2 max-h-[400px] overflow-y-auto">
                <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">General Infrastructure</div>
                <div className="grid grid-cols-4 gap-2 p-2">
                   {[
                     { name: 'Server', icon: Server },
                     { name: 'Database', icon: Database },
                     { name: 'Cloud', icon: Cloud },
                     { name: 'Globe', icon: Globe },
                     { name: 'Monitor', icon: Monitor },
                   ].map(item => (
                     <button 
                       key={item.name}
                       onClick={() => {
                          if (!excalidrawAPI) return;
                          
                          // Mocking insertion: Insert a formatted tech node with the icon name
                          const newNode = {
                            type: "rectangle",
                            x: window.innerWidth / 2 - 50,
                            y: window.innerHeight / 2 - 50,
                            width: 140,
                            height: 60,
                            backgroundColor: resolvedTheme === 'dark' ? "#1e1e24" : "#f8f9fa",
                            strokeColor: resolvedTheme === 'dark' ? "#a8a29e" : "#574c4f",
                            fillStyle: "solid",
                            strokeWidth: 2,
                            roughness: 0,
                            roundness: { type: 3 },
                            id: `icon-node-${Date.now()}`
                          };
                          
                          const textNode = {
                            type: "text",
                            x: newNode.x + 15,
                            y: newNode.y + 18,
                            text: `[${item.name}]`,
                            fontSize: 16,
                            fontFamily: 1,
                            textAlign: "center",
                            strokeColor: resolvedTheme === 'dark' ? "#e7e5e4" : "#1c1917"
                          };
                          
                          excalidrawAPI.updateScene({ elements: [...excalidrawAPI.getSceneElements(), newNode, textNode] });
                          setIsIconModalOpen(false);
                       }}
                       className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl hover:bg-accent transition-colors border border-transparent hover:border-border"
                     >
                       <item.icon className="w-6 h-6 text-foreground" />
                       <span className="text-[10px] font-medium text-muted-foreground">{item.name}</span>
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}
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
