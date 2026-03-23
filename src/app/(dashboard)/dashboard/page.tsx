import Link from "next/link";
import { Plus, MoreVertical, LayoutGrid, List, Clock, FolderOpen, Box } from "lucide-react";

export default function DashboardPage() {
  const boards = [
    { 
      id: "1", 
      title: "Microservices Architecture", 
      updatedAt: "2h ago", 
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tag: "Engineering"
    },
    { 
      id: "2", 
      title: "Next.js 16 Auth Flow", 
      updatedAt: "Yesterday", 
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010ca68a0a?w=800&q=80",
      tag: "Work"
    },
    { 
      id: "3", 
      title: "Kubernetes Cluster Map", 
      updatedAt: "Oct 12", 
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      tag: "Infra"
    },
    { 
      id: "4", 
      title: "User Profile State Machine", 
      updatedAt: "Oct 8", 
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
      tag: "Design"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-display font-medium tracking-tight">Boards</h1>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center border border-border rounded-md p-1">
            <button className="p-1.5 rounded-sm bg-accent text-foreground">
               <LayoutGrid className="w-4 h-4" />
             </button>
             <button className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
               <List className="w-4 h-4" />
             </button>
           </div>
           
           <button className="btn-primary">
             <Plus className="w-4 h-4 mr-2" />
             New Board
           </button>
        </div>
      </div>

      {/* Basic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-border p-6 rounded-xl hover:border-foreground transition-colors group">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Total</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-display font-medium">12</h3>
            <FolderOpen className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>
        
        <div className="border border-border p-6 rounded-xl hover:border-foreground transition-colors group">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Active</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-display font-medium">4</h3>
            <Clock className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>
        
        <div className="border border-border p-6 rounded-xl hover:border-foreground transition-colors group">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Storage</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-display font-medium">2.4<span className="text-sm ml-1 text-muted-foreground">GB</span></h3>
            <Box className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create New Card */}
        <button className="h-[240px] border border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-accent/30 transition-all group">
          <Plus className="w-6 h-6 transition-transform group-hover:rotate-90 group-hover:scale-110" />
          <span className="text-[13px] font-medium">New board</span>
        </button>

        {boards.map((board) => (
          <div key={board.id} className="group border border-border rounded-xl overflow-hidden hover:border-foreground transition-all">
            <Link href={`/board/${board.id}`} className="block relative aspect-video overflow-hidden border-b border-border bg-accent/20">
              <img 
                src={board.thumbnail} 
                className="w-full h-full object-cover grayscale opacity-80 transition-all group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" 
                alt={board.title}
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-sm bg-background/80 backdrop-blur-sm border border-border text-[10px] font-bold text-foreground">
                {board.tag}
              </div>
            </Link>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <Link href={`/board/${board.id}`} className="text-[14px] font-medium text-foreground hover:underline underline-offset-4 decoration-1 decoration-foreground/30 truncate pr-2">
                  {board.title}
                </Link>
                <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{board.updatedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


