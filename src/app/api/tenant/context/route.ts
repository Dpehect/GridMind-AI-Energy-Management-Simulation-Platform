import { NextResponse } from "next/server";
import { getTenantContext } from "@/features/tenancy/context";
import { getActiveWorkspace } from "@/features/tenancy/workspace-service";

export const dynamic = "force-dynamic";

export async function GET() {
  const [context, workspace] = await Promise.all([
    getTenantContext(),
    getActiveWorkspace()
  ]);

  return NextResponse.json(
    {
      context,
      workspace
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
