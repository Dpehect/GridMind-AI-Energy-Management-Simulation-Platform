import { NextResponse } from "next/server";
import { requireUser } from "@/features/auth/session";
import { revokeAllUserSessions } from "@/features/auth/session-manager";
import { writeSecurityEvent } from "@/features/auth/security-events";

export async function POST() {
  const user = await requireUser();

  await revokeAllUserSessions(user.id);

  await writeSecurityEvent({
    workspaceId: user.workspaceId,
    userId: user.id,
    type: "sessions.revoked_all",
    severity: "warning"
  });

  return NextResponse.json({ success: true });
}
