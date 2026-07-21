import type { DeviceHealthSnapshot, MaintenanceRisk, MaintenanceSummary, WorkOrder } from "./types";

export function calculateHealthScore(input: {
  operatingHours: number;
  expectedLifeHours: number;
  anomalyCount30d: number;
  efficiencyLossPercent: number;
  overdueDays: number;
}) {
  const lifePenalty = Math.min(35, (input.operatingHours / Math.max(input.expectedLifeHours, 1)) * 35);
  const anomalyPenalty = Math.min(25, input.anomalyCount30d * 2.2);
  const efficiencyPenalty = Math.min(25, input.efficiencyLossPercent * 1.25);
  const overduePenalty = Math.min(15, Math.max(0, input.overdueDays) * 0.75);
  return Math.max(0, Math.round(100 - lifePenalty - anomalyPenalty - efficiencyPenalty - overduePenalty));
}

export function classifyRisk(score: number): MaintenanceRisk {
  if (score < 45) return "critical";
  if (score < 65) return "high";
  if (score < 80) return "medium";
  return "low";
}

export function failureProbability(snapshot: DeviceHealthSnapshot) {
  const riskBase = { low: 0.05, medium: 0.18, high: 0.42, critical: 0.71 }[snapshot.risk];
  const anomalyFactor = Math.min(0.18, snapshot.anomalyCount30d * 0.012);
  const efficiencyFactor = Math.min(0.14, snapshot.efficiencyLossPercent * 0.005);
  return Math.min(0.95, Number((riskBase + anomalyFactor + efficiencyFactor).toFixed(2)));
}

export function buildMaintenanceSummary(
  devices: DeviceHealthSnapshot[],
  orders: WorkOrder[]
): MaintenanceSummary {
  const fleetHealth = Math.round(devices.reduce((sum, device) => sum + device.healthScore, 0) / Math.max(devices.length, 1));
  return {
    fleetHealth,
    openWorkOrders: orders.filter((order) => order.status !== "completed").length,
    overdueWorkOrders: orders.filter((order) => order.status === "overdue").length,
    predictedFailures: devices.filter((device) => failureProbability(device) >= 0.5).length,
    estimatedWasteKwh: devices.reduce((sum, device) => sum + device.estimatedAnnualWasteKwh, 0),
    plannedCost: orders
      .filter((order) => order.status !== "completed")
      .reduce((sum, order) => sum + order.estimatedCost, 0)
  };
}

export function estimateMaintenanceImpact(snapshot: DeviceHealthSnapshot) {
  const recoverableLoss = snapshot.efficiencyLossPercent * 0.68;
  const expectedSavingsKwh = Math.round(snapshot.estimatedAnnualWasteKwh * 0.72);
  const confidence = Math.max(0.55, Math.min(0.94, 0.58 + snapshot.anomalyCount30d * 0.025));
  return { recoverableLoss, expectedSavingsKwh, confidence };
}
