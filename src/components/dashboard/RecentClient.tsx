"use client";

import { History, Plus, Loader2 } from "lucide-react";
import { BoardCard } from "@/components/dashboard/BoardCard";
import { deleteBoard } from "@/lib/actions/board";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createBoard } from "@/lib/actions/board";

interface RecentClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialBoards: any[];
  workspaceId: string;
  userId: string;
}

export function RecentClient({ initialBoards, workspaceId, userId }: RecentClientProps) {
  const router = useRouter();
  const [boards, setBoards] = useState(initialBoards);
  const [isSaving, setIsSaving] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteBoard(id);
      setBoards(boards.filter(b => b.id !== id));
    } catch (e) {
      console.error("Failed to delete board:", e);
    }
  };

  const handleCreateBoard = async () => {
    if (!workspaceId || isSaving) return;
    setIsSaving(true);
    try {
      const b = await createBoard(workspaceId, userId, "New System Architecture");
      router.push(`/board/${b.id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-12">
        <h1 className="text-3xl font-display font-medium tracking-tight mb-2">Recent</h1>
        <p className="text-muted-foreground text-sm">Your most recently modified architectures.</p>
      </div>

      {boards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-border rounded-2xl bg-accent/10">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4 border border-border">
            <History className="w-6 h-6 text-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-1">No recent history</h3>
          <p className="text-sm text-muted-foreground mb-8 text-center max-w-sm">Boards you open or edit will automatically appear here in chronological order.</p>
          <Button onClick={handleCreateBoard} className="font-bold bg-foreground text-background" disabled={isSaving}>
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Create First Board
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {boards.map((board) => (
             <BoardCard 
               key={board.id} 
               board={board} 
               onDelete={handleDelete} 
             />
          ))}
        </div>
      )}
    </div>
  );
}
