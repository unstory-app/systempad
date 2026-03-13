import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="max-container relative z-10">
        <div className="relative rounded-[32px] p-12 md:p-20 text-center overflow-hidden border border-primary/20 bg-bg-elevated">
          {/* Warm ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.05)_0%,_transparent_60%)] pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 relative z-10 text-fg">
            Start designing scalable <br className="hidden md:block"/>
            <span className="text-gradient">systems today.</span>
          </h2>
          <p className="text-fg-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
            Create your first architecture board in seconds. Join 10,000+ engineers building better systems.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link href="/handler/sign-up" className="btn-primary px-10 py-4 text-lg font-bold">
              Create Free Board
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>
          <p className="mt-8 text-fg-subtle text-sm relative z-10">
            Free forever for individuals. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
