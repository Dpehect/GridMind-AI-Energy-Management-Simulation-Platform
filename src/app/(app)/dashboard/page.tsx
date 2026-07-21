import { CalendarDays, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricGrid } from "@/features/dashboard/metric-grid";
import { UsageChart } from "@/features/dashboard/usage-chart";
import { ZoneTable } from "@/features/dashboard/zone-table";
export default function DashboardPage() { return <main className="p-5 md:p-8"><div className="mx-auto max-w-[1500px]"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-medium text-primary">North Campus · Operations</p><h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Energy command center</h1><p className="mt-2 text-sm text-muted-foreground">Live operational context from deterministic local demo data.</p></div><div className="flex flex-wrap gap-2"><Button variant="outline"><CalendarDays className="size-4" />Today</Button><Button variant="outline"><Download className="size-4" />Export</Button><Button><Plus className="size-4" />New scenario</Button></div></div><div className="mt-8"><MetricGrid /></div><div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]"><UsageChart /><ZoneTable /></div></div></main>; }
