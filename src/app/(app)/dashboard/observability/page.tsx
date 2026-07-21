import {
  Activity,
  AlertTriangle,
  Bug,
  Gauge
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { getObservabilityOverview } from "@/features/observability/overview-service";
import { ErrorList } from "@/features/observability/error-list";
import { SystemMetricGrid } from "@/features/observability/system-metric-grid";

export default async function ObservabilityPage() {
  const context = await getTenantContext();
  const overview =
    await getObservabilityOverview();

  const incidents =
    await prisma.errorIncident.findMany({
      where: {
        workspaceId: context.workspaceId,
        status: "open"
      },
      orderBy: {
        lastSeenAt: "desc"
      },
      take: 20
    });

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 33"
        title="Observability & Reliability"
        description="Runtime logs, grouped errors, health checks and resource diagnostics."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Errors (24h)"
          value={String(overview.errors)}
          trend="Runtime logs"
          icon={Bug}
        />
        <MetricCard
          label="Warnings (24h)"
          value={String(overview.warnings)}
          trend="Requires review"
          icon={AlertTriangle}
        />
        <MetricCard
          label="Open incidents"
          value={String(
            overview.openIncidents
          )}
          trend="Grouped fingerprints"
          icon={Activity}
        />
        <MetricCard
          label="Diagnostics"
          value={String(
            overview.recentDiagnostics.length
          )}
          trend="Recent runs"
          icon={Gauge}
        />
      </div>

      <SystemMetricGrid
        items={overview.recentMetrics}
      />

      <ErrorList items={incidents} />
    </main>
  );
}
