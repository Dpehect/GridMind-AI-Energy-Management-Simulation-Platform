import { prisma } from "@/lib/prisma";
import { getTenantContext } from "./context";

export async function getWorkspaceFeatureFlags() {
  const context = await getTenantContext();

  return prisma.workspaceFeatureFlag.findMany({
    where: {
      workspaceId: context.workspaceId
    }
  });
}

export async function isWorkspaceFeatureEnabled(
  key: string
) {
  const context = await getTenantContext();

  const flag =
    await prisma.workspaceFeatureFlag.findUnique({
      where: {
        workspaceId_key: {
          workspaceId: context.workspaceId,
          key
        }
      }
    });

  return flag?.enabled ?? false;
}
