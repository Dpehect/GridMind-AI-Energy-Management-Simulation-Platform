import { prisma } from "@/lib/prisma";
import { getDefaultWorkspace } from "@/lib/workspace";

export async function writeAuditEvent(input: {
  actor?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  const workspace = await getDefaultWorkspace();
  return prisma.activityLog.create({
    data: {
      workspaceId: workspace.id,
      actor: input.actor ?? "local-system",
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: input.metadata
    }
  });
}
