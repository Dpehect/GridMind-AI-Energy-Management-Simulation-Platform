import {
  Database,
  Gauge,
  Layers3,
  Zap
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { runPerformanceBenchmarks } from "@/features/performance/benchmark-runner";
import { BenchmarkTable } from "@/features/performance/benchmark-table";

export default async function PerformancePage() {
  const benchmarks =
    await runPerformanceBenchmarks();

  const slowest = Math.max(
    ...benchmarks.map(
      (item) => item.durationMs
    ),
    0
  );

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 36"
        title="Performance & Scale"
        description="Pagination, streaming exports, lazy loading and repository benchmarks."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Benchmarks"
          value={String(benchmarks.length)}
          trend="Repository checks"
          icon={Gauge}
        />
        <MetricCard
          label="Slowest query"
          value={`${slowest} ms`}
          trend="Current dataset"
          icon={Database}
        />
        <MetricCard
          label="CSV export"
          value="Streaming"
          trend="Constant memory"
          icon={Zap}
        />
        <MetricCard
          label="Large tables"
          value="Virtualized"
          trend="Client rendering"
          icon={Layers3}
        />
      </div>

      <BenchmarkTable items={benchmarks} />
    </main>
  );
}
