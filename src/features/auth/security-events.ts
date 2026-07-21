import { prisma } from "@/lib/prisma";

export async function writeSecurityEvent(input: {
  workspaceId?: string;
  userId?: string;
  type: string;
  severity: "info" | "warning" | "critical";
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}) {
  return prisma.securityEvent.create({
    data: {
      workspaceId: input.workspaceId,
      userId: input.userId,
      type: input.type,
      severity: input.severity,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      metadata: input.metadata
    }
  });
}
