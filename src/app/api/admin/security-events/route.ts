import { NextResponse } from "next/server";
import { requirePermission } from "@/features/auth/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await requirePermission("audit.read");
  const { searchParams } = new URL(request.url);
  const limit = Math.min(
    200,
    Math.max(1, Number(searchParams.get("limit") ?? 50))
  );

  const events = await prisma.securityEvent.findMany({
    where: {
      workspaceId: user.workspaceId
    },
    orderBy: {
      createdAt: "desc"
    },
    take: limit
  });

  return NextResponse.json(events, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
