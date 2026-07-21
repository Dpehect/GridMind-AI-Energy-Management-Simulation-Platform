"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import type { AuthenticatedUser } from "@/features/auth/types";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { SidebarV2 } from "@/components/dashboard/sidebar-v2";
import { GlobalSearchDialog } from "@/features/ux/global-search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/dashboard/user-menu";
import { usePlatformStore } from "@/features/platform/platform-store";

export function DashboardShellPhase38({
  children,
  user
}: {
  children: ReactNode;
  user: AuthenticatedUser;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { setMobileNavOpen, setNotificationOpen } = usePlatformStore();

  return (
    <div className="min-h-screen bg-background lg:flex">
      <SidebarV2 role={user.role} />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-2 md:px-6">
            <div className="flex min-w-0 items-center gap-2">
              <button
                className="rounded-xl p-2 hover:bg-accent lg:hidden"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open navigation"
              >
                <Menu className="size-5" />
              </button>

              <button
                className="flex min-w-0 items-center gap-3 rounded-xl border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="size-4" />
                <span className="hidden sm:inline">Search all GridMind data</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="rounded-xl p-2 hover:bg-accent"
                onClick={() => setNotificationOpen(true)}
                aria-label="Open notifications"
              >
                <Bell className="size-5" />
              </button>
              <ThemeToggle />
              <UserMenu user={user} />
            </div>
          </div>

          <div className="border-t border-border/60 px-4 py-2 md:px-6">
            <Breadcrumbs />
          </div>
        </header>

        {children}
      </div>

      <GlobalSearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
