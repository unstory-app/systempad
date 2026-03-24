"use client";

import { useState } from "react";
import { Plus, LayoutGrid, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { createBoard, deleteBoard, getBoardsByWorkspace } from "@/lib/actions/board";
import { BoardCard } from "./BoardCard";

interface DashboardClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialBoards: any[];
  workspaceId: string;
  userId: string;
}

export function DashboardClient({ initialBoards, workspaceId, userId }: DashboardClientProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  const { data: boards, mutate } = useSWR(
    workspaceId ? `boards-${workspaceId}` : null,
    () => getBoardsByWorkspace(workspaceId),
    { fallbackData: initialBoards }
  );

  const handleCreateBoard = async () => {
    if (!workspaceId || isSaving) return;
    setIsSaving(true);
    try {
      const b = await createBoard(workspaceId, userId);
      router.push(`/board/${b.id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBoard = async (id: string) => {
    try {
      await deleteBoard(id);
      mutate();
    } catch (e) {
      console.error("Failed to delete board:", e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-display font-medium tracking-tight">Boards</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and design your system architectures.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <Button variant="outline" size="icon" className="h-9 w-9">
              <LayoutGrid className="w-4 h-4" />
           </Button>
           <Button variant="default" className="h-9 font-bold px-4" onClick={handleCreateBoard} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
              New Board
           </Button>
        </div>
      </div>

      {!boards || boards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-border rounded-2xl bg-accent/10">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-1">No boards yet</h3>
          <p className="text-sm text-muted-foreground mb-8">Create your first system architecture diagram.</p>
          <Button onClick={handleCreateBoard} className="font-bold" disabled={isSaving}>
            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Create First Board
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <button 
            disabled={isSaving}
            onClick={handleCreateBoard}
            className="h-[240px] border border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-accent/30 transition-all group disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus className="w-6 h-6 transition-transform group-hover:rotate-90 group-hover:scale-110" />}
            <span className="text-[13px] font-medium">New board</span>
          </button>

          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {boards.map((board: any) => (
            <BoardCard 
              key={board.id} 
              board={board} 
              onDelete={handleDeleteBoard} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
