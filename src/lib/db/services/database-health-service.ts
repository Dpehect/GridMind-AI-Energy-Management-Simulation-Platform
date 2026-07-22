import type { DatabaseHealth } from '@/lib/domain/entities';
import { workspaceRepository } from '@/lib/db/repositories/workspace-repository';

export async function getDatabaseHealth(): Promise<DatabaseHealth> {
  try {
    const counts = await workspaceRepository.getSystemCounts();
    return { status: 'healthy', provider: 'sqlite', ...counts, checkedAt: new Date().toISOString() };
  } catch (error) {
    return { status: 'degraded', provider: 'sqlite', workspaceCount: 0, buildingCount: 0, readingCount: 0, checkedAt: new Date().toISOString(), message: error instanceof Error ? error.message : 'Unknown database error' };
  }
}
