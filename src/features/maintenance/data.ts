import type { DeviceHealthSnapshot, WorkOrder } from "./types";

export const deviceHealthSnapshots: DeviceHealthSnapshot[] = [
  {
    deviceId: "dev-hvac-01",
    assetTag: "HVAC-01",
    deviceName: "North Wing Air Handler",
    category: "HVAC",
    buildingName: "GridMind HQ",
    healthScore: 91,
    risk: "low",
    operatingHours: 8240,
    anomalyCount30d: 1,
    efficiencyLossPercent: 2.4,
    nextMaintenanceAt: "2026-09-12T09:00:00+03:00",
    estimatedAnnualWasteKwh: 1240
  },
  {
    deviceId: "dev-chiller-02",
    assetTag: "CHLR-02",
    deviceName: "Primary Chiller",
    category: "Cooling",
    buildingName: "GridMind HQ",
    healthScore: 58,
    risk: "high",
    operatingHours: 14310,
    anomalyCount30d: 8,
    efficiencyLossPercent: 14.8,
    nextMaintenanceAt: "2026-08-02T08:30:00+03:00",
    estimatedAnnualWasteKwh: 18200
  },
  {
    deviceId: "dev-pump-04",
    assetTag: "PUMP-04",
    deviceName: "Hydronic Loop Pump",
    category: "Pump",
    buildingName: "GridMind HQ",
    healthScore: 42,
    risk: "critical",
    operatingHours: 16880,
    anomalyCount30d: 12,
    efficiencyLossPercent: 21.3,
    nextMaintenanceAt: "2026-07-25T10:00:00+03:00",
    estimatedAnnualWasteKwh: 9600
  },
  {
    deviceId: "dev-light-07",
    assetTag: "LGT-07",
    deviceName: "Office Lighting Controller",
    category: "Lighting",
    buildingName: "GridMind HQ",
    healthScore: 77,
    risk: "medium",
    operatingHours: 5610,
    anomalyCount30d: 3,
    efficiencyLossPercent: 6.1,
    nextMaintenanceAt: "2026-08-21T13:30:00+03:00",
    estimatedAnnualWasteKwh: 2870
  }
];

export const maintenanceWorkOrders: WorkOrder[] = [
  {
    id: "wo-1001",
    title: "Inspect compressor cycling",
    deviceId: "dev-chiller-02",
    deviceName: "Primary Chiller",
    assetTag: "CHLR-02",
    buildingName: "GridMind HQ",
    technician: "Mert Kaya",
    scheduledAt: "2026-08-02T08:30:00+03:00",
    status: "scheduled",
    priority: "high",
    estimatedCost: 14500,
    description: "Inspect short cycling, refrigerant pressure and condenser approach temperature."
  },
  {
    id: "wo-1002",
    title: "Replace pump bearing",
    deviceId: "dev-pump-04",
    deviceName: "Hydronic Loop Pump",
    assetTag: "PUMP-04",
    buildingName: "GridMind HQ",
    technician: "Selin Acar",
    scheduledAt: "2026-07-25T10:00:00+03:00",
    status: "overdue",
    priority: "critical",
    estimatedCost: 8200,
    description: "Replace worn bearing and verify vibration after alignment."
  },
  {
    id: "wo-0998",
    title: "Clean AHU filters",
    deviceId: "dev-hvac-01",
    deviceName: "North Wing Air Handler",
    assetTag: "HVAC-01",
    buildingName: "GridMind HQ",
    technician: "Mert Kaya",
    scheduledAt: "2026-07-14T09:00:00+03:00",
    status: "completed",
    priority: "low",
    estimatedCost: 1800,
    actualCost: 1650,
    description: "Replace filters and inspect fan belt tension.",
    outcome: "Airflow recovered by 7.2%. Fan current returned to baseline."
  }
];
