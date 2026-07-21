import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
export function MetricCard({ title, label, value, unit, change, icon: Icon }: { title?: string; label?: string; value: string; unit?: string; change?: number; icon: LucideIcon }) {
  const positive = (change ?? 0) >= 0;
  const heading = title ?? label ?? "Metric";
  return <Card className="p-5"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">{heading}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{value}<span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span></p></div><div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-5" /></div></div>{change !== undefined ? <div className="mt-4 flex items-center gap-1.5 text-xs"><span className={positive ? "text-emerald-600" : "text-rose-600"}>{positive ? <ArrowUpRight className="inline size-3.5" /> : <ArrowDownRight className="inline size-3.5" />} {Math.abs(change)}%</span><span className="text-muted-foreground">vs previous period</span></div> : null}</Card>;
}
