import { prisma } from "@/lib/prisma";
import { requireUser } from "@/features/auth/session";
import { getTenantContext } from "./context";

export async function listAccessibleWorkspaces() {
  const user = await requireUser();

  return prisma.workspaceMembership.findMany({
    where: {
      userId: user.id,
      active: true
    },
    include: {
      workspace: {
        include: {
          organization: true,
          locale: true
        }
      }
    },
    orderBy: {
      workspace: {
        name: "asc"
      }
    }
  });
}

export async function getActiveWorkspace() {
  const context = await getTenantContext();

  return prisma.workspace.findUniqueOrThrow({
    where: {
      id: context.workspaceId
    },
    include: {
      organization: true,
      locale: true,
      featureFlags: true
    }
  });
}
