"use client";

import { useUser } from "@stackframe/stack";
import { Plus, MoreVertical, LayoutGrid, Clock, Sparkles } from "lucide-react";
import useSWR from "swr";
import { createBoard, deleteBoard, getBoardsByWorkspace } from "@/lib/actions/board";
import { syncUser } from "@/lib/actions/user";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const stackUser = useUser();
  const [dbUser, setDbUser] = useState<any>(null); // TODO: Define User type from schema
  const workspaceId = dbUser?.workspaces?.[0]?.id;
  const { data: boards, error, isLoading, mutate } = useSWR(
    workspaceId ? `boards-${workspaceId}` : null,
    () => getBoardsByWorkspace(workspaceId!)
  );

  useEffect(() => {
    if (stackUser) {
      syncUser(stackUser).then(u => setDbUser(u));
    }
  }, [stackUser]);

  const handleCreateBoard = async () => {
    if (!dbUser?.workspaces?.[0]?.id) return;
    await createBoard(dbUser.workspaces[0].id, dbUser.id, "New System Architecture");
    mutate();
  };

  const handleDeleteBoard = async (id: string) => {
    await deleteBoard(id);
    mutate();
  };

  if (isLoading || !dbUser) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[240px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

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
           <Button variant="default" className="h-9 font-bold px-4" onClick={handleCreateBoard}>
              <Plus className="w-4 h-4 mr-2" />
              New Board
           </Button>
        </div>
      </div>

      {boards?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-border rounded-2xl bg-accent/10">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-1">No boards yet</h3>
          <p className="text-sm text-muted-foreground mb-8">Create your first system architecture diagram.</p>
          <Button onClick={handleCreateBoard} className="font-bold">
            Create First Board
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <button 
            onClick={handleCreateBoard}
            className="h-[240px] border border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-accent/30 transition-all group"
          >
            <Plus className="w-6 h-6 transition-transform group-hover:rotate-90 group-hover:scale-110" />
            <span className="text-[13px] font-medium">New board</span>
          </button>

          {boards?.map((board) => (
            <Card key={board.id} className="group border border-border rounded-xl overflow-hidden hover:border-foreground transition-all bg-card">
              <Link href={`/editor/${board.id}`} className="block relative aspect-4/3 overflow-hidden border-b border-border bg-accent/20">
                {board.thumbnailUrl ? (
                  <img 
                    src={board.thumbnailUrl} 
                    className="w-full h-full object-cover grayscale opacity-80 transition-all group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" 
                    alt={board.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-accent/10">
                    <LayoutGrid className="w-8 h-8 text-muted-foreground opacity-20" />
                  </div>
                )}
              </Link>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <Link href={`/editor/${board.id}`} className="text-[14px] font-medium text-foreground hover:underline underline-offset-4 decoration-1 decoration-foreground/30 truncate pr-2">
                    {board.title}
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end" className="p-1">
                      <DropdownMenuItem className="text-[13px]" onClick={() => handleDeleteBoard(board.id)}>
                        Delete Board
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-2">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(board.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


