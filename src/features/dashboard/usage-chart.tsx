"use client";

import { hourlyUsage } from "@/data/demo-metrics";
import { Card } from "@/components/ui/card";

export function UsageChart() {
  const max = Math.max(...hourlyUsage);
  const points = hourlyUsage.map((value, index) => `${(index / (hourlyUsage.length - 1)) * 100},${100 - (value / max) * 78}`).join(" ");
  return <Card className="overflow-hidden p-6"><div className="flex items-start justify-between"><div><p className="text-sm font-medium">Demand profile</p><p className="mt-1 text-sm text-muted-foreground">Hourly load across the selected building</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Today</span></div><div className="mt-8 h-64 w-full"><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible" role="img" aria-label="Hourly energy demand chart"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".28"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${points} 100,100`} fill="url(#area)" className="text-primary"/><polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.7" vectorEffect="non-scaling-stroke" className="text-primary"/></svg></div><div className="mt-3 flex justify-between text-[11px] text-muted-foreground"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div></Card>;
}
