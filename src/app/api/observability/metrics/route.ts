import { NextResponse } from "next/server";
import { requirePermission } from "@/features/auth/session";
import { collectSystemMetrics } from "@/lib/observability/system-metrics";

export async function POST() {
  await requirePermission("workspace.manage");
  const metrics =
    await collectSystemMetrics();

  return NextResponse.json(metrics, {
    status: 201
  });
}
