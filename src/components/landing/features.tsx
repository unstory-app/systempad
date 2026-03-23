import { LayoutDashboard, Box, Sparkles } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Crystal Clear Diagrams",
      description: "Map your microservices and flows without the mess.",
      icon: LayoutDashboard
    },
    {
      title: "Built-in Components",
      description: "Drag-and-drop cloud primitives instantly. No more drawing boxes.",
      icon: Box
    },
    {
      title: "AI-Powered Speed",
      description: "Describe your system; our AI builds the diagram for you.",
      icon: Sparkles
    }
  ];

  return (
    <section id="product" className="py-32 bg-background border-t border-border">
      <div className="max-container px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center mb-6 border border-border">
                <feature.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-xl font-display font-medium mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
