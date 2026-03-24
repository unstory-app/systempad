"use client";

import { Share2, Heart, Award, Zap, Users } from "lucide-react";

interface GalleryClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialBoards: any[];
}

export function GalleryClient({ initialBoards }: GalleryClientProps) {
  // Fallback to dummy data if db is empty for demonstration.
  const diagrams = initialBoards.length > 0 ? initialBoards : [
    { 
      title: "Tesla Supercharger Network", 
      author: "elon_fan",
      likes: 1204,
      views: "12k",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    { 
      title: "Ethereum PoS Lifecycle", 
      author: "vitalik_b",
      likes: 892,
      views: "8.4k",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010ca68a0a?w=800&q=80"
    },
    { 
      title: "Uber Dispatch System", 
      author: "eng_architect",
      likes: 450,
      views: "4.1k",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
    },
    { 
      title: "Stripe Billing Engine", 
      author: "fintech_wiz",
      likes: 2310,
      views: "24k",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Gallery</h1>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex -space-x-2">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-accent flex items-center justify-center overflow-hidden">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
               </div>
             ))}
             <div className="w-8 h-8 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold text-muted-foreground">
               +2k
             </div>
           </div>
           <span className="text-xs text-muted-foreground">Joining 2,400+ architects</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {diagrams.map((d, i) => (
          <div key={i} className="group glass-card rounded-3xl border border-border overflow-hidden hover:border-foreground/30 transition-all flex flex-col md:flex-row h-auto md:h-64 bg-background">
             <div className="w-full md:w-1/2 overflow-hidden relative border-r border-border">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={d.thumbnail || d.thumbnailUrl} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={d.title} />
               <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/80 hidden md:block" />
             </div>
             
             <div className="p-8 w-full md:w-1/2 flex flex-col justify-between bg-accent/5">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-3.5 h-3.5 text-foreground" />
                    <span className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">Featured</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-foreground/80 transition-colors truncate">{d.title}</h3>
                  <p className="text-xs text-muted-foreground">by @{d.creator?.name || d.author || "anonymous"}</p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 mt-8">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground group/stat">
                        <Heart className="w-4 h-4 group-hover/stat:text-rose-500 group-hover/stat:fill-rose-500 transition-all" />
                        <span className="text-xs">{d.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">{d.views}</span>
                      </div>
                   </div>
                   <button className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:text-foreground transition-all">
                     <Share2 className="w-4 h-4" />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-12 rounded-3xl border border-dashed border-border flex flex-col items-center text-center bg-accent/5">
         <Award className="w-12 h-12 text-muted-foreground/30 mb-6" />
         <h3 className="text-xl font-bold text-foreground mb-2">Want to showcase your design?</h3>
         <p className="text-muted-foreground text-sm max-w-sm mb-8">Get featured in our gallery and help other engineers learn from your architectural masterpieces.</p>
         <button className="h-12 px-8 bg-foreground text-background font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all active:scale-95">
           Share a Diagram
         </button>
      </div>
    </div>
  );
}
