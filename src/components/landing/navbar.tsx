"use client";

import Link from "next/link";
import { UserButton, useUser } from "@stackframe/stack";

export function Navbar() {
  const user = useUser();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border-subtle">
      <div className="max-container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
            S
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-fg">SystemPad</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-fg-subtle">
          <Link href="#features" className="hover:text-primary transition-colors duration-300">Features</Link>
          <Link href="#templates" className="hover:text-primary transition-colors duration-300">Templates</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors duration-300">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <UserButton showUserInfo />
          ) : (
            <>
              <Link href="/handler/sign-in" className="text-sm font-medium hover:text-primary transition-colors duration-300 text-fg-subtle">Login</Link>
              <Link href="/handler/sign-up" className="btn-primary py-2 px-5 text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
