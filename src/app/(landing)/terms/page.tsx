export const metadata = {
  title: "Terms of Service | SystemPad",
  description: "The legal terms for using the SystemPad platform.",
};

export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="max-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-10 text-fg">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none text-fg-muted space-y-8">
            <section>
              <h2 className="text-xl font-bold text-fg mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using SystemPad, you agree to be bound by these Terms of Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-fg mb-4">2. Use of the Service</h2>
              <p>You are responsible for your use of the service and for any content you provide, including compliance with applicable laws, rules, and regulations.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-fg mb-4">3. Intellectual Property</h2>
              <p>You retain ownership of the diagrams you create. We retain ownership of the SystemPad platform and architecture.</p>
            </section>

            <div className="p-8 rounded-xl bg-[#141415] border border-border text-xs">
              By using this site, you agree to the conditions outlined above.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
