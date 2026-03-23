"use client";

import Link from "next/link";
import Image from "next/image";
import { MoreVertical, Clock, LayoutGrid } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface BoardCardProps {
  board: {
    id: string;
    title: string;
    thumbnailUrl?: string | null;
    updatedAt: string | Date;
  };
  onDelete: (id: string) => Promise<void>;
}

export function BoardCard({ board, onDelete }: BoardCardProps) {
  return (
    <Card className="group border border-border rounded-xl overflow-hidden hover:border-foreground transition-all bg-card">
      <Link href={`/board/${board.id}`} className="block relative aspect-4/3 overflow-hidden border-b border-border bg-accent/20">
        {board.thumbnailUrl ? (
          <Image 
            src={board.thumbnailUrl} 
            fill
            className="object-cover grayscale opacity-80 transition-all group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" 
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
          <Link href={`/board/${board.id}`} className="text-[14px] font-medium text-foreground hover:underline underline-offset-4 decoration-1 decoration-foreground/30 truncate pr-2">
            {board.title}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground focus-visible:ring-0">
                <MoreVertical className="w-3.5 h-3.5" />
              </Button>
            } />
            <DropdownMenuContent align="end" className="p-1">
              <DropdownMenuItem 
                className="text-[13px] text-destructive focus:text-destructive" 
                onClick={() => onDelete(board.id)}
              >
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
  );
}
