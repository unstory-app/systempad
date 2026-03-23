"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  FileText,
  Library,
  Settings,
  HelpCircle,
  ChevronLeft,
  LogOut,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, useStackApp } from "@stackframe/stack";

const navGroups = [
  {
    label: "General",
    items: [
      { title: "Boards", icon: LayoutDashboard, url: "/dashboard" },
      { title: "Recent", icon: History, url: "/dashboard/recent" },
    ],
  },
  {
    label: "Library",
    items: [
      { title: "Templates", icon: FileText, url: "/dashboard/templates" },
      { title: "Gallery", icon: Library, url: "/dashboard/gallery" },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", icon: Settings, url: "/dashboard/settings" },
      { title: "Docs", icon: HelpCircle, url: "/docs" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const user = useUser();
  const stack = useStackApp();

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="pt-6 px-4">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <div className="px-2 mb-2">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-display font-medium tracking-tight">SystemPad</h1>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Platform</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="mt-4">
            <SidebarGroupLabel className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                      className="px-3 py-2 text-[13px] font-medium"
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <SidebarMenuButton className="h-12 w-full justify-start gap-3 px-2">
                <Avatar className="h-7 w-7 rounded-sm border border-border">
                  <AvatarImage src={user.profileImageUrl || ""} alt={user.displayName || ""} />
                  <AvatarFallback className="rounded-sm bg-accent text-[10px]">
                    {user.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] font-medium leading-none">
                    {user.displayName || user.primaryEmail?.split("@")[0]}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1 lowercase">
                    {user.primaryEmail}
                  </span>
                </div>
              </SidebarMenuButton>
            } />
            <DropdownMenuContent side="right" align="end" className="w-56 bg-white dark:bg-black border-border p-1">
              <DropdownMenuItem 
                render={<Link href="/dashboard/settings" />}
                className="flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => window.location.href = stack.urls.signOut}
                className="flex items-center gap-2 text-destructive cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
