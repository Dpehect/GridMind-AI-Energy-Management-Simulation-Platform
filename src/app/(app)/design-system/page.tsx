"use client";
import { useState } from "react";
import { Activity, AlertTriangle, BatteryCharging, Building2, Gauge, Search, Zap } from "lucide-react";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip } from "@/components/ui/filter-chip";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { MetricCard } from "@/components/ui/metric-card";
import { PageHeader } from "@/components/ui/page-header";
import { Progress } from "@/components/ui/progress";
import { SectionCard } from "@/components/ui/section-card";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";

export default function DesignSystemPage() {
 const [period,setPeriod]=useState("day");
 return <main className="p-5 md:p-8"><div className="mx-auto max-w-[1500px] space-y-6">
  <PageHeader eyebrow="Phase 02 · Design system" title="GridMind interface language" description="Production-ready primitives and domain components for every energy workflow." actions={<><Button variant="outline">Documentation</Button><Button>Copy tokens</Button></>} />
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
   <MetricCard title="Energy use" value="18.4" unit="MWh" change={-8.2} icon={Zap}/>
   <MetricCard title="Peak demand" value="642" unit="kW" change={3.4} icon={Gauge}/>
   <MetricCard title="System health" value="94" unit="/100" change={1.8} icon={Activity}/>
   <MetricCard title="Battery reserve" value="76" unit="%" change={5.1} icon={BatteryCharging}/>
  </div>
  <div className="grid gap-6 xl:grid-cols-2">
   <SectionCard title="Controls" description="Inputs, actions and filtering patterns." action={<Kbd>⌘ K</Kbd>}>
    <div className="space-y-4"><div className="relative"><Search className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input className="pl-9" placeholder="Search buildings, meters or zones"/></div><Textarea placeholder="Operational note"/><div className="flex flex-wrap gap-2"><FilterChip active>North campus</FilterChip><FilterChip>Electricity</FilterChip><FilterChip onRemove={()=>{}}>Last 30 days</FilterChip></div><SegmentedControl value={period} onChange={setPeriod} options={[{label:"Day",value:"day"},{label:"Week",value:"week"},{label:"Month",value:"month"}]}/></div>
   </SectionCard>
   <SectionCard title="States" description="Status, progress and system feedback.">
    <div className="space-y-4"><div className="flex flex-wrap gap-2"><StatusBadge tone="healthy">Healthy</StatusBadge><StatusBadge tone="attention">Attention</StatusBadge><StatusBadge tone="critical">Critical</StatusBadge><StatusBadge>Offline</StatusBadge></div><div><div className="mb-2 flex justify-between text-sm"><span>Monthly target</span><span className="text-muted-foreground">72%</span></div><Progress value={72}/></div><AlertBanner icon={AlertTriangle} tone="warning" title="Peak load approaching" description="West wing demand is 12% above the weekday baseline."/></div>
   </SectionCard>
  </div>
  <SectionCard title="Data table" description="Dense operational data remains readable and responsive.">
   <DataTable headers={["Asset","Type","Status","Consumption"]} rows={[[<span className="font-medium">North Campus</span>,"Building",<StatusBadge tone="healthy">Online</StatusBadge>,"8.4 MWh"],[<span className="font-medium">Chiller 04</span>,"HVAC",<StatusBadge tone="attention">Inspect</StatusBadge>,"1.9 MWh"],[<span className="font-medium">Solar Array A</span>,"Generation",<StatusBadge tone="healthy">Producing</StatusBadge>,"-2.6 MWh"]]}/>
  </SectionCard>
  <div className="grid gap-6 xl:grid-cols-2"><EmptyState icon={Building2} title="No comparison selected" description="Select two or more facilities to compare their performance." action="Select facilities"/><SectionCard title="Loading states"><div className="space-y-3"><Skeleton className="h-10 w-2/3"/><Skeleton className="h-24 w-full"/><Skeleton className="h-4 w-4/5"/></div></SectionCard></div>
 </div></main>;
}
