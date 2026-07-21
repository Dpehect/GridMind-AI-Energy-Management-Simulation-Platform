"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { buildBreadcrumbs } from "@/features/ux/breadcrumbs";

export function Breadcrumbs() {
  const pathname = usePathname();
  const items = buildBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
      {items.map((item, index) => (
        <span key={item.href} className="flex min-w-0 items-center gap-1">
          {index > 0 ? <ChevronRight className="size-3 shrink-0" /> : null}
          <Link
            href={item.href}
            className="truncate hover:text-foreground"
            aria-current={index === items.length - 1 ? "page" : undefined}
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
