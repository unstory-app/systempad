import Image from "next/image";
import Link from "next/link";

export function Hero({ heroImageUrl }: { heroImageUrl: string }) {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,_rgba(212,168,83,0.1)_0%,_transparent_70%)]" />
        <div className="absolute top-[30%] left-[15%] w-72 h-72 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[15%] w-64 h-64 bg-primary/3 blur-[100px] rounded-full" />
      </div>

      <div className="max-container flex flex-col items-center text-center relative z-10">
        {/* Badge */}
        <div className="section-badge mb-6 fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          New: AI-Generated Diagrams
        </div>
        
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 fade-in text-fg" style={{ animationDelay: "100ms" }}>
          Design scalable system <br className="hidden md:block" />
          <span className="text-gradient">architectures</span> in minutes.
        </h1>
        
        {/* Subheading */}
        <p className="max-w-2xl text-lg md:text-xl text-fg-muted mb-10 fade-in" style={{ animationDelay: "200ms" }}>
          Infinite canvas, real-time collaboration, ready architecture components, and AI-generated diagrams. Built for engineers.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 fade-in" style={{ animationDelay: "300ms" }}>
          <Link href="/handler/sign-up" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto text-center">
            Start Free Trial
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
          <Link href="#features" className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto text-center">
            Learn More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>

        <div className="text-sm text-fg-subtle mb-16 fade-in" style={{ animationDelay: "400ms" }}>
          No credit card required. Try instantly.
        </div>

        {/* Hero Image */}
        <div className="relative w-full max-w-5xl mx-auto fade-in rounded-2xl overflow-hidden border border-border" style={{ animationDelay: "500ms" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] z-10 pointer-events-none rounded-2xl" />
          <Image 
            src={heroImageUrl} 
            alt="SystemPad Interface" 
            width={1200} 
            height={800} 
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
