import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoreVertical, Clock, LayoutGrid, Edit2, Share2, Code, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { updateBoardName } from "@/lib/actions/board";

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
  const [isRenaming, setIsRenaming] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [isCopiedShare, setIsCopiedShare] = useState(false);
  const [isCopiedEmbed, setIsCopiedEmbed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleRenameSubmit = async () => {
    if (!title.trim() || title === board.title) {
      setTitle(board.title);
      setIsRenaming(false);
      return;
    }
    
    // Optimistic UI updates, server action will trigger revalidatePath
    setIsRenaming(false);
    await updateBoardName(board.id, title.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRenameSubmit();
    if (e.key === "Escape") {
      setTitle(board.title);
      setIsRenaming(false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/board/${board.id}`;
    await navigator.clipboard.writeText(url);
    setIsCopiedShare(true);
    setTimeout(() => setIsCopiedShare(false), 2000);
  };

  const handleEmbed = async () => {
    const iframeCode = `<iframe src="${window.location.origin}/embed/${board.id}" width="100%" height="600" style="border:none; border-radius: 12px; overflow: hidden;"></iframe>`;
    await navigator.clipboard.writeText(iframeCode);
    setIsCopiedEmbed(true);
    setTimeout(() => setIsCopiedEmbed(false), 2000);
  };
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
          {isRenaming ? (
            <Input 
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={handleKeyDown}
              className="h-7 text-[14px] font-medium mr-2 px-2 py-0"
            />
          ) : (
            <Link href={`/board/${board.id}`} className="text-[14px] font-medium text-foreground hover:underline underline-offset-4 decoration-1 decoration-foreground/30 truncate pr-2">
              {title}
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground focus-visible:ring-0">
                <MoreVertical className="w-3.5 h-3.5" />
              </Button>
            } />
            <DropdownMenuContent align="end" className="p-1 w-48">
              <DropdownMenuItem 
                className="text-[13px] cursor-pointer" 
                onClick={() => setIsRenaming(true)}
              >
                <Edit2 className="w-3.5 h-3.5 mr-2" />
                Rename Board
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="text-[13px] cursor-pointer" 
                onClick={handleShare}
              >
                {isCopiedShare ? <Check className="w-3.5 h-3.5 mr-2 text-green-500" /> : <Share2 className="w-3.5 h-3.5 mr-2" />}
                {isCopiedShare ? "Link Copied!" : "Copy Link"}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="text-[13px] cursor-pointer" 
                onClick={handleEmbed}
              >
                {isCopiedEmbed ? <Check className="w-3.5 h-3.5 mr-2 text-green-500" /> : <Code className="w-3.5 h-3.5 mr-2" />}
                {isCopiedEmbed ? "Embed Copied!" : "Copy Embed Code"}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem 
                className="text-[13px] text-destructive focus:text-destructive cursor-pointer" 
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
