import { Trash2, Archive as ArchiveIcon, RefreshCcw } from "lucide-react";

export default function ArchivePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Archive</h1>
        <p className="text-muted-foreground text-sm">Review or restore diagrams you've moved to the archives.</p>
      </div>

      <div className="bg-background border border-border rounded-3xl p-20 flex flex-col items-center text-center">
         <div className="w-16 h-16 bg-accent/30 rounded-2xl flex items-center justify-center mb-6 border border-border">
           <ArchiveIcon className="w-8 h-8 text-muted-foreground" />
         </div>
         <h2 className="text-xl font-bold text-foreground mb-2">No archived designs</h2>
         <p className="text-muted-foreground text-sm max-w-sm mb-8">Archived boards are kept for 30 days before being permanently deleted.</p>
         
         <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-foreground text-sm font-bold border border-border hover:bg-accent/80 transition-all">
              <RefreshCcw className="w-4 h-4" />
              Scan Workspace
            </button>
         </div>
      </div>
    </div>
  );
}
