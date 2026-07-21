import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/70 bg-background/80 px-5 backdrop-blur-xl md:px-8"><button className="flex w-full max-w-sm items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"><Search className="size-4" />Search GridMind…<kbd className="ml-auto hidden rounded border border-border px-1.5 py-0.5 text-[10px] md:inline">⌘ K</kbd></button><div className="flex items-center gap-1"><Button variant="ghost" size="icon" aria-label="Notifications"><Bell className="size-4" /></Button><ThemeToggle /><div className="ml-2 grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">GM</div></div></header>;
}
