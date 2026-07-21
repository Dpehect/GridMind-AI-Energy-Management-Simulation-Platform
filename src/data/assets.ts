export type BuildingRecord = {
  id: string; name: string; code: string; type: string; address: string; floorAreaM2: number; occupancy: number; status: "Operational" | "Optimization" | "Maintenance"; floors: number; zones: number; meters: number; devices: number; efficiency: number; monthlyKwh: number;
};

export type AssetRecord = {
  id: string; name: string; assetTag: string; category: string; building: string; zone: string; ratedPowerKw: number; status: "Active" | "Maintenance" | "Inactive"; operatingHours: number; health: number;
};

export const buildings: BuildingRecord[] = [
  { id: "noc-01", name: "North Operations Center", code: "NOC-01", type: "Corporate office", address: "Adana Technology Campus", floorAreaM2: 12400, occupancy: 680, status: "Operational", floors: 3, zones: 12, meters: 8, devices: 46, efficiency: 88, monthlyKwh: 186420 },
  { id: "srl-02", name: "South Research Lab", code: "SRL-02", type: "Laboratory", address: "Adana Research District", floorAreaM2: 8600, occupancy: 240, status: "Optimization", floors: 2, zones: 9, meters: 6, devices: 38, efficiency: 76, monthlyKwh: 241880 },
  { id: "wlc-03", name: "West Logistics Center", code: "WLC-03", type: "Warehouse", address: "Organized Industrial Zone", floorAreaM2: 18900, occupancy: 125, status: "Operational", floors: 1, zones: 7, meters: 5, devices: 29, efficiency: 91, monthlyKwh: 138670 },
  { id: "ehq-04", name: "East Administration HQ", code: "EHQ-04", type: "Administration", address: "Central Business Quarter", floorAreaM2: 7200, occupancy: 410, status: "Maintenance", floors: 5, zones: 15, meters: 10, devices: 54, efficiency: 69, monthlyKwh: 154230 }
];

export const assets: AssetRecord[] = [
  { id: "a1", name: "Operations HVAC AHU-1", assetTag: "HVAC-AHU-001", category: "HVAC", building: "North Operations Center", zone: "Operations Hall", ratedPowerKw: 92, status: "Active", operatingHours: 16320, health: 93 },
  { id: "a2", name: "Research Chiller 2", assetTag: "CHLR-SRL-002", category: "Cooling", building: "South Research Lab", zone: "Wet Laboratory", ratedPowerKw: 138, status: "Maintenance", operatingHours: 20110, health: 61 },
  { id: "a3", name: "Warehouse Lighting Bank A", assetTag: "LGT-WLC-014", category: "Lighting", building: "West Logistics Center", zone: "Storage A", ratedPowerKw: 34, status: "Active", operatingHours: 8820, health: 97 },
  { id: "a4", name: "Administration Heat Pump", assetTag: "HP-EHQ-003", category: "HVAC", building: "East Administration HQ", zone: "Executive Wing", ratedPowerKw: 64, status: "Inactive", operatingHours: 14530, health: 48 },
  { id: "a5", name: "Main Operations Meter", assetTag: "MTR-NOC-001", category: "Metering", building: "North Operations Center", zone: "Operations Hall", ratedPowerKw: 0, status: "Active", operatingHours: 26400, health: 99 },
  { id: "a6", name: "Server Room UPS", assetTag: "UPS-NOC-004", category: "Power", building: "North Operations Center", zone: "Data Center", ratedPowerKw: 120, status: "Active", operatingHours: 23840, health: 86 }
];

export const floors = [
  { name: "Ground floor", level: 0, area: 4100, zones: ["Operations Hall", "Reception & Common", "Data Center"] },
  { name: "First floor", level: 1, area: 4200, zones: ["Engineering", "Meeting Wing", "Product Studio"] },
  { name: "Second floor", level: 2, area: 4100, zones: ["Executive", "Training", "Cafeteria"] }
];
