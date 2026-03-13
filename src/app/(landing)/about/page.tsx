export const metadata = {
  title: "About Us | SystemPad",
  description: "The story behind SystemPad and our mission to simplify system design.",
};

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="max-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-fg">About Us</h1>
            <p className="text-fg-muted text-lg">We believe that designing complex systems should be as intuitive as sketching on a whiteboard, but with the power of modern engineering tools.</p>
          </div>

          <div className="space-y-12 text-fg-muted leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-fg">Our Mission</h2>
              <p>SystemPad was born out of the frustration of using generic drawing tools for technical architecture. We are building the definitive canvas for engineering teams to brainstorm, document, and scale their most ambitious ideas.</p>
            </section>

            <section className="glass-card p-10 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold mb-4 text-fg">Why SystemPad?</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-primary font-bold">01</span>
                  <span>Built by engineers, for engineers. Every component is designed for technical accuracy.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-bold">02</span>
                  <span>Collaboration at its core. No more "who has the latest version?".</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-bold">03</span>
                  <span>AI-powered exploration. Go from description to diagram in seconds.</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
