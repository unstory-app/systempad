export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["3 boards", "Basic components", "Public sharing", "Community templates"],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$12",
      features: ["Unlimited boards", "AI diagrams", "Private templates", "High-res export"],
      cta: "Get Pro",
      popular: true
    },
    {
      name: "Team",
      price: "$49",
      features: ["Shared workspace", "Role permissions", "Version history", "Priority support"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-bg-secondary">
      <div className="max-container">
        <div className="text-center mb-16">
          <div className="section-badge mx-auto mb-4">💎 Pricing</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-fg">Simple, transparent pricing</h2>
          <p className="text-fg-muted text-lg">Choose the plan that fits your engineering needs.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative p-8 rounded-2xl border transition-all duration-300 ${
              plan.popular 
                ? "border-primary/40 bg-bg-elevated shadow-[0_0_40px_rgba(212,168,83,0.08)] scale-105 z-10" 
                : "border-border bg-bg-elevated/50 hover:border-border-hover"
            }`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-bold text-xl mb-2 text-fg">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-fg">{plan.price}</span>
                <span className="text-fg-subtle text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-fg-muted">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 cursor-pointer ${
                plan.popular 
                  ? "btn-primary" 
                  : "bg-secondary hover:bg-secondary-hover text-fg border border-border hover:border-border-hover"
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
