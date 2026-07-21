import { NextResponse } from "next/server";
import { requirePermission } from "@/features/auth/session";
import { scheduleDueWork } from "@/features/jobs/scheduler";

export async function POST() {
  await requirePermission("workspace.manage");
  const result = await scheduleDueWork();

  return NextResponse.json(result);
}
