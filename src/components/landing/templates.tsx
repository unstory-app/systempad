export function Templates() {
  const templates = [
    { title: "Design Chat App", type: "Messenger System" },
    { title: "Design Netflix", type: "Video Streaming" },
    { title: "Design Uber", type: "Ride Sharing" },
    { title: "Design URL Shortener", type: "Scalable Microservice" }
  ];

  return (
    <section id="templates" className="py-24">
      <div className="max-container">
        <div className="text-center mb-16">
          <div className="section-badge mx-auto mb-4">📐 Templates</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-fg">Start with a template</h2>
          <p className="text-fg-muted text-lg">Learn from proven architectures or jumpstart your next big idea.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video rounded-xl bg-bg-elevated mb-4 overflow-hidden border border-border transition-all duration-300 group-hover:border-border-accent group-hover:shadow-[0_0_20px_rgba(212,168,83,0.06)]">
                <div className="w-full h-full flex items-center justify-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                   {/* Mock template preview */}
                   <div className="w-3/4 h-3/4 border-2 border-dashed border-border-hover rounded-lg flex flex-col gap-2 p-2">
                     <div className="w-1/3 h-4 bg-muted rounded" />
                     <div className="w-full h-1/2 bg-primary-muted rounded" />
                     <div className="flex gap-2">
                        <div className="w-1/4 h-8 bg-muted rounded-full" />
                        <div className="w-1/4 h-8 bg-muted rounded-full" />
                     </div>
                   </div>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1 text-fg group-hover:text-primary transition-colors">{template.title}</h3>
              <p className="text-sm text-fg-subtle">{template.type}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="btn-secondary">Explore 50+ Templates</button>
        </div>
      </div>
    </section>
  );
}
