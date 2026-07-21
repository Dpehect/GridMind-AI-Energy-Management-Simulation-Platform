import { prisma } from "@/lib/prisma";
import type { MutationContext } from "./types";

export async function createEntityVersion(input: {
  context: MutationContext;
  entityType: string;
  entityId: string;
  snapshot: unknown;
}) {
  const latest = await prisma.entityVersion.findFirst({
    where: {
      entityType: input.entityType,
      entityId: input.entityId
    },
    orderBy: { version: "desc" }
  });

  return prisma.entityVersion.create({
    data: {
      workspaceId: input.context.workspaceId,
      entityType: input.entityType,
      entityId: input.entityId,
      version: (latest?.version ?? 0) + 1,
      snapshot: input.snapshot as never,
      actor: input.context.actor
    }
  });
}
