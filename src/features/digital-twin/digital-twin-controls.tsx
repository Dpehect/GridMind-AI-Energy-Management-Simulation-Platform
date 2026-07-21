"use client";

import { Camera, Layers3, MonitorCog, Rotate3D } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { twinFloors } from "./data";
import { useTwinStore } from "./twin-store";
import type { CameraPreset, PerformanceMode } from "./types";

const cameraPresets: CameraPreset[] = ["overview", "front", "top", "floor"];
const performanceModes: PerformanceMode[] = ["quality", "balanced", "economy"];

export function DigitalTwinControls() {
  const {
    exploded,
    selectedFloor,
    performanceMode,
    cameraPreset,
    setExploded,
    setSelectedFloor,
    setPerformanceMode,
    setCameraPreset
  } = useTwinStore();

  return (
    <div className="space-y-4">
      <SectionCard title="Twin controls" description="Inspect energy behavior without external services.">
        <div className="space-y-5">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-medium"><Camera className="size-4" />Camera preset</p>
            <div className="grid grid-cols-2 gap-2">
              {cameraPresets.map((preset) => (
                <Button key={preset} variant={cameraPreset === preset ? "default" : "outline"} onClick={() => setCameraPreset(preset)} className="capitalize">
                  {preset}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-medium"><Layers3 className="size-4" />Floor isolation</p>
            <div className="flex flex-wrap gap-2">
              <Button variant={selectedFloor === null ? "default" : "outline"} onClick={() => setSelectedFloor(null)}>All</Button>
              {twinFloors.map((floor) => (
                <Button key={floor.id} variant={selectedFloor === floor.level ? "default" : "outline"} onClick={() => setSelectedFloor(floor.level)}>
                  {floor.level + 1}
                </Button>
              ))}
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => setExploded(!exploded)}>
            <Rotate3D className="mr-2 size-4" />{exploded ? "Collapse floors" : "Explode floors"}
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="Rendering profile" description="Adapt the digital twin to the current device.">
        <div className="grid gap-2">
          {performanceModes.map((mode) => (
            <Button key={mode} variant={performanceMode === mode ? "default" : "outline"} className="justify-start capitalize" onClick={() => setPerformanceMode(mode)}>
              <MonitorCog className="mr-2 size-4" />{mode}
            </Button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
