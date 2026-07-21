"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  ClipboardList,
  FileText,
  PackageSearch,
  Search,
  Target,
  Wrench
} from "lucide-react";
import type { GlobalSearchResult } from "./types";

const icons = {
  building: Building2,
  device: Wrench,
  work_order: ClipboardList,
  report: FileText,
  goal: Target,
  inventory: PackageSearch
};

export function GlobalSearchDialog({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<GlobalSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || query.trim().length < 2) {
      setItems([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        setItems(await response.json());
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [open, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-start bg-slate-950/50 p-4 pt-[10vh] backdrop-blur-sm">
      <button aria-label="Close global search" className="absolute inset-0" onClick={onClose} />
      <section className="relative mx-auto w-full max-w-2xl rounded-[28px] border border-border bg-background p-4 shadow-2xl">
        <div className="flex items-center gap-3 rounded-2xl border border-border px-4">
          <Search className="size-5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search buildings, devices, work orders, reports…"
            className="h-14 w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="mt-4 max-h-[55vh] overflow-y-auto">
          {loading ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              Searching…
            </p>
          ) : items.length ? (
            <div className="space-y-1">
              {items.map((item) => {
                const Icon = icons[item.type];

                return (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-accent"
                  >
                    <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="p-6 text-center text-sm text-muted-foreground">
              Enter at least two characters.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
