import { Leaf, LineChart, PiggyBank, Zap } from "lucide-react";
import { reportDataset } from "./data";
import { generateExecutiveSummary } from "./engine";
import type { ReportBlock } from "./types";
import { MetricCard } from "@/components/ui/metric-card";
import { ReportChart } from "./report-chart";

export function ReportPreview({ title, blocks }: { title: string; blocks: ReportBlock[] }) {
  const enabled = blocks.filter((block) => block.enabled).sort((a, b) => a.order - b.order);
  return (
    <article id="report-print-root" className="space-y-6 rounded-[28px] border border-border bg-card p-6 shadow-sm print:border-0 print:shadow-none">
      <header className="border-b border-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">GridMind Reporting Studio</p>
        <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">GridMind HQ · 1 June–30 June 2026</p>
      </header>
      {enabled.map((block) => {
        if (block.type === "summary") return <section key={block.id}><h3 className="font-semibold">{block.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{generateExecutiveSummary(reportDataset)}</p></section>;
        if (block.type === "metric") return <section key={block.id}><h3 className="mb-4 font-semibold">{block.title}</h3><div className="grid gap-3 md:grid-cols-4"><MetricCard label="Energy" value={`${reportDataset.totalEnergyKwh.toLocaleString()} kWh`} trend={`${reportDataset.energyChangePercent}%`} icon={Zap}/><MetricCard label="Cost" value={`₺${reportDataset.totalCost.toLocaleString()}`} trend={`${reportDataset.costChangePercent}%`} icon={PiggyBank}/><MetricCard label="Carbon" value={`${reportDataset.carbonKg.toLocaleString()} kg`} trend={`${reportDataset.carbonChangePercent}%`} icon={Leaf}/><MetricCard label="Peak" value={`${reportDataset.peakDemandKw} kW`} trend={`${reportDataset.anomalies} anomalies`} icon={LineChart}/></div></section>;
        if (block.type === "chart") return <section key={block.id}><h3 className="mb-4 font-semibold">{block.title}</h3><ReportChart dataset={reportDataset}/></section>;
        if (block.type === "recommendations") return <section key={block.id}><h3 className="font-semibold">{block.title}</h3><ol className="mt-3 space-y-3">{reportDataset.recommendations.map((item, index)=><li key={item} className="rounded-2xl border border-border p-4 text-sm"><span className="mr-3 font-semibold text-primary">{index+1}.</span>{item}</li>)}</ol></section>;
        if (block.type === "notes") return <section key={block.id}><h3 className="font-semibold">{block.title}</h3><div className="mt-3 min-h-28 rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">Engineering notes and sign-off comments.</div></section>;
        return <section key={block.id}><h3 className="font-semibold">{block.title}</h3><p className="mt-3 text-sm text-muted-foreground">Structured report block.</p></section>;
      })}
    </article>
  );
}
