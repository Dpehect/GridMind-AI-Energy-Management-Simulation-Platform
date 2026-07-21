"use client";

import { BellRing, Cpu, Layers3, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEnergyMapStore } from "@/features/energy-map/use-energy-map-store";

const controls = [
  ["heatmap", Layers3, "Heatmap"],
  ["devices", Cpu, "Devices"],
  ["alerts", BellRing, "Alerts"],
  ["labels", Tags, "Labels"]
] as const;

export function LayerControls() {
  const layers = useEnergyMapStore((state) => state.layers);
  const toggleLayer = useEnergyMapStore((state) => state.toggleLayer);
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {controls.map(([key, Icon, label]) => (
        <Button key={key} type="button" variant={layers[key] ? "default" : "outline"} onClick={() => toggleLayer(key)} className="justify-start gap-2">
          <Icon className="size-4" />{label}
        </Button>
      ))}
    </div>
  );
}
