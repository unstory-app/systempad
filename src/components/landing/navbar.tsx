"use client";

import Link from "next/link";
import { UserButton, useUser } from "@stackframe/stack";

export function Navbar() {
  const user = useUser();

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="font-display font-bold text-xl tracking-tight">SystemPad</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
          <Link href="#features" className="hover:text-zinc-900 transition-colors">Features</Link>
          <Link href="#templates" className="hover:text-zinc-900 transition-colors">Templates</Link>
          <Link href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <UserButton />
          ) : (
            <>
              <Link href="/handler/sign-in" className="hidden sm:block text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Log in</Link>
              <Link href="/handler/sign-up" className="btn-primary py-2 px-5 text-sm">
                Start Designing
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
