import { NextResponse } from "next/server";
import { getRuntimeHealth } from "@/lib/runtime/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = await getRuntimeHealth();

  return NextResponse.json(health, {
    status: health.status === "blocked" ? 503 : 200,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
