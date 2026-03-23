import Image from "next/image";
import Link from "next/link";

export function Hero({ heroImageUrl }: { heroImageUrl: string }) {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-background">
      <div className="max-container flex flex-col items-center text-center relative z-10 px-6">
        <div className="inline-flex items-center px-2 py-0.5 rounded-sm bg-accent text-[10px] font-bold text-foreground uppercase tracking-wider mb-8">
          AI-Generated Diagrams
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tighter mb-8 text-foreground max-w-4xl leading-[0.9]">
          Architecture design, <br className="hidden md:block" />simplified.
        </h1>
        
        <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-12 font-medium">
          Map out your systems in seconds. Stop fighting with drawing tools. Start building with clarity.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-24">
          <Link href="/handler/sign-up" className="btn-primary text-base px-10 py-4 w-full sm:w-auto text-center font-bold">
            Start building now
          </Link>
        </div>

      </div>
    </section>
  );
}
