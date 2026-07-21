import { Activity, AlertTriangle, Gauge, Wrench } from "lucide-react";
import type { DeviceHealthSnapshot } from "./types";
import { estimateMaintenanceImpact, failureProbability } from "./health-engine";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

export function DeviceHealthTable({ devices }: { devices: DeviceHealthSnapshot[] }) {
  return (
    <SectionCard title="Device health intelligence" description="Explainable local scoring from operating hours, anomalies and efficiency loss.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted-foreground">
            <tr className="border-b"><th className="pb-3">Asset</th><th className="pb-3">Health</th><th className="pb-3">Risk</th><th className="pb-3">Anomalies</th><th className="pb-3">Efficiency loss</th><th className="pb-3">Failure probability</th><th className="pb-3">Recoverable energy</th></tr>
          </thead>
          <tbody>
            {devices.map((device) => {
              const impact = estimateMaintenanceImpact(device);
              return (
                <tr key={device.deviceId} className="border-b border-border/60">
                  <td className="py-4"><p className="font-medium">{device.deviceName}</p><p className="text-xs text-muted-foreground">{device.assetTag} · {device.category}</p></td>
                  <td className="py-4"><span className="inline-flex items-center gap-2 font-semibold"><Gauge className="size-4 text-primary" />{device.healthScore}/100</span></td>
                  <td className="py-4"><StatusBadge status={device.risk === "critical" ? "critical" : device.risk === "high" ? "warning" : device.risk === "medium" ? "info" : "success"}>{device.risk}</StatusBadge></td>
                  <td className="py-4"><span className="inline-flex items-center gap-2"><Activity className="size-4" />{device.anomalyCount30d}</span></td>
                  <td className="py-4">{device.efficiencyLossPercent.toFixed(1)}%</td>
                  <td className="py-4"><span className="inline-flex items-center gap-2"><AlertTriangle className="size-4 text-amber-500" />{Math.round(failureProbability(device) * 100)}%</span></td>
                  <td className="py-4"><span className="inline-flex items-center gap-2"><Wrench className="size-4 text-primary" />{impact.expectedSavingsKwh.toLocaleString()} kWh/y</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
