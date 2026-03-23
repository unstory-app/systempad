import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background py-16 px-6 border-t border-border">
      <div className="max-container flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6 text-[13px] font-medium text-muted-foreground uppercase tracking-wider">
          <Link href="#product" className="hover:text-foreground transition-colors">Product</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        </div>

        <div className="flex items-center gap-6 text-[12px] text-muted-foreground">
          <span>© {new Date().getFullYear()} SystemPad</span>
          <Link href="/privacy" className="hover:text-foreground transition-colors underline decoration-border underline-offset-4">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors underline decoration-border underline-offset-4">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
