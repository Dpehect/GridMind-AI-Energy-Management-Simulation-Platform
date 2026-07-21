import { prisma } from "@/lib/prisma";

export async function enforceLogRetention(input: {
  runtimeLogDays?: number;
  metricDays?: number;
  diagnosticDays?: number;
}) {
  const runtimeCutoff = new Date(
    Date.now() -
      (input.runtimeLogDays ?? 30) *
        86400000
  );
  const metricCutoff = new Date(
    Date.now() -
      (input.metricDays ?? 14) *
        86400000
  );
  const diagnosticCutoff = new Date(
    Date.now() -
      (input.diagnosticDays ?? 90) *
        86400000
  );

  const [runtimeLogs, metrics, diagnostics] =
    await prisma.$transaction([
      prisma.runtimeLog.deleteMany({
        where: {
          createdAt: { lt: runtimeCutoff }
        }
      }),
      prisma.systemMetric.deleteMany({
        where: {
          capturedAt: { lt: metricCutoff }
        }
      }),
      prisma.diagnosticRun.deleteMany({
        where: {
          createdAt: { lt: diagnosticCutoff }
        }
      })
    ]);

  return {
    runtimeLogsDeleted: runtimeLogs.count,
    metricsDeleted: metrics.count,
    diagnosticsDeleted:
      diagnostics.count
  };
}
