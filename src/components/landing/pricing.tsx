export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Everything you need to plan your first system today.",
      cta: "Build for free"
    },
    {
      name: "Pro",
      price: "$12",
      description: "Unlimited boards and AI power for professional engineers.",
      cta: "Start free trial"
    },
    {
      name: "Team",
      price: "$49",
      description: "Collaborative tools for squads building together.",
      cta: "Start free trial"
    },
    {
      name: "Scale",
      price: "$199",
      description: "Custom controls and security for growing organizations.",
      cta: "Talk to sales"
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-background border-t border-border">
      <div className="max-container px-6">
        <div className="mb-20">
          <h2 className="text-6xl md:text-7xl font-display font-medium tracking-tight mb-4 text-foreground">
            Compare plans <br/>and features
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {plans.map((plan, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="font-medium text-xl mb-4 text-foreground">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed max-w-[200px]">
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-display font-medium text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">/mo</span>
              </div>
              <button className="btn-primary py-2.5 px-6 text-xs text-center font-bold">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
