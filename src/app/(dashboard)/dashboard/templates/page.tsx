import { Search, Filter, ArrowRight } from "lucide-react";

export default function TemplatesPage() {
  const templates = [
    { title: "Microservices Blueprint", category: "Infrastructure", complexity: "Intermediate", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { title: "SaaS Multi-tenant DB", category: "Database", complexity: "Advanced", thumbnail: "https://images.unsplash.com/photo-1558494949-ef010ca68a0a?w=800&q=80" },
    { title: "Next.js Edge Runtime", category: "Frontend", complexity: "Beginner", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80" },
    { title: "AI Pipeline Architecture", category: "AI/ML", complexity: "Intermediate", thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" },
    { title: "Zero Trust Network", category: "Security", complexity: "Advanced", thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" },
    { title: "Real-time Analytics", category: "Data", complexity: "Advanced", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Templates</h1>
          <h3 className="text-xl font-bold text-foreground mb-2">AI Assistant</h3>
          <p className="text-muted-foreground text-sm max-w-sm mb-8">
            Describe your system or ask for patterns.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative group/search">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/search:text-foreground transition-colors" />
             <input 
               type="text" 
               placeholder="Search blueprints..." 
               className="bg-background border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/50 transition-all w-64"
             />
           </div>
           <button className="p-2.5 bg-background border border-border rounded-xl text-muted-foreground hover:text-foreground transition-all">
             <Filter className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((t, i) => (
          <div key={i} className="group flex flex-col glass-card rounded-3xl border border-border overflow-hidden hover:border-foreground/30 transition-all hover:shadow-lg bg-background">
            <div className="aspect-[16/10] overflow-hidden relative border-b border-border">
              <img src={t.thumbnail} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={t.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest shadow-sm">
                  {t.category}
                </span>
                <span className={cn(
                  "px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest shadow-sm",
                  t.complexity === 'Advanced' ? 'text-rose-400' : t.complexity === 'Intermediate' ? 'text-amber-400' : 'text-emerald-400'
                )}>
                  {t.complexity}
                </span>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow bg-accent/5">
              <h3 className="text-xl font-bold text-foreground group-hover:text-foreground/80 transition-colors mb-4">{t.title}</h3>
              <button className="flex items-center gap-2 text-[10px] font-bold text-foreground group/btn uppercase tracking-widest mt-auto">
                Use Blueprint
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
