import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/features/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user =
    await requirePermission("audit.read");

  const incidents =
    await prisma.errorIncident.findMany({
      where: {
        workspaceId: user.workspaceId
      },
      orderBy: {
        lastSeenAt: "desc"
      },
      take: 100
    });

  return NextResponse.json(incidents, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
