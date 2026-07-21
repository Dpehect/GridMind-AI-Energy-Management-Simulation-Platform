import { ArrowDownRight, ArrowUpRight, Banknote, Bolt, Cloud, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";
import { commandMetrics } from "@/data/command-center";

const icons = [Bolt, Banknote, Cloud, Gauge];
const accents = ["var(--chart-energy)", "var(--chart-cost)", "var(--chart-carbon)", "var(--chart-warning)"];

export function CommandMetrics() {
  return <section aria-label="Key energy metrics" className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
    {commandMetrics.map((metric, index) => {
      const Icon = icons[index];
      const improving = metric.change < 0;
      return <Card key={metric.label} className="group relative overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-0.5">
        <div className="absolute inset-x-0 top-0 h-0.5 opacity-80" style={{ background: accents[index] }} />
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-sm text-muted-foreground">{metric.label}</p><p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{metric.value}<span className="ml-1.5 text-sm font-medium tracking-normal text-muted-foreground">{metric.unit}</span></p></div>
          <div className="grid size-10 shrink-0 place-items-center rounded-xl border bg-background/70" style={{ color: accents[index] }}><Icon className="size-5" /></div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 text-xs">
          <span className={improving ? "font-medium text-emerald-600 dark:text-emerald-300" : "font-medium text-amber-700 dark:text-amber-300"}>{improving ? <ArrowDownRight className="mr-1 inline size-3.5" /> : <ArrowUpRight className="mr-1 inline size-3.5" />}{Math.abs(metric.change)}%</span>
          <span className="truncate text-muted-foreground">{metric.detail}</span>
        </div>
      </Card>;
    })}
  </section>;
}
