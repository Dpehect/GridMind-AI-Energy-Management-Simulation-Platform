import { ArrowDownRight } from "lucide-react";
import { energyMetrics } from "@/data/demo-metrics";
import { Card } from "@/components/ui/card";

export function MetricGrid() {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{energyMetrics.map((metric) => <Card key={metric.label} className="p-5"><div className="flex items-start justify-between"><p className="text-sm text-muted-foreground">{metric.label}</p><span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">{metric.change}</span></div><p className="mt-5 text-3xl font-semibold tracking-tight">{metric.value}</p><p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><ArrowDownRight className="size-3.5" />{metric.detail}</p></Card>)}</div>;
}
