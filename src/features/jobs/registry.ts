import type { JobHandler } from "./types";
import { generateScheduledReport } from "./tasks/generate-scheduled-report";
import { generateRecurringMaintenance } from "./tasks/generate-recurring-maintenance";
import { evaluateLowStock } from "./tasks/evaluate-low-stock";
import { collectObservabilityMetrics } from "./tasks/collect-observability-metrics";

const handlers: Record<string, JobHandler<any, any>> = {
  "report.generate_scheduled": generateScheduledReport,
  "maintenance.generate_recurring": generateRecurringMaintenance,
  "inventory.evaluate_low_stock": evaluateLowStock,
  "observability.collect_metrics": collectObservabilityMetrics
};

export function getJobHandler(type: string) {
  const handler = handlers[type];

  if (!handler) {
    throw new Error(`Unknown job type: ${type}`);
  }

  return handler;
}
