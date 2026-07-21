import { NextResponse } from "next/server";
import { requirePermission } from "@/features/auth/session";
import { verifyBackupRecord } from "@/lib/backup/backup-service";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await requirePermission("workspace.manage");
  const { id } = await context.params;
  const result = await verifyBackupRecord(id);

  return NextResponse.json(result);
}
