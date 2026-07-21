import { NextResponse } from "next/server";
import { getWorkspaceFeatureFlags } from "@/features/tenancy/feature-flags";

export const dynamic = "force-dynamic";

export async function GET() {
  const flags = await getWorkspaceFeatureFlags();

  return NextResponse.json(flags, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
