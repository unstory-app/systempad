"use client";

import { useState } from "react";
import { ArchiveIcon, RefreshCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { unarchiveBoard, deleteBoard } from "@/lib/actions/board";

interface ArchiveClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialBoards: any[];
}

export function ArchiveClient({ initialBoards }: ArchiveClientProps) {
  const [isScanning, setIsScanning] = useState(false);

  // We let SWR handle dynamic revalidation if needed, but for now we use simple state 
  // since the list is static initial until mutated.
  const [boards, setBoards] = useState(initialBoards);

  const handleRestore = async (id: string) => {
    try {
      await unarchiveBoard(id);
      setBoards(boards.filter(b => b.id !== id));
    } catch (e) {
      console.error("Restore failed", e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBoard(id);
      setBoards(boards.filter(b => b.id !== id));
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 800);
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-12">
        <h1 className="text-3xl font-display font-medium tracking-tight mb-2">Archive</h1>
        <p className="text-muted-foreground text-sm">Review or restore diagrams you&apos;ve moved to the archives.</p>
      </div>

      {boards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-border rounded-2xl bg-accent/10">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4 border border-border">
            <ArchiveIcon className="w-6 h-6 text-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-1">No archived designs</h3>
          <p className="text-sm text-muted-foreground mb-8 text-center max-w-sm">Archived boards are kept for 30 days before being permanently deleted.</p>
          <Button onClick={handleScan} variant="outline" className="font-bold bg-background" disabled={isScanning}>
            {isScanning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCcw className="w-4 h-4 mr-2" />}
            Scan Workspace
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {boards.map((board) => (
             <div key={board.id} className="group glass-card rounded-2xl border border-border overflow-hidden bg-background">
               <div className="aspect-4/3 bg-accent/20 flex flex-col items-center justify-center text-muted-foreground border-b border-border">
                  <ArchiveIcon className="w-8 h-8 opacity-20" />
               </div>
               <div className="p-4">
                  <h3 className="text-sm font-medium text-foreground truncate">{board.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                     <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground h-8 text-xs" onClick={() => handleRestore(board.id)}>Restore</Button>
                     <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 text-xs" onClick={() => handleDelete(board.id)}>Delete</Button>
                  </div>
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
