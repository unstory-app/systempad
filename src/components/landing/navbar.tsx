"use client";

import Link from "next/link";
import { useUser } from "@stackframe/stack";
import { ThemeToggle } from "../theme-toggle";

export function Navbar() {
  const user = useUser();

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-container h-14 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display font-medium text-xl tracking-tight">SystemPad</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-muted-foreground">
          <Link href="#product" className="hover:text-foreground transition-colors">Product</Link>
          <Link href="#resources" className="hover:text-foreground transition-colors">Resources</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Link href="/dashboard" className="text-[13px] font-medium hover:text-foreground transition-colors">Dashboard</Link>
          ) : (
            <>
              <Link href="/handler/sign-in" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
              <Link href="/handler/sign-up" className="btn-primary py-1.5 px-4 text-xs">
                Start for free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
