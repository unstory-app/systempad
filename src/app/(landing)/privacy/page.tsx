export const metadata = {
  title: "Privacy Policy | SystemPad",
  description: "Learn how we protect your data and diagrams.",
};

export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="max-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-10 text-fg">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none text-fg-muted space-y-8">
            <section>
              <h2 className="text-xl font-bold text-fg mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you create an account, create diagrams, and communicate with us.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-fg mb-4">2. How We Use Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, including to facilitate real-time collaboration and AI generations.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-fg mb-4">3. Data Security</h2>
              <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.</p>
            </section>

            <div className="p-8 rounded-xl bg-[#141415] border border-border text-xs">
              Last updated: October 2025. Contact privacy@systempad.io for questions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
