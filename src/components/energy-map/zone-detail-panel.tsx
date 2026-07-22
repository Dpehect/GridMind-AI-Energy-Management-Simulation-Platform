"use client";

import { Activity, AlertTriangle, Gauge, TrendingUp } from "lucide-react";
import { energyZones } from "@/data/energy-map-demo";
import { useEnergyMapStore } from "@/features/energy-map/use-energy-map-store";

export function ZoneDetailPanel() {
  const selectedZoneId = useEnergyMapStore((state) => state.selectedZoneId);
  const zone = energyZones.find((item) => item.id === selectedZoneId) ?? energyZones[0];
  const metrics = [
    ["Current load", `${zone.intensity} kWh`, Gauge],
    ["Peak variance", zone.intensity > 80 ? "+18.4%" : "+4.2%", TrendingUp],
    ["Active events", zone.status === "normal" ? "0" : "1", AlertTriangle],
    ["Data confidence", "96%", Activity]
  ] as const;
  return (
    <div className="space-y-4">
      <div><p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Selected zone</p><h3 className="mt-2 text-xl font-semibold">{zone.name}</h3><p className="mt-1 text-sm text-muted-foreground">Operational summary for the current floor and selected time window.</p></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {metrics.map(([label, value, Icon]) => <div key={label} className="rounded-xl border border-border bg-muted/30 p-4"><div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="size-3.5" />{label}</div><p className="mt-2 text-lg font-semibold">{value}</p></div>)}
      </div>
    </div>
  );
}
