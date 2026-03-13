import { Templates as TemplatesSection } from "@/components/landing/templates";

export const metadata = {
  title: "Templates | SystemPad",
  description: "Jumpstart your architecture with 100+ professional templates.",
};

export default function TemplatesPage() {
  return (
    <div className="py-20">
      <div className="max-container text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-fg">
          Start with a <br />
          <span className="text-gradient">Professional Template</span>
        </h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">
          Learn from proven architectures or jumpstart your next big idea with our curated library.
        </p>
      </div>
      <TemplatesSection />
    </div>
  );
}
