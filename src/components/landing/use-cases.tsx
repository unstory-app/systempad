export function UseCases() {
  const cases = [
    { title: "Interview Prep", desc: "Master system design interviews with professional tools.", icon: "👨‍💻" },
    { title: "Arch Docs", desc: "Keep your system documentation beautiful and up to date.", icon: "📄" },
    { title: "Teaching", desc: "Explain complex concepts with clear visual aids.", icon: "🎓" },
    { title: "Startups", desc: "Plan your MVP architecture before writing a single line of code.", icon: "🚀" }
  ];

  return (
    <section className="py-24">
      <div className="max-container">
        <div className="text-center mb-16">
          <div className="section-badge mx-auto mb-4">🎯 Use Cases</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-fg">Built for every stage</h2>
          <p className="text-fg-muted text-lg">SystemPad is more than just a drawing tool.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl group">
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{c.icon}</div>
              <h3 className="font-bold text-xl mb-2 text-fg">{c.title}</h3>
              <p className="text-fg-muted text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
