import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 pt-16 pb-8">
      <div className="max-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
              <span className="font-display font-bold text-lg">SystemPad</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[200px]">
              Design and share system architectures.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="#features" className="hover:text-zinc-900 transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</Link></li>
              <li><Link href="#templates" className="hover:text-zinc-900 transition-colors">Templates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/docs" className="hover:text-zinc-900 transition-colors">Docs</Link></li>
              <li><Link href="/blog" className="hover:text-zinc-900 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="https://twitter.com" className="hover:text-zinc-900 transition-colors">Twitter</Link></li>
              <li><Link href="https://github.com" className="hover:text-zinc-900 transition-colors">GitHub</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100 text-center">
          <p className="text-zinc-400 text-xs">© {new Date().getFullYear()} SystemPad</p>
        </div>
      </div>
    </footer>
  );
}
