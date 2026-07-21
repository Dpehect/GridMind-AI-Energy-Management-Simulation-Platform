import { NextResponse } from "next/server";
import { requirePermission } from "@/features/auth/session";
import { createVerifiedBackup } from "@/lib/backup/backup-service";

export async function POST() {
  await requirePermission("workspace.manage");

  const backup = await createVerifiedBackup({
    destinationDirectory: process.env.GRIDMIND_BACKUP_DIR ?? "./backups"
  });

  return NextResponse.json(backup, { status: 201 });
}
