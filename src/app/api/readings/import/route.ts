import { NextResponse } from "next/server";
import { z } from "zod";
import { importReadings } from "@/lib/ingestion/import-service";

const bodySchema = z.object({ rows: z.array(z.object({ meterSerial: z.string(), capturedAt: z.string().datetime({ offset: true }), value: z.number().nonnegative(), quality: z.number().min(0).max(1), source: z.enum(["csv", "manual", "demo"]) })).min(1).max(10000) });

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());
    const result = await importReadings(body.rows);
    return NextResponse.json(result, { status: result.unknownMeters.length ? 422 : 200 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: "Invalid import payload", issues: error.flatten() }, { status: 400 });
    return NextResponse.json({ message: "Import failed safely. No partial batch was committed." }, { status: 500 });
  }
}
