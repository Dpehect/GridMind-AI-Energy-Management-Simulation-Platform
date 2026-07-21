import { NextResponse } from "next/server";
import { listAccessibleBuildings } from "@/features/tenancy/building-access";

export const dynamic = "force-dynamic";

export async function GET() {
  const buildings = await listAccessibleBuildings();

  return NextResponse.json(buildings, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
