import { Loader2 } from "lucide-react";

export default function BoardLoading() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[9999] animate-in fade-in duration-700">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-foreground/10 blur-2xl rounded-full animate-pulse-subtle" />
          <Loader2 className="w-10 h-10 text-foreground animate-spin relative z-10" />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-sm font-medium tracking-widest uppercase opacity-40">SystemPad</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-foreground/30 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-foreground/30 animate-pulse [animation-delay:0.2s]" />
            <div className="w-1 h-1 rounded-full bg-foreground/30 animate-pulse [animation-delay:0.4s]" />
          </div>
        </div>
      </div>
    </div>
  );
}
