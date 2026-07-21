import { Map, ScanLine } from "lucide-react";
import { EnergyMapCanvas } from "@/components/energy-map/energy-map-canvas";
import { FloorSelector } from "@/components/energy-map/floor-selector";
import { LayerControls } from "@/components/energy-map/layer-controls";
import { ZoneDetailPanel } from "@/components/energy-map/zone-detail-panel";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";

export default function EnergyMapPage() {
  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader eyebrow="Phase 11" title="2D Building Energy Map" description="Inspect floors, compare zone intensity, locate devices and surface operational alerts in a single interactive workspace." action={<FloorSelector />} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <EnergyMapCanvas />
        <div className="space-y-6">
          <SectionCard title="Map layers" description="Control the operational overlays shown on the floor plan."><LayerControls /></SectionCard>
          <SectionCard title="Zone intelligence" description="Live context for the currently selected region."><ZoneDetailPanel /></SectionCard>
          <SectionCard title="Map capabilities" description="Phase 11 baseline interaction model."><div className="space-y-3 text-sm text-muted-foreground"><p className="flex gap-2"><Map className="mt-0.5 size-4 text-primary" />Floor switching, zoom controls and responsive canvas behavior.</p><p className="flex gap-2"><ScanLine className="mt-0.5 size-4 text-primary" />Heatmap, device, alert and label overlays with zone selection.</p></div></SectionCard>
        </div>
      </div>
    </main>
  );
}
