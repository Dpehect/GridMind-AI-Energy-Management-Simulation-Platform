"use client";
import type { ReactNode } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePlatformStore } from "@/features/platform/platform-store";
import { CommandPalette } from "@/features/platform/command-palette";
import { NotificationCenter } from "@/features/platform/notification-center";

export function DashboardShellV2({ children }: { children: ReactNode }) {
  const { setCommandOpen, setNotificationOpen, setMobileNavOpen } = usePlatformStore();
  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/70 bg-background/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-2">
            <button className="rounded-xl p-2 hover:bg-accent lg:hidden" onClick={()=>setMobileNavOpen(true)} aria-label="Open navigation"><Menu className="size-5"/></button>
            <button className="flex min-w-0 items-center gap-3 rounded-xl border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-accent" onClick={()=>setCommandOpen(true)}>
              <Search className="size-4"/><span className="hidden sm:inline">Search GridMind</span><kbd className="hidden rounded-md border px-1.5 py-0.5 text-[10px] md:inline">⌘K</kbd>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative rounded-xl p-2 hover:bg-accent" onClick={()=>setNotificationOpen(true)} aria-label="Open notifications"><Bell className="size-5"/><span className="absolute right-1 top-1 size-2 rounded-full bg-rose-500"/></button>
            <ThemeToggle/>
          </div>
        </header>
        {children}
      </div>
      <CommandPalette/>
      <NotificationCenter/>
    </div>
  );
}
