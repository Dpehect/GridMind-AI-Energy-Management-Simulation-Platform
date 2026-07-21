import { NextResponse } from "next/server";
import { requirePermission } from "@/features/auth/session";
import { processOneJob } from "@/features/jobs/worker";

export async function POST() {
  await requirePermission("workspace.manage");
  const result = await processOneJob();

  return NextResponse.json(result);
}
