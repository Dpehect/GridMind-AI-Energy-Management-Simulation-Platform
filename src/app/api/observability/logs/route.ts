import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/features/auth/session";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user =
    await requirePermission("audit.read");
  const { searchParams } = new URL(
    request.url
  );

  const level =
    searchParams.get("level") ?? undefined;
  const limit = Math.min(
    500,
    Math.max(
      1,
      Number(
        searchParams.get("limit") ?? 100
      )
    )
  );

  const logs = await prisma.runtimeLog.findMany({
    where: {
      workspaceId: user.workspaceId,
      level
    },
    orderBy: {
      createdAt: "desc"
    },
    take: limit
  });

  return NextResponse.json(logs, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
