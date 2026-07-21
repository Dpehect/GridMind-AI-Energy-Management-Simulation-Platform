import { NextResponse } from "next/server";
import { requirePermission } from "@/features/auth/session";
import { restoreBuilding } from "@/lib/data-integrity/soft-delete";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const user = await requirePermission("workspace.manage");
  const { id } = await context.params;

  const building = await restoreBuilding({
    context: {
      actor: user.email,
      workspaceId: user.workspaceId
    },
    buildingId: id
  });

  return NextResponse.json(building);
}
