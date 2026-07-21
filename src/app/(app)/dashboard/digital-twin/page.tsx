import dynamic from "next/dynamic";
import { Activity, Box, Layers3, Zap } from "lucide-react";
import { DigitalTwinControls } from "@/features/digital-twin/digital-twin-controls";
import { MetricCard } from "@/components/ui/metric-card";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";

const DigitalTwinScene = dynamic(
  () => import("@/features/digital-twin/digital-twin-scene").then((module) => module.DigitalTwinScene),
  { ssr: false, loading: () => <div className="h-[560px] animate-pulse rounded-[28px] border border-border bg-muted" /> }
);

export default function DigitalTwinPage() {
  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 12"
        title="3D Energy Digital Twin"
        description="Explore building demand, floor-level intensity and operational alerts through a local interactive model."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Modeled floors" value="3" trend="+1 from 2D map" icon={Layers3} />
        <MetricCard label="Live zones" value="6" trend="2 require attention" icon={Box} />
        <MetricCard label="Peak modeled load" value="96%" trend="Server room" icon={Zap} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <DigitalTwinScene />
        <DigitalTwinControls />
      </div>
      <SectionCard title="Model interpretation" description="Digital twin values are deterministic demo projections.">
        <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          <div className="rounded-2xl border border-border p-4"><Activity className="mb-3 size-5 text-primary" /><p className="font-medium text-foreground">Heat layer</p><p className="mt-1 leading-6">Green indicates efficient operation; amber and rose indicate increasingly intensive demand.</p></div>
          <div className="rounded-2xl border border-border p-4"><Layers3 className="mb-3 size-5 text-primary" /><p className="font-medium text-foreground">Exploded floors</p><p className="mt-1 leading-6">Separate levels to identify vertical demand patterns and isolate operational zones.</p></div>
          <div className="rounded-2xl border border-border p-4"><Box className="mb-3 size-5 text-primary" /><p className="font-medium text-foreground">Zone selection</p><p className="mt-1 leading-6">Select any room block to expose its current load and alert state directly in-scene.</p></div>
        </div>
      </SectionCard>
    </main>
  );
}
