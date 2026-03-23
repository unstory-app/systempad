import Link from "next/link";
import { Plus, MoreVertical, LayoutGrid, List, Clock, FolderOpen, Box } from "lucide-react";

export default function DashboardPage() {
  const boards = [
    { 
      id: "1", 
      title: "Microservices Architecture", 
      updatedAt: "2 hours ago", 
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
      updatedAt: "Oct 12, 2025", 
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      tag: "Infra"
    },
    { 
      id: "4", 
      title: "User Profile State Machine", 
      updatedAt: "Oct 8, 2025", 
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
      tag: "Design"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-fg">Boards</h1>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="flex items-center bg-[#141415] border border-[#27272A] rounded-xl p-1">
            <button className="p-1.5 rounded-lg bg-[#1A1A1B] text-fg shadow-sm">
               <LayoutGrid className="w-4 h-4" />
             </button>
             <button className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-fg hover:bg-[#1A1A1B] transition-all">
               <List className="w-4 h-4" />
             </button>
           </div>
           
           <button className="btn-primary py-2 px-6 flex items-center gap-2 group">
             <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
             Create Board
           </button>
        </div>
      </div>

      {/* Stats/Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6 rounded-2xl border border-[#D4A853]/10 bg-linear-to-br from-[#141415] to-[#0A0A0B]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-[#D4A853]/10 rounded-xl flex items-center justify-center text-[#D4A853]">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-fg">12</div>
              <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold">Total Boards</div>
            </div>
          </div>
          <div className="w-full bg-[#1A1A1B] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#D4A853] h-full w-[65%]" />
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-[#27272A]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-fg">4</div>
              <div className="text-xs text-[#A1A1AA]">Updated this week</div>
            </div>
          </div>
          <div className="w-full bg-[#1A1A1B] h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[35%]" />
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-[#27272A]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-fg">2.4 GB</div>
              <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold">Storage Used</div>
            </div>
          </div>
          <div className="w-full bg-[#1A1A1B] h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[85%]" />
          </div>
        </div>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create New Card */}
        <button className="h-[280px] border-2 border-dashed border-[#27272A] rounded-2xl flex flex-col items-center justify-center gap-4 text-[#A1A1AA] hover:border-[#D4A853]/50 hover:text-[#D4A853] hover:bg-[#D4A853]/5 transition-all group">
          <div className="w-12 h-12 rounded-full border border-[#27272A] flex items-center justify-center group-hover:border-[#D4A853]/50 transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-semibold">Add New Diagram</span>
        </button>

        {boards.map((board) => (
          <div key={board.id} className="group glass-card rounded-2xl border border-[#27272A] overflow-hidden hover:border-[#D4A853]/40 transition-all hover:shadow-[0_8px_30px_rgba(212,168,83,0.08)]">
            <Link href={`/board/${board.id}`} className="block relative aspect-video overflow-hidden">
              <img 
                src={board.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt={board.title}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <button className="btn-primary py-1.5 px-4 text-xs font-bold scale-90 group-hover:scale-100 transition-transform duration-300">Open Editor</button>
              </div>
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                {board.tag}
              </div>
            </Link>
            <div className="p-4 flex flex-col">
              <div className="flex items-start justify-between mb-1">
                <Link href={`/board/${board.id}`} className="font-bold text-fg hover:text-[#D4A853] transition-colors truncate pr-4">
                  {board.title}
                </Link>
                <button className="p-1 rounded-lg text-[#A1A1AA] hover:text-fg hover:bg-[#1A1A1B]">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#A1A1AA]">
                <Clock className="w-3 h-3" />
                <span>Modified {board.updatedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

