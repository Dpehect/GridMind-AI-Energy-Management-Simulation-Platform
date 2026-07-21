import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";

export async function getObservabilityOverview() {
  const context = await getTenantContext();

  const since = new Date(
    Date.now() - 24 * 60 * 60 * 1000
  );

  const [
    errors,
    warnings,
    openIncidents,
    recentDiagnostics,
    recentMetrics
  ] = await Promise.all([
    prisma.runtimeLog.count({
      where: {
        workspaceId: context.workspaceId,
        level: "error",
        createdAt: { gte: since }
      }
    }),
    prisma.runtimeLog.count({
      where: {
        workspaceId: context.workspaceId,
        level: "warn",
        createdAt: { gte: since }
      }
    }),
    prisma.errorIncident.count({
      where: {
        workspaceId: context.workspaceId,
        status: "open"
      }
    }),
    prisma.diagnosticRun.findMany({
      where: {
        OR: [
          { workspaceId: context.workspaceId },
          { workspaceId: null }
        ]
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 5
    }),
    prisma.systemMetric.findMany({
      where: {
        OR: [
          { workspaceId: context.workspaceId },
          { workspaceId: null }
        ]
      },
      orderBy: {
        capturedAt: "desc"
      },
      take: 20
    })
  ]);

  return {
    errors,
    warnings,
    openIncidents,
    recentDiagnostics,
    recentMetrics
  };
}
