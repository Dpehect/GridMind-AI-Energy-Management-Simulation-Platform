import { collectSystemMetrics } from "@/lib/observability/system-metrics";

export async function collectObservabilityMetrics() {
  const metrics = await collectSystemMetrics();
  return { captured: metrics.length };
}
