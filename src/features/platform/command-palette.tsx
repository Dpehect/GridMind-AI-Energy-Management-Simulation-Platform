"use client";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePlatformStore } from "./platform-store";
import { searchPlatform } from "./search-index";

export function CommandPalette() {
  const { commandOpen, setCommandOpen, globalQuery, setGlobalQuery } = usePlatformStore();
  const results = useMemo(() => searchPlatform(globalQuery), [globalQuery]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(!commandOpen);
      }
      if (event.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandOpen, setCommandOpen]);

  if (!commandOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={() => setCommandOpen(false)}>
      <div className="mx-auto mt-[10vh] max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl" onMouseDown={(e)=>e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b p-4">
          <Search className="size-5 text-muted-foreground"/>
          <input autoFocus value={globalQuery} onChange={(e)=>setGlobalQuery(e.target.value)} placeholder="Search GridMind…" className="w-full bg-transparent text-sm outline-none"/>
          <kbd className="rounded-lg border px-2 py-1 text-xs text-muted-foreground">Esc</kbd>
        </div>
        <div className="max-h-[420px] overflow-y-auto p-2">
          {results.map((item)=><Link key={item.id} href={item.href} onClick={()=>setCommandOpen(false)} className="block rounded-2xl px-4 py-3 hover:bg-accent"><p className="text-sm font-medium">{item.title}</p><p className="mt-1 text-xs text-muted-foreground">{item.keywords.join(" · ")}</p></Link>)}
        </div>
      </div>
    </div>
  );
}
