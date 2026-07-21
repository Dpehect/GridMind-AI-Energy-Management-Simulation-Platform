import { Activity, Database, HardDrive, ServerCog } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";

export function SystemHealth() {
  return <div className="grid gap-4 md:grid-cols-4">
    <MetricCard label="Database" value="Healthy" trend="SQLite local" icon={Database}/>
    <MetricCard label="Storage" value="42 MB" trend="Local workspace" icon={HardDrive}/>
    <MetricCard label="Runtime" value="Stable" trend="Node.js" icon={ServerCog}/>
    <MetricCard label="Diagnostics" value="0 issues" trend="Last scan" icon={Activity}/>
  </div>;
}
