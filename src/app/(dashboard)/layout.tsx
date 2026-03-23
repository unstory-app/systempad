"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser, useStackApp } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  HelpCircle,
  History,
  Settings,
  ChevronLeft,
  Library
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

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
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-[1.5px] border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user === null) {
    return null;
  }

  const navGroups = [
    {
      label: "General",
      items: [
        { label: "Boards", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Recent", icon: History, href: "/dashboard/recent" },
      ]
    },
    {
      label: "Pages",
      items: [
        { label: "Templates", icon: FileText, href: "/dashboard/templates" },
        { label: "Gallery", icon: Library, href: "/dashboard/gallery" },
      ]
    },
    {
      label: "Setup",
      items: [
        { label: "Settings", icon: Settings, href: "/dashboard/settings" },
        { label: "Help", icon: HelpCircle, href: "/docs" },
      ]
    }
  ];

  const isEditor = pathname.includes("/board/");

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      {!isEditor && (
        <aside className="w-64 border-r border-border bg-background flex flex-col z-30 shrink-0">
          <div className="px-4 py-6">
            <Link 
              href="/" 
              className="group flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <div className="mb-8">
              <h1 className="px-2 text-2xl font-display font-medium tracking-tight">SystemPad</h1>
              <p className="px-2 text-[11px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Design</p>
            </div>
          </div>

          <nav className="flex-grow px-3 space-y-8">
            {navGroups.map((group) => (
              <div key={group.label} className="space-y-1">
                <p className="px-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors group",
                      pathname === item.href 
                        ? "bg-accent text-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <item.icon className={cn(
                      "w-4 h-4",
                      pathname === item.href ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <div className="p-4 mt-auto border-t border-border">
            <div className="flex items-center gap-3 px-2 py-1">
              <UserButton showUserInfo={false} />
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium truncate">
                  {user.displayName || user.primaryEmail?.split('@')[0]}
                </span>
                <span className="text-[11px] text-muted-foreground">Free Plan</span>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto bg-background relative flex flex-col">
        {!isEditor && (
          <header className="h-14 border-b border-border flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-20 shrink-0">
            <div className="flex items-center gap-4 flex-grow max-w-md">
               <div className="relative w-full group">
                 <input 
                   type="text" 
                   placeholder="Search..." 
                   className="w-full bg-accent/30 border border-border rounded-md py-1.5 px-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-foreground/10 transition-all placeholder:text-muted-foreground"
                 />
               </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="h-8 w-8 rounded-full bg-accent border border-border flex items-center justify-center text-[10px] font-bold">
                {user.displayName?.charAt(0) || "U"}
              </div>
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

