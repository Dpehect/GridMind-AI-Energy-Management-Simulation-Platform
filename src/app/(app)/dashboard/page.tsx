import { Activity, Database, ShieldCheck } from "lucide-react";
import { CommandMetrics } from "@/features/dashboard/command-metrics";
import { DemandProfile } from "@/features/dashboard/demand-profile";
import { EnergyHeatmap } from "@/features/dashboard/energy-heatmap";
import { ZoneBreakdown } from "@/features/dashboard/zone-breakdown";
import { AlertFeed } from "@/features/dashboard/alert-feed";
import { CommandCenterToolbar } from "@/features/dashboard/command-center-toolbar";

export default function DashboardPage() {
  return <main className="p-5 md:p-8"><div className="mx-auto max-w-[1600px]">
    <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end"><div><div className="flex flex-wrap items-center gap-2 text-xs"><span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">North Campus</span><span className="flex items-center gap-1.5 text-muted-foreground"><i className="size-1.5 rounded-full bg-emerald-500"/>All systems operational</span></div><h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">Energy command center</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">A unified operational view of demand, cost, carbon, system health and actionable energy signals.</p></div><CommandCenterToolbar/></header>
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-y py-3 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Activity className="size-3.5 text-primary"/>Updated 18 seconds ago</span><span className="flex items-center gap-1.5"><Database className="size-3.5 text-primary"/>99.2% data quality</span><span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-primary"/>Local intelligence active</span></div>
    <div className="mt-6"><CommandMetrics/></div>
    <div className="mt-4 grid gap-4 2xl:grid-cols-[1.65fr_.85fr]"><DemandProfile/><ZoneBreakdown/></div>
    <div className="mt-4 grid gap-4 2xl:grid-cols-[1.35fr_1fr]"><EnergyHeatmap/><AlertFeed/></div>
  </div></main>;
}
