"use client";

import { AlertTriangle, BatteryCharging, Cpu, Gauge, Lightbulb, Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { energyDevicePins, energyZones } from "@/data/energy-map-demo";
import { useEnergyMapStore } from "@/features/energy-map/use-energy-map-store";

const deviceIcons = { meter: Gauge, hvac: Cpu, lighting: Lightbulb, charger: BatteryCharging };

function zoneColor(intensity: number) {
  if (intensity >= 90) return "rgba(239,68,68,0.48)";
  if (intensity >= 75) return "rgba(245,158,11,0.42)";
  if (intensity >= 55) return "rgba(234,179,8,0.34)";
  return "rgba(34,197,94,0.28)";
}

export function EnergyMapCanvas() {
  const { zoom, setZoom, selectedZoneId, selectZone, layers, undo, history } = useEnergyMapStore();
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.08),transparent_30%),linear-gradient(to_bottom,hsl(var(--card)),hsl(var(--background)))]">
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <Button size="icon" variant="outline" onClick={() => setZoom(zoom - 0.1)} aria-label="Zoom out"><Minus className="size-4" /></Button>
        <Button size="icon" variant="outline" onClick={() => setZoom(zoom + 0.1)} aria-label="Zoom in"><Plus className="size-4" /></Button>
        <Button size="icon" variant="outline" onClick={undo} disabled={!history.length} aria-label="Undo"><RotateCcw className="size-4" /></Button>
      </div>
      <div className="min-h-[560px] p-8 transition-transform duration-300" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
        <svg viewBox="0 0 100 100" className="mx-auto h-full min-h-[500px] w-full max-w-5xl" role="img" aria-label="Interactive building energy map">
          <rect x="4" y="5" width="92" height="85" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.8" />
          {energyZones.map((zone) => {
            const selected = selectedZoneId === zone.id;
            return (
              <g key={zone.id} onClick={() => selectZone(zone.id)} className="cursor-pointer">
                <rect x={zone.x} y={zone.y} width={zone.width} height={zone.height} rx="1.4" fill={layers.heatmap ? zoneColor(zone.intensity) : "hsl(var(--card))"} stroke={selected ? "hsl(var(--primary))" : "hsl(var(--border))"} strokeWidth={selected ? 1.2 : 0.5} />
                {layers.labels ? <text x={zone.x + 2} y={zone.y + 4} fontSize="2.4" fill="hsl(var(--foreground))" fontWeight="600">{zone.name}</text> : null}
                {layers.labels ? <text x={zone.x + 2} y={zone.y + 7.5} fontSize="2" fill="hsl(var(--muted-foreground))">{zone.intensity} kWh</text> : null}
                {layers.alerts && zone.status !== "normal" ? <circle cx={zone.x + zone.width - 3} cy={zone.y + 3} r="1.5" fill={zone.status === "critical" ? "#ef4444" : "#f59e0b"} /> : null}
              </g>
            );
          })}
          {layers.devices ? energyDevicePins.map((device) => {
            const Icon = deviceIcons[device.type];
            return <foreignObject key={device.id} x={device.x - 2} y={device.y - 2} width="4" height="4"><div className="grid h-full w-full place-items-center rounded-full border border-border bg-background shadow"><Icon className="size-2.5 text-primary" /></div></foreignObject>;
          }) : null}
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-border bg-background/90 px-3 py-2 text-xs shadow-sm backdrop-blur">
        <AlertTriangle className="size-3.5 text-amber-500" /><span>2 elevated zones</span>
      </div>
    </div>
  );
}
