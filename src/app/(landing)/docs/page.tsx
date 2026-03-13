export const metadata = {
  title: "Documentation | SystemPad",
  description: "Learn how to use SystemPad to create professional architecture diagrams.",
};

export default function DocsPage() {
  const sections = [
    { title: "Getting Started", items: ["Quick Start Guide", "Core Concepts", "Interface Overview"] },
    { title: "Components", items: ["Server Entities", "Databases", "Networking", "Custom Icons"] },
    { title: "Collaboration", items: ["Real-time Editing", "Sharing Boards", "Comments & Feedback"] },
    { title: "Advanced", items: ["AI Generator", "Keyboard Shortcuts", "Exporting & APIs"] },
  ];

  return (
    <div className="py-20">
      <div className="max-container">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-fg">Documentation</h1>
          <p className="text-fg-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about building architectures with SystemPad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6 text-primary">{section.title}</h3>
              <ul className="space-y-4">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <a href="#" className="text-fg-muted hover:text-fg transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
