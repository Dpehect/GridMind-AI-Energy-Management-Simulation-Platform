import { Activity, CircleGauge, Cpu, Wrench } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { AssetTable } from "@/features/assets/asset-table";
import { assets } from "@/data/assets";
export default function AssetsPage(){const active=assets.filter(a=>a.status==="Active").length;const avg=Math.round(assets.reduce((s,a)=>s+a.health,0)/assets.length);return <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8"><PageHeader eyebrow="Asset intelligence" title="Meters & devices" description="A single operational inventory for energy meters, HVAC, lighting, power and critical facility equipment." actions={<Button>Add asset</Button>}/><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Registered assets" value={String(assets.length)} icon={Cpu}/><MetricCard label="Active now" value={String(active)} icon={Activity}/><MetricCard label="Average health" value={`${avg}%`} icon={CircleGauge}/><MetricCard label="Needs attention" value={String(assets.filter(a=>a.health<70).length)} icon={Wrench}/></div><AssetTable/></main>}
