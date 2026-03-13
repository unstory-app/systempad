export function Features() {
  const features = [
    {
      title: "Infinite Visual Canvas",
      description: "Think without limits. Design distributed architectures smoothly with zoom and pan support.",
      icon: "🎨"
    },
    {
      title: "Ready Components",
      description: "Drag load balancers, databases, queues, caches, and microservices instead of drawing boxes manually.",
      icon: "📦"
    },
    {
      title: "AI Architecture Generator",
      description: "Describe your system and get a complete scalable architecture diagram instantly.",
      icon: "🤖"
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,_rgba(212,168,83,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-container relative z-10">
        <div className="text-center mb-16">
          <div className="section-badge mx-auto mb-4">✦ Core Features</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-fg">Everything you need to <br className="hidden md:block"/>design at scale.</h2>
          <p className="text-fg-muted max-w-xl mx-auto text-lg">Powerful features designed specifically for engineering system design workflows.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="group glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary-muted text-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-3 text-card-fg">{feature.title}</h3>
              <p className="text-fg-muted leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
