"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppRole } from "@/features/auth/types";
import { canSeeNavigationItem } from "@/features/auth/role-navigation";
import { navigationGroups } from "./navigation-config";
import { cn } from "@/lib/utils";

export function SidebarV2({ role }: { role: AppRole }) {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-border/70 bg-sidebar lg:flex lg:flex-col">
      <div className="px-6 py-6">
        <p className="text-sm font-semibold">GridMind Enterprise</p>
        <p className="mt-1 text-xs capitalize text-muted-foreground">
          {role.replaceAll("_", " ")}
        </p>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6">
        {navigationGroups.map((group) => {
          const visible = group.items.filter((item) =>
            canSeeNavigationItem(role, item.href)
          );

          if (!visible.length) return null;

          return (
            <section key={group.label}>
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group.label}
              </p>
              <div className="mt-2 space-y-1">
                {visible.map((item) => {
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
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
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
          );
        })}
      </nav>
    </aside>
  );
}
