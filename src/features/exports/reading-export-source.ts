import { prisma } from "@/lib/prisma";

export async function* iterateReadings(input: {
  meterId: string;
  batchSize?: number;
}) {
  const batchSize = Math.min(
    1000,
    Math.max(50, input.batchSize ?? 500)
  );

  let cursor: string | undefined;

  while (true) {
    const rows = await prisma.reading.findMany({
      where: {
        meterId: input.meterId
      },
      orderBy: {
        id: "asc"
      },
      take: batchSize,
      ...(cursor
        ? {
            skip: 1,
            cursor: { id: cursor }
          }
        : {})
    });

    if (!rows.length) break;

    for (const row of rows) {
      yield {
        id: row.id,
        meterId: row.meterId,
        capturedAt: row.capturedAt.toISOString(),
        value: row.value,
        quality: row.quality,
        source: row.source
      };
    }

    cursor = rows.at(-1)?.id;

    if (rows.length < batchSize) break;
  }
}
