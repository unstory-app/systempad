export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create a board",
      description: "Start with a clean slate or choose from our expert templates."
    },
    {
      step: "02",
      title: "Drag or ask AI",
      description: "Use our component library or describe your architecture in plain English."
    },
    {
      step: "03",
      title: "Share or export",
      description: "Generate shareable links for feedback or export high-res diagrams."
    }
  ];

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-container">
        <div className="text-center mb-16">
          <div className="section-badge mx-auto mb-4">⚡ How it works</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-fg">Simple Steps to <span className="text-gradient italic">Smarter Design</span></h2>
          <p className="text-fg-muted text-lg">Go from idea to architecture in three simple steps.</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-border-accent to-transparent -z-0" />
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-bg border-2 border-primary text-primary flex items-center justify-center font-bold text-lg mb-6 shadow-[0_0_20px_rgba(212,168,83,0.15)]">
                  {step.step}
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-fg">{step.title}</h3>
                <p className="text-fg-muted text-sm max-w-[240px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
