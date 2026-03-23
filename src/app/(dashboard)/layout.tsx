"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser, useStackApp } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  LayoutDashboard, 
  Plus, 
  FileText, 
  HelpCircle,
  History,
  GalleryVerticalEnd,
  Settings,
  Sun
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const stack = useStackApp();

  useEffect(() => {
    if (user === null) {
      router.push(stack.urls.signIn);
    }
  }, [user, router, stack]);

  if (user === undefined) {
    return <div className="h-screen w-full bg-[#0A0A0B] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  if (user === null) {
    return null;
  }

  const navItems = [
    { label: "Boards", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Recent", icon: History, href: "/dashboard/recent" },
    { label: "Templates", icon: FileText, href: "/dashboard/templates" },
    { label: "Gallery", icon: GalleryVerticalEnd, href: "/dashboard/gallery" },
  ];

  const secondaryNav = [
    { label: "Help", icon: HelpCircle, href: "/docs" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const isEditor = pathname.includes("/board/");

  return (
    <div className="flex h-screen bg-[#0A0A0B] text-[#F5F5F5] overflow-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* Sidebar */}
      {!isEditor && (
        <aside className="w-64 border-r border-[#27272A] bg-[#0F0F10] flex flex-col z-30 shrink-0">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <div className="w-8 h-8 bg-[#D4A853] rounded-lg flex items-center justify-center text-black font-bold text-lg shadow-[0_0_15px_rgba(212,168,83,0.3)]">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight">SystemPad</span>
            </Link>
          </div>


        <div className="px-4 mb-6">
          <button className="w-full btn-primary py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-[0_4px_20px_rgba(212,168,83,0.15)] hover:shadow-[0_4px_25px_rgba(212,168,83,0.25)] transition-all">
            <Plus className="w-4 h-4" />
            New Board
          </button>
        </div>

        <nav className="flex-grow px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href || "#"}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group",
                pathname === item.href 
                  ? "bg-[#D4A853]/10 text-[#D4A853]" 
                  : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#1A1A1B]"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-colors",
                pathname === item.href ? "text-[#D4A853]" : "group-hover:text-[#F5F5F5]"
              )} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-2 pb-6 space-y-1 mt-auto">
          {secondaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href || "#"}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#1A1A1B] transition-all group"
            >
              <item.icon className="w-4 h-4 group-hover:text-[#F5F5F5]" />
              {item.label}
            </Link>
          ))}
          
          <div className="px-4 py-4 mt-2">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#141415] border border-[#27272A]">
               <UserButton showUserInfo={false} />
               <div className="flex flex-col ml-3 flex-grow overflow-hidden">
                 <span className="text-xs font-semibold truncate leading-none mb-1">
                   {user.displayName || user.primaryEmail?.split('@')[0] || "Guest"}
                 </span>
                 <span className="text-[10px] text-[#A1A1AA] truncate leading-none">
                   Pro Plan
                 </span>
               </div>
            </div>
          </div>
        </div>
      </aside>
    )}

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto bg-[#0A0A0B] relative flex flex-col">
        {/* Subtle background flourishes */}
        {!isEditor && (
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(212,168,83,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />
        )}
        
        {!isEditor && (
          <header className="h-16 border-b border-[#27272A] flex items-center justify-between px-8 sticky top-0 bg-[#0A0A0B]/80 backdrop-blur-xl z-20 shrink-0">
            <div className="flex items-center gap-4 flex-grow max-w-xl">
               <div className="relative w-full">
                 <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                   <svg className="w-4 h-4 text-[#A1A1AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                 </div>
                 <input 
                   type="text" 
                   placeholder="Search boards, templates, or diagrams..." 
                   className="w-full bg-[#141415] border border-[#27272A] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A853]/50 transition-all placeholder:text-[#52525B]"
                 />
               </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="p-2 rounded-xl hover:bg-[#1A1A1B] text-[#A1A1AA] hover:text-[#F5F5F5] transition-all">
                 <Sun className="w-4 h-4" />
               </button>
               <Link href="/dashboard/notifications" className="p-2 rounded-xl hover:bg-[#1A1A1B] text-[#A1A1AA] hover:text-[#F5F5F5] transition-all relative">
                 <div className="absolute top-2 right-2 w-2 h-2 bg-[#D4A853] rounded-full" />
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                 </svg>
               </Link>
            </div>
          </header>
        )}

        <div className={cn("grow", !isEditor && "p-8")}>
          {children}
        </div>
      </main>
    </div>
  );
}
