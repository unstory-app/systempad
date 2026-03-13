export function SocialProof() {
  const logos = [
    { name: "10,000+ diagrams created", icon: "📊" },
    { name: "Loved by engineering teams", icon: "❤️" },
    { name: "Top-rated by system design learners", icon: "⭐" },
  ];

  return (
    <div className="border-y border-border-subtle bg-bg-secondary py-8">
      <div className="max-container flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
        {logos.map((logo, i) => (
          <div key={i} className="flex items-center gap-2.5 text-fg-subtle font-medium whitespace-nowrap">
            <span className="text-xl">{logo.icon}</span>
            <span className="text-sm md:text-base">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
