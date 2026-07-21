import { prisma } from "@/lib/prisma";
import { getTenantContext } from "./context";

export async function listAccessibleBuildings() {
  const context = await getTenantContext();

  if (
    ["workspace_admin", "energy_manager", "facility_manager"].includes(
      context.workspaceRole
    )
  ) {
    return prisma.building.findMany({
      where: {
        workspaceId: context.workspaceId,
        deletedAt: null,
        isActive: true
      },
      orderBy: {
        name: "asc"
      }
    });
  }

  const grants = await prisma.buildingAccess.findMany({
    where: {
      workspaceId: context.workspaceId,
      userId: context.userId
    },
    include: {
      building: true
    }
  });

  return grants
    .map((grant) => grant.building)
    .filter(
      (building) =>
        !building.deletedAt &&
        building.isActive
    );
}

export async function requireBuildingAccess(
  buildingId: string,
  level: "read" | "operate" | "manage"
) {
  const context = await getTenantContext();

  const building = await prisma.building.findFirst({
    where: {
      id: buildingId,
      workspaceId: context.workspaceId,
      deletedAt: null
    }
  });

  if (!building) {
    throw new Error("Building not found in active workspace");
  }

  if (context.workspaceRole === "workspace_admin") {
    return { context, building };
  }

  const grant = await prisma.buildingAccess.findUnique({
    where: {
      buildingId_userId: {
        buildingId,
        userId: context.userId
      }
    }
  });

  const rank = {
    read: 1,
    operate: 2,
    manage: 3
  };

  if (
    !grant ||
    rank[grant.accessLevel as keyof typeof rank] <
      rank[level]
  ) {
    throw new Error("Building access denied");
  }

  return { context, building };
}
