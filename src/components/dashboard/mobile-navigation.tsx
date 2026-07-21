"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationGroups } from "./navigation-config";
import { usePlatformStore } from "@/features/platform/platform-store";

export function MobileNavigation() {
  const pathname = usePathname();
  const { mobileNavOpen, setMobileNavOpen } = usePlatformStore();

  if (!mobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] lg:hidden">
      <button
        aria-label="Close navigation backdrop"
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
        onClick={() => setMobileNavOpen(false)}
      />
      <aside className="absolute inset-y-0 left-0 w-[min(88vw,340px)] overflow-y-auto border-r border-border bg-background p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">GridMind Navigation</span>
          <button
            aria-label="Close navigation"
            className="rounded-xl p-2 hover:bg-accent"
            onClick={() => setMobileNavOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="mt-6 space-y-6">
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
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-primary text-primary-foreground"
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
      </aside>
    </div>
  );
}
