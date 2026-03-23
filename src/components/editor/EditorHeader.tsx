"use client";

import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EditorHeaderProps {
  title: string;
  isSaving: boolean;
}

export function EditorHeader({ title, isSaving }: EditorHeaderProps) {
  const router = useRouter();

  return (
    <div className="absolute top-4 left-4 z-50 flex items-center gap-3">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md border-border shadow-sm hover:border-foreground transition-all"
        onClick={() => router.push("/dashboard")}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <div className="h-10 px-4 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-sm flex items-center gap-3">
        <span className="text-[13px] font-medium text-foreground truncate max-w-[200px]">
          {title}
        </span>
        <div className="h-3 w-px bg-border" />
        <div className="flex items-center gap-2">
          {isSaving ? (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            <span className="text-[11px] text-muted-foreground/60 italic">Saved</span>
          )}
        </div>
      </div>
    </div>
  );
}
