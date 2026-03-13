export const metadata = {
  title: "Public Gallery | SystemPad",
  description: "Browse the best system architecture diagrams created by the community.",
};

export default function GalleryPage() {
  const diagrams = [
    { title: "Kafka Cluster Architecture", author: "tech_wiz" },
    { title: "Multi-Region E-commerce", author: "scale_master" },
    { title: "Real-time Chat Pipeline", author: "collab_coder" },
    { title: "SaaS Billing Workflow", author: "fintech_pro" },
    { title: "Distributed Game Engine", author: "gpu_gamer" },
    { title: "Serverless Image Processor", author: "cloud_native" },
  ];

  return (
    <div className="py-20">
      <div className="max-container">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-fg">Public Gallery</h1>
          <p className="text-fg-muted text-lg max-w-2xl mx-auto">Discover and learn from architectural designs shared by engineers worldwide.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {diagrams.map((d, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video rounded-2xl bg-[#141415] border border-border group-hover:border-primary/50 transition-all mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                <div className="absolute inset-x-8 bottom-8 h-1/2 border-2 border-dashed border-[#27272A] rounded-xl bg-[#141415]/50 backdrop-blur-sm" />
              </div>
              <h3 className="font-bold text-lg text-fg group-hover:text-primary transition-colors">{d.title}</h3>
              <p className="text-sm text-fg-subtle">by @{d.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
