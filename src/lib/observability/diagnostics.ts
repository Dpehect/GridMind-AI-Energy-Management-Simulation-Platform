import { prisma } from "@/lib/prisma";
import { getRuntimeHealth } from "@/lib/runtime/health";
import { collectSystemMetrics } from "./system-metrics";

export async function runDiagnostics() {
  const started = performance.now();

  const runtime = await getRuntimeHealth();
  const metrics = await collectSystemMetrics();

  const checks = [
    ...runtime.checks,
    {
      id: "metrics",
      label: "System metrics collection",
      status: "pass",
      detail: `${metrics.length} metrics captured`
    }
  ];

  const status = checks.some(
    (check) => check.status === "fail"
  )
    ? "blocked"
    : checks.some(
          (check) => check.status === "warn"
        )
      ? "attention"
      : "ready";

  return prisma.diagnosticRun.create({
    data: {
      status,
      checks,
      completedAt: new Date(),
      durationMs: Math.round(
        performance.now() - started
      )
    }
  });
}
