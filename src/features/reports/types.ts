export type ReportType = "executive" | "energy" | "cost" | "carbon" | "maintenance" | "scenario";
export type ReportStatus = "draft" | "ready" | "archived";
export type ReportBlockType = "summary" | "metric" | "chart" | "table" | "recommendations" | "notes";

export type ReportBlock = {
  id: string;
  type: ReportBlockType;
  title: string;
  enabled: boolean;
  order: number;
};

export type ReportTemplate = {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  blocks: ReportBlock[];
};

export type SavedReport = {
  id: string;
  title: string;
  type: ReportType;
  status: ReportStatus;
  periodStart: string;
  periodEnd: string;
  building: string;
  createdAt: string;
  version: number;
  blocks: ReportBlock[];
};

export type ReportDataset = {
  totalEnergyKwh: number;
  energyChangePercent: number;
  totalCost: number;
  costChangePercent: number;
  carbonKg: number;
  carbonChangePercent: number;
  peakDemandKw: number;
  anomalies: number;
  recommendations: string[];
  monthlySeries: Array<{ month: string; energy: number; cost: number; carbon: number }>;
};
