export type WidgetKind = "metric" | "trend" | "table" | "alert" | "progress" | "heatmap";
export type DashboardWidget = {
  id: string;
  title: string;
  kind: WidgetKind;
  x: number;
  y: number;
  w: number;
  h: number;
  dataSource: string;
};
export type DashboardLayout = {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  updatedAt: string;
};
export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  reorderPoint: number;
  unitCost: number;
  location: string;
};
export type WorkOrderV2 = {
  id: string;
  title: string;
  assetId: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "backlog" | "scheduled" | "in_progress" | "blocked" | "completed";
  owner: string;
  startsAt: string;
  endsAt: string;
  estimatedCost: number;
  actualCost?: number;
  checklist: Array<{ id: string; label: string; done: boolean }>;
};
export type ScheduledReport = {
  id: string;
  name: string;
  cadence: "daily" | "weekly" | "monthly";
  format: "html" | "csv" | "json";
  nextRunAt: string;
  enabled: boolean;
};
