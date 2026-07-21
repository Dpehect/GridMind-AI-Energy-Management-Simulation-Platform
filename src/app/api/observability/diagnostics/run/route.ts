import { NextResponse } from "next/server";
import { requirePermission } from "@/features/auth/session";
import { runDiagnostics } from "@/lib/observability/diagnostics";

export async function POST() {
  await requirePermission("workspace.manage");
  const run = await runDiagnostics();

  return NextResponse.json(run, {
    status: 201
  });
}
