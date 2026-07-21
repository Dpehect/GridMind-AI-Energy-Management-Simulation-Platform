export type MaintenanceRisk = "low" | "medium" | "high" | "critical";
export type WorkOrderStatus = "scheduled" | "in_progress" | "completed" | "overdue";

export type DeviceHealthSnapshot = {
  deviceId: string;
  assetTag: string;
  deviceName: string;
  category: string;
  buildingName: string;
  healthScore: number;
  risk: MaintenanceRisk;
  operatingHours: number;
  anomalyCount30d: number;
  efficiencyLossPercent: number;
  nextMaintenanceAt: string;
  estimatedAnnualWasteKwh: number;
};

export type WorkOrder = {
  id: string;
  title: string;
  deviceId: string;
  deviceName: string;
  assetTag: string;
  buildingName: string;
  technician: string;
  scheduledAt: string;
  status: WorkOrderStatus;
  priority: MaintenanceRisk;
  estimatedCost: number;
  actualCost?: number;
  description: string;
  outcome?: string;
};

export type MaintenanceSummary = {
  fleetHealth: number;
  openWorkOrders: number;
  overdueWorkOrders: number;
  predictedFailures: number;
  estimatedWasteKwh: number;
  plannedCost: number;
};
