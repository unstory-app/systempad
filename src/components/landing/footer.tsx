import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border-subtle pt-20 pb-10">
      <div className="max-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-fg">SystemPad</span>
            </div>
            <p className="text-fg-subtle text-sm max-w-xs leading-relaxed mb-8">
              The fastest way to design, document, and collaborate on system architectures. Built for the modern engineering stack.
            </p>
            <div className="flex gap-4 items-center">
               <Link href="https://twitter.com" className="text-fg-subtle hover:text-primary transition-colors duration-300">Twitter</Link>
               <Link href="https://github.com" className="text-fg-subtle hover:text-fg transition-colors duration-300">GitHub</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm text-fg">Product</h4>
            <ul className="space-y-4 text-sm text-fg-subtle">
              <li><Link href="#features" className="hover:text-primary transition-colors duration-300">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors duration-300">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-primary transition-colors duration-300">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm text-fg">Resources</h4>
            <ul className="space-y-4 text-sm text-fg-subtle">
              <li><Link href="#templates" className="hover:text-primary transition-colors duration-300">Templates</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors duration-300">Blog</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors duration-300">Public Gallery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm text-fg">Company</h4>
            <ul className="space-y-4 text-sm text-fg-subtle">
              <li><Link href="/about" className="hover:text-primary transition-colors duration-300">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors duration-300">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors duration-300">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border-subtle text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-fg-subtle text-xs">
            © {new Date().getFullYear()} SystemPad. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-fg-subtle">
            <span>Made with ❤️ for engineers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
