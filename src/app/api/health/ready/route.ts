import { NextResponse } from "next/server";
import { getRuntimeHealth } from "@/lib/runtime/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = await getRuntimeHealth();
  const ready = health.status !== "blocked";

  return NextResponse.json(
    {
      ready,
      checkedAt: health.checkedAt,
      checks: health.checks
    },
    {
      status: ready ? 200 : 503,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
