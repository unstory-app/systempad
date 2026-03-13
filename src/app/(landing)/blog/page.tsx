export const metadata = {
  title: "Blog | SystemPad",
  description: "Engineering insights, system design patterns, and product updates.",
};

export default function BlogPage() {
  const posts = [
    { title: "Scaling SystemPad to 1M Users", date: "Oct 12, 2025", category: "Engineering" },
    { title: "The Art of System Documentation", date: "Oct 8, 2025", category: "Design" },
    { title: "Real-time Sync with Yjs and CRDTs", date: "Sep 28, 2025", category: "Tech" },
    { title: "Announcing SystemPad AI 2.0", date: "Sep 15, 2025", category: "Product" },
  ];

  return (
    <div className="py-20">
      <div className="max-container">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-fg">Blog</h1>
          <p className="text-fg-muted text-lg max-w-2xl mx-auto">Insights from the team building the future of system design.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="glass-card p-10 rounded-2xl group cursor-pointer border border-border hover:border-border-accent transition-all">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">{post.category}</div>
              <h3 className="text-2xl font-bold mb-4 text-fg group-hover:text-primary transition-colors">{post.title}</h3>
              <div className="text-fg-subtle text-sm">{post.date} · 5 min read</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
