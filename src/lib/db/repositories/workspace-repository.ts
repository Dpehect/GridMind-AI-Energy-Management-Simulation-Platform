import { db } from '@/lib/db/client';

export const workspaceRepository = {
  list() {
    return db.workspace.findMany({ orderBy: { createdAt: 'asc' } });
  },
  findBySlug(slug: string) {
    return db.workspace.findUnique({ where: { slug }, include: { settings: true, goals: true } });
  },
  async getSystemCounts() {
    const [workspaceCount, buildingCount, readingCount] = await db.$transaction([
      db.workspace.count(), db.building.count({ where: { deletedAt: null } }), db.reading.count(),
    ]);
    return { workspaceCount, buildingCount, readingCount };
  },
};
