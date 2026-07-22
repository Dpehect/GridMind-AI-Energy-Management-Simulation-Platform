import { db } from '@/lib/db/client';

export const readingRepository = {
  range(meterId: string, from: Date, to: Date) {
    return db.reading.findMany({ where: { meterId, capturedAt: { gte: from, lte: to } }, orderBy: { capturedAt: 'asc' } });
  },
  latest(meterId: string) {
    return db.reading.findFirst({ where: { meterId }, orderBy: { capturedAt: 'desc' } });
  },
};
