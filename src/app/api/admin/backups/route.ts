import { NextResponse } from "next/server";
import { requirePermission } from "@/features/auth/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await requirePermission("workspace.manage");

  const backups = await prisma.backupRecord.findMany({
    where: { workspaceId: user.workspaceId },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(backups, {
    headers: { "Cache-Control": "no-store" }
  });
}
