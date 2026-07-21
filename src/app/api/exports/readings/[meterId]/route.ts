import { createCsvStream } from "@/features/exports/streaming-csv";
import { iterateReadings } from "@/features/exports/reading-export-source";
import { requirePermission } from "@/features/auth/session";

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ meterId: string }>;
  }
) {
  await requirePermission("energy.read");
  const { meterId } = await context.params;

  const stream = createCsvStream(
    [
      "id",
      "meterId",
      "capturedAt",
      "value",
      "quality",
      "source"
    ],
    iterateReadings({ meterId })
  );

  return new Response(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="readings-${meterId}.csv"`,
      "Cache-Control": "no-store"
    }
  });
}
