"use client";

import { useUser, useStackApp } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { syncUser } from "@/lib/actions/user";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const router = useRouter();
  const stack = useStackApp();

  useEffect(() => {
    if (user === null) {
      router.push(stack.urls.signIn);
    } else if (user) {
      // Sync user with our database
      syncUser(user);
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

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background text-foreground overflow-hidden w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col overflow-hidden bg-background">
          <header className="h-14 border-b border-border flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-20 shrink-0">
            <div className="flex items-center gap-4 grow max-w-md">
               <div className="relative w-full group">
                 <input 
                   type="text" 
                   placeholder="Search..." 
                   className="w-full bg-accent/30 border border-border rounded-md py-1.5 px-3 text-[12px] focus:outline-none focus:ring-1 focus:ring-foreground/10 transition-all placeholder:text-muted-foreground"
                 />
               </div>
            </div>

              <div className="flex grow items-center gap-2 px-4">
              <ThemeToggle />
            </div>
          </header>

          <div className="grow overflow-y-auto p-8">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}


