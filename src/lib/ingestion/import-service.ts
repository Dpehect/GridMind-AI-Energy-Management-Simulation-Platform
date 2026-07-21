import { prisma } from "@/lib/db/client";
import type { ReadingImportRow } from "./types";

export async function importReadings(rows: ReadingImportRow[]) {
  const serials = [...new Set(rows.map((row) => row.meterSerial))];
  const meters = await prisma.meter.findMany({ where: { serialNumber: { in: serials } }, select: { id: true, serialNumber: true } });
  const meterMap = new Map(meters.map((meter) => [meter.serialNumber, meter.id]));
  const unknownMeters = serials.filter((serial) => !meterMap.has(serial));
  if (unknownMeters.length) return { inserted: 0, skipped: rows.length, unknownMeters };
  let inserted = 0;
  let skipped = 0;
  await prisma.$transaction(async (tx) => {
    for (const row of rows) {
      const meterId = meterMap.get(row.meterSerial)!;
      try {
        await tx.reading.create({ data: { meterId, capturedAt: new Date(row.capturedAt), value: row.value, quality: row.quality, source: row.source } });
        inserted += 1;
      } catch { skipped += 1; }
    }
    await tx.activityLog.create({ data: { workspaceId: (await tx.workspace.findFirstOrThrow()).id, action: "READINGS_IMPORTED", entityType: "Reading", entityId: `batch-${Date.now()}`, details: { inserted, skipped, source: "csv" } } });
  });
  return { inserted, skipped, unknownMeters: [] as string[] };
}
