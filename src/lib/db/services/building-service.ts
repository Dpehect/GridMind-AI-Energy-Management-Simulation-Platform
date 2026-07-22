import type { BuildingSummary } from '@/lib/domain/entities';
import { buildingRepository } from '@/lib/db/repositories/building-repository';

export async function listBuildingSummaries(workspaceId: string): Promise<BuildingSummary[]> {
  const buildings = await buildingRepository.listByWorkspace(workspaceId);
  return buildings.map((building) => ({
    id: building.id, name: building.name, code: building.code, type: building.type,
    floorAreaM2: building.floorAreaM2, occupancy: building.occupancy,
    floorCount: building._count.floors,
    zoneCount: building.floors.reduce((sum, floor) => sum + floor._count.zones, 0),
    meterCount: building._count.meters, deviceCount: building._count.devices,
  }));
}
