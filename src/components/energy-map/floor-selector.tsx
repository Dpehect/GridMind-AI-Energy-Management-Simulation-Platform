"use client";

import { ChevronDown } from "lucide-react";
import { useEnergyMapStore } from "@/features/energy-map/use-energy-map-store";

export function FloorSelector() {
  const floor = useEnergyMapStore((state) => state.floor);
  const setFloor = useEnergyMapStore((state) => state.setFloor);
  return (
    <label className="relative block">
      <span className="sr-only">Select floor</span>
      <select value={floor} onChange={(event) => setFloor(event.target.value)} className="h-10 appearance-none rounded-xl border border-border bg-background px-3 pr-9 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30">
        <option>Floor 1</option><option>Floor 2</option><option>Floor 3</option><option>Floor 4</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
    </label>
  );
}
