import type { ReportDataset, ReportTemplate, SavedReport } from "./types";

export const reportDataset: ReportDataset = {
  totalEnergyKwh: 428600,
  energyChangePercent: -8.4,
  totalCost: 169800,
  costChangePercent: -6.7,
  carbonKg: 151900,
  carbonChangePercent: -11.2,
  peakDemandKw: 910,
  anomalies: 14,
  recommendations: [
    "Optimize AHU morning start sequence",
    "Complete primary chiller maintenance",
    "Shift flexible loads to off-peak tariff window",
    "Introduce occupancy-based lighting zones"
  ],
  monthlySeries: [
    { month: "Jan", energy: 468000, cost: 184000, carbon: 171000 },
    { month: "Feb", energy: 455000, cost: 179500, carbon: 166000 },
    { month: "Mar", energy: 447000, cost: 176200, carbon: 162500 },
    { month: "Apr", energy: 439000, cost: 173000, carbon: 157800 },
    { month: "May", energy: 433000, cost: 171100, carbon: 154400 },
    { month: "Jun", energy: 428600, cost: 169800, carbon: 151900 }
  ]
};

export const reportTemplates: ReportTemplate[] = [
  {
    id: "tpl-executive",
    name: "Executive Energy Review",
    type: "executive",
    description: "Board-ready overview of energy, cost, carbon, risk and actions.",
    blocks: [
      { id: "summary", type: "summary", title: "Executive summary", enabled: true, order: 0 },
      { id: "metrics", type: "metric", title: "Headline metrics", enabled: true, order: 1 },
      { id: "trend", type: "chart", title: "Six-month performance", enabled: true, order: 2 },
      { id: "recs", type: "recommendations", title: "Priority actions", enabled: true, order: 3 }
    ]
  },
  {
    id: "tpl-maintenance",
    name: "Maintenance Intelligence",
    type: "maintenance",
    description: "Device health, work orders, energy waste and maintenance impact.",
    blocks: [
      { id: "summary", type: "summary", title: "Maintenance summary", enabled: true, order: 0 },
      { id: "metrics", type: "metric", title: "Fleet health metrics", enabled: true, order: 1 },
      { id: "table", type: "table", title: "Priority assets", enabled: true, order: 2 },
      { id: "notes", type: "notes", title: "Engineering notes", enabled: true, order: 3 }
    ]
  },
  {
    id: "tpl-carbon",
    name: "Carbon Performance",
    type: "carbon",
    description: "Operational emissions, progress, scenarios and recommendations.",
    blocks: [
      { id: "summary", type: "summary", title: "Carbon summary", enabled: true, order: 0 },
      { id: "metrics", type: "metric", title: "Carbon metrics", enabled: true, order: 1 },
      { id: "trend", type: "chart", title: "Carbon trend", enabled: true, order: 2 },
      { id: "recs", type: "recommendations", title: "Reduction opportunities", enabled: true, order: 3 }
    ]
  }
];

export const savedReports: SavedReport[] = [
  {
    id: "rpt-2026-06",
    title: "June Executive Energy Review",
    type: "executive",
    status: "ready",
    periodStart: "2026-06-01",
    periodEnd: "2026-06-30",
    building: "All buildings",
    createdAt: "2026-07-02T09:00:00+03:00",
    version: 3,
    blocks: reportTemplates[0].blocks
  },
  {
    id: "rpt-maint-07",
    title: "July Maintenance Intelligence",
    type: "maintenance",
    status: "draft",
    periodStart: "2026-07-01",
    periodEnd: "2026-07-31",
    building: "GridMind HQ",
    createdAt: "2026-07-20T14:30:00+03:00",
    version: 1,
    blocks: reportTemplates[1].blocks
  }
];
