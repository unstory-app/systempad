import Image from "next/image";

export function Collaboration({ heroImageUrl }: { heroImageUrl: string }) {
  return (
    <section className="py-24 bg-bg-secondary overflow-hidden">
      <div className="max-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-badge mb-6">
              🔄 Real-time Sync
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-fg">
              Design together <br />
              like Google Docs.
            </h2>
            <ul className="space-y-6">
              {[
                { title: "Live cursors", desc: "See exactly where your teammates are thinking." },
                { title: "Comments", desc: "Leave feedback directly on system components." },
                { title: "Version history", desc: "Never lose a great architecture iteration." },
                { title: "Shareable links", desc: "Instantly share boards with a single click." }
              ].map((point, i) => (
                <li key={i} className="flex gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-fg">{point.title}</h4>
                    <p className="text-fg-muted text-sm leading-relaxed">{point.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 blur-[100px] rounded-full" />
            <div className="relative rounded-2xl border border-border overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
              <Image 
                src={heroImageUrl} 
                alt="Multi-cursor collaboration" 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover opacity-80"
              />
              
              {/* Pseudo-cursors */}
              <div className="absolute top-[20%] left-[30%] animate-bounce">
                <div className="bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded-tl-none rounded-md font-bold whitespace-nowrap shadow-lg">
                  Sarah is typing...
                </div>
              </div>
              <div className="absolute top-[60%] right-[25%] animate-pulse">
                <div className="bg-success text-[10px] text-bg px-2 py-1 rounded-tl-none rounded-md font-bold whitespace-nowrap shadow-lg">
                  Alex
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
