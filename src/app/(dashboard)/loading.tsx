import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-2">
          <div className="h-9 w-32 bg-accent/20 rounded-md animate-pulse" />
          <div className="h-4 w-64 bg-accent/10 rounded-md animate-pulse" />
        </div>
        <div className="flex gap-4">
          <div className="h-9 w-9 bg-accent/20 rounded-md animate-pulse" />
          <div className="h-9 w-32 bg-accent/20 rounded-md animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="h-[240px] border border-border/50 rounded-xl bg-accent/5 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full animate-shimmer" />
            <div className="p-4 space-y-3 mt-auto absolute bottom-0 left-0 right-0 border-t border-border/10 bg-background/50 backdrop-blur-sm">
              <div className="h-4 w-3/4 bg-accent/20 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-accent/10 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
