import Link from "next/link";
import { BarChart3, BrainCircuit, Building2, FileText, Gauge, Settings2, SlidersHorizontal } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const items = [
  ["Overview", "/dashboard", Gauge],
  ["Buildings", "/dashboard/buildings", Building2],
  ["Intelligence", "/dashboard/intelligence", BrainCircuit],
  ["Scenarios", "/dashboard/scenarios", SlidersHorizontal],
  ["Reports", "/dashboard/reports", FileText]
] as const;

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-border/70 bg-sidebar p-4 lg:sticky lg:top-0 lg:block">
      <Link href="/" className="flex h-14 items-center px-3"><Logo /></Link>
      <nav className="mt-8 space-y-1" aria-label="Application navigation">
        {items.map(([label, href, Icon], index) => <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition", index === 0 ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-foreground")}><Icon className="size-4" />{label}</Link>)}
      </nav>
      <div className="absolute bottom-4 left-4 right-4"><Link href="/dashboard/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"><Settings2 className="size-4" />Settings</Link><div className="mt-3 rounded-2xl border border-border bg-card p-4"><BarChart3 className="size-4 text-primary" /><p className="mt-3 text-xs font-medium">Local demo mode</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Deterministic data. No external service calls.</p></div></div>
    </aside>
  );
}
