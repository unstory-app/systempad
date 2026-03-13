import { Pricing as PricingSection } from "@/components/landing/pricing";

export const metadata = {
  title: "Pricing | SystemPad",
  description: "Simple, transparent pricing for individuals and teams.",
};

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="max-container text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-fg">
          Simple, Transparent <br />
          <span className="text-gradient">Pricing</span>
        </h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">
          Choose the plan that fits your engineering needs. Start free and scale as you grow.
        </p>
      </div>
      <PricingSection />
    </div>
  );
}
