"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { navigationGroups } from "./navigation-config";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-border/70 bg-sidebar lg:sticky lg:top-0 lg:flex lg:flex-col">
      <Link href="/" className="flex h-20 items-center px-6">
        <Logo />
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6" aria-label="Application navigation">
        {navigationGroups.map((group) => (
          <section key={group.label}>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {group.label}
            </p>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => {
                const active =
                  item.href === "/dashboard"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <BarChart3 className="size-4 text-primary" />
          <p className="mt-3 text-xs font-medium">Integration rebuild</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Build, navigation, test and CI foundations are active.
          </p>
        </div>
      </div>
    </aside>
  );
}
