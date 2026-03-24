export default function RecentPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 opacity-50">
       <div className="w-16 h-16 bg-accent/30 rounded-2xl flex items-center justify-center mb-6 border border-border">
         <History className="w-8 h-8 text-muted-foreground" />
       </div>
       <h2 className="text-xl font-bold text-foreground mb-2">No recent history</h2>
       <p className="text-sm text-muted-foreground">Boards you open or edit will appear here.</p>
    </div>
  );
}

import { History } from "lucide-react";
