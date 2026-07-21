import { NextResponse } from "next/server";
import { verifySchemaCompatibility } from "@/lib/deployment/migration-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await verifySchemaCompatibility();

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    return NextResponse.json(
      {
        compatible: false,
        message:
          error instanceof Error
            ? error.message
            : "Schema compatibility check failed"
      },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" }
      }
    );
  }
}
