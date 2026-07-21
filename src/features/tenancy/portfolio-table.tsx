import { Building2, Cpu, Gauge } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";

export function PortfolioTable({
  items
}: {
  items: Array<{
    workspaceId: string;
    workspaceName: string;
    buildingCount: number;
    totalAreaM2: number;
    totalDevices: number;
    recentEnergyKwh: number;
    energyIntensity: number;
  }>;
}) {
  return (
    <SectionCard
      title="Organization portfolio"
      description="Compare workspaces across normalized operational metrics."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted-foreground">
            <tr className="border-b">
              <th className="pb-3">Workspace</th>
              <th className="pb-3">Buildings</th>
              <th className="pb-3">Area</th>
              <th className="pb-3">Devices</th>
              <th className="pb-3">Recent energy</th>
              <th className="pb-3">Intensity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.workspaceId}
                className="border-b border-border/60"
              >
                <td className="py-4 font-medium">
                  {item.workspaceName}
                </td>
                <td className="py-4">
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="size-4 text-primary" />
                    {item.buildingCount}
                  </span>
                </td>
                <td className="py-4">
                  {item.totalAreaM2.toLocaleString()} m²
                </td>
                <td className="py-4">
                  <span className="inline-flex items-center gap-2">
                    <Cpu className="size-4 text-primary" />
                    {item.totalDevices}
                  </span>
                </td>
                <td className="py-4">
                  {item.recentEnergyKwh.toLocaleString()} kWh
                </td>
                <td className="py-4">
                  <span className="inline-flex items-center gap-2">
                    <Gauge className="size-4 text-primary" />
                    {item.energyIntensity.toFixed(2)} kWh/m²
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
