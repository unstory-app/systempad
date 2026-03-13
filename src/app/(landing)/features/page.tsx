import { Features as FeaturesSection } from "@/components/landing/features";

export const metadata = {
  title: "Features | SystemPad",
  description: "Explore the powerful features of SystemPad for system design and architecture.",
};

export default function FeaturesPage() {
  return (
    <div className="py-20">
      <div className="max-container text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-fg">
          Powerful Features for <br />
          <span className="text-gradient">Modern Engineers</span>
        </h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">
          Everything you need to design, document, and collaborate on complex system architectures in real-time.
        </p>
      </div>
      <FeaturesSection />
    </div>
  );
}
