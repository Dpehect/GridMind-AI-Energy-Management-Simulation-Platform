import { prisma } from "@/lib/prisma";
import { decodeCursor, encodeCursor } from "@/lib/pagination/cursor";
import { normalizePageSize } from "@/lib/pagination/page-size";

export async function listReadingsPage(input: {
  meterId: string;
  cursor?: string | null;
  limit?: number;
}) {
  const pageSize = normalizePageSize(input.limit, {
    defaultSize: 100,
    maxSize: 500
  });
  const cursor = decodeCursor(input.cursor);

  const rows = await prisma.reading.findMany({
    where: {
      meterId: input.meterId,
      ...(cursor
        ? {
            OR: [
              {
                capturedAt: {
                  lt: cursor.createdAt
                }
              },
              {
                capturedAt: cursor.createdAt,
                id: {
                  lt: cursor.id
                }
              }
            ]
          }
        : {})
    },
    orderBy: [
      { capturedAt: "desc" },
      { id: "desc" }
    ],
    take: pageSize + 1
  });

  const hasMore = rows.length > pageSize;
  const items = hasMore
    ? rows.slice(0, pageSize)
    : rows;
  const last = items.at(-1);

  return {
    items,
    hasMore,
    nextCursor:
      hasMore && last
        ? encodeCursor({
            id: last.id,
            createdAt: last.capturedAt
          })
        : null
  };
}
