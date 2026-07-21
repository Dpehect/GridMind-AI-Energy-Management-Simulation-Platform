import {
  Cpu,
  Database,
  HardDrive,
  MemoryStick
} from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";

function latestValue(
  items: Array<{
    key: string;
    value: number;
    unit: string;
  }>,
  key: string
) {
  return items.find(
    (item) => item.key === key
  );
}

export function SystemMetricGrid({
  items
}: {
  items: Array<{
    key: string;
    value: number;
    unit: string;
  }>;
}) {
  const heap = latestValue(
    items,
    "process.heap_used"
  );
  const rss = latestValue(
    items,
    "process.rss"
  );
  const load = latestValue(
    items,
    "system.load_1m"
  );
  const disk = latestValue(
    items,
    "disk.free"
  );

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <MetricCard
        label="Heap"
        value={
          heap
            ? `${(heap.value / 1024 / 1024).toFixed(1)} MB`
            : "N/A"
        }
        trend="Node.js process"
        icon={MemoryStick}
      />
      <MetricCard
        label="RSS"
        value={
          rss
            ? `${(rss.value / 1024 / 1024).toFixed(1)} MB`
            : "N/A"
        }
        trend="Resident memory"
        icon={Database}
      />
      <MetricCard
        label="Load average"
        value={
          load
            ? load.value.toFixed(2)
            : "N/A"
        }
        trend="1 minute"
        icon={Cpu}
      />
      <MetricCard
        label="Disk free"
        value={
          disk
            ? `${(disk.value / 1024 / 1024 / 1024).toFixed(1)} GB`
            : "N/A"
        }
        trend="Database volume"
        icon={HardDrive}
      />
    </div>
  );
}
