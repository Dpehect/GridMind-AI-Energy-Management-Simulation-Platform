export type BuildingSummary = {
  id: string;
  name: string;
  code: string;
  type: string;
  floorAreaM2: number;
  occupancy: number;
  floorCount: number;
  zoneCount: number;
  meterCount: number;
  deviceCount: number;
};

export type DatabaseHealth = {
  status: 'healthy' | 'degraded';
  provider: 'sqlite';
  workspaceCount: number;
  buildingCount: number;
  readingCount: number;
  checkedAt: string;
  message?: string;
};
