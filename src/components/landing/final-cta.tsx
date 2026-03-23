import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-32 bg-background border-t border-border">
      <div className="max-container px-6 text-center">
        <h2 className="text-6xl md:text-8xl font-display font-medium tracking-tighter mb-10 text-foreground">
          Design systems <br/>at scale
        </h2>
        
        <div className="flex justify-center">
          <Link href="/handler/sign-up" className="btn-primary px-12 py-5 text-sm font-bold">
            Start for free
          </Link>
        </div>
        
        <p className="mt-8 text-muted-foreground text-[13px] font-medium uppercase tracking-widest">
          No credit card required
        </p>
      </div>
    </section>
  );
}
