import { Building2, Layers3, RadioTower, Zap } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { BuildingCards } from "@/features/assets/building-cards";
import { CreateBuildingDialog } from "@/features/assets/create-building-dialog";
import { buildings } from "@/data/assets";
export default function BuildingsPage(){const totals=buildings.reduce((a,b)=>({area:a.area+b.floorAreaM2,zones:a.zones+b.zones,meters:a.meters+b.meters,devices:a.devices+b.devices}),{area:0,zones:0,meters:0,devices:0});return <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8"><PageHeader eyebrow="Portfolio management" title="Buildings & facilities" description="Manage the physical hierarchy behind every energy reading, alert and optimization scenario." actions={<CreateBuildingDialog/>}/><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Managed area" value={`${(totals.area/1000).toFixed(1)}K m²`} icon={Building2}/><MetricCard label="Energy zones" value={String(totals.zones)} icon={Layers3}/><MetricCard label="Smart meters" value={String(totals.meters)} icon={RadioTower}/><MetricCard label="Connected assets" value={String(totals.devices)} icon={Zap}/></div><BuildingCards/></main>}
