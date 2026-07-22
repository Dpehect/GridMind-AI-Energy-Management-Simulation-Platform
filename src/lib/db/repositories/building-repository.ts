import { db } from '@/lib/db/client';

export const buildingRepository = {
  listByWorkspace(workspaceId: string) {
    return db.building.findMany({
      where: { workspaceId, deletedAt: null }, orderBy: { name: 'asc' },
      include: { _count: { select: { floors: true, meters: true, devices: true } }, floors: { select: { _count: { select: { zones: true } } } } },
    });
  },
  findByCode(workspaceId: string, code: string) {
    return db.building.findUnique({ where: { workspaceId_code: { workspaceId, code } }, include: { floors: { include: { zones: true } }, meters: true, devices: true } });
  },
};
