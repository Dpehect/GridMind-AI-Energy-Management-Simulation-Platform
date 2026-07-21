import { prisma } from "@/lib/prisma";
import type { MutationContext } from "./types";

export async function softDeleteBuilding(input: {
  context: MutationContext;
  buildingId: string;
}) {
  const building = await prisma.building.update({
    where: {
      id: input.buildingId,
      workspaceId: input.context.workspaceId,
      deletedAt: null
    },
    data: {
      deletedAt: new Date(),
      isActive: false
    }
  });

  await prisma.activityLog.create({
    data: {
      workspaceId: input.context.workspaceId,
      actor: input.context.actor,
      action: "building.soft_deleted",
      entityType: "Building",
      entityId: building.id
    }
  });

  return building;
}

export async function restoreBuilding(input: {
  context: MutationContext;
  buildingId: string;
}) {
  const building = await prisma.building.update({
    where: {
      id: input.buildingId,
      workspaceId: input.context.workspaceId
    },
    data: {
      deletedAt: null,
      isActive: true
    }
  });

  await prisma.activityLog.create({
    data: {
      workspaceId: input.context.workspaceId,
      actor: input.context.actor,
      action: "building.restored",
      entityType: "Building",
      entityId: building.id
    }
  });

  return building;
}
