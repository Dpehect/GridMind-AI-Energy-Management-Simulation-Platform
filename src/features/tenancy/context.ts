import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/features/auth/session";
import type { TenantContext } from "./types";

const WORKSPACE_COOKIE = "gridmind-workspace";

export async function getTenantContext(): Promise<TenantContext> {
  const user = await requireUser();
  const cookieStore = await cookies();
  const selectedWorkspaceId = cookieStore.get(WORKSPACE_COOKIE)?.value;

  const memberships = await prisma.workspaceMembership.findMany({
    where: {
      userId: user.id,
      active: true,
      workspace: {
        organizationId: { not: null }
      }
    },
    include: {
      workspace: {
        include: {
          organization: true
        }
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  if (!memberships.length) {
    throw new Error("User has no active workspace membership");
  }

  const membership =
    memberships.find(
      (item) => item.workspaceId === selectedWorkspaceId
    ) ?? memberships[0];

  const organizationMembership =
    await prisma.organizationMembership.findUnique({
      where: {
        organizationId_userId: {
          organizationId: membership.workspace.organizationId!,
          userId: user.id
        }
      }
    });

  if (!organizationMembership?.active) {
    throw new Error("Organization membership is not active");
  }

  return {
    organizationId: membership.workspace.organizationId!,
    workspaceId: membership.workspaceId,
    userId: user.id,
    organizationRole:
      organizationMembership.role as TenantContext["organizationRole"],
    workspaceRole:
      membership.role as TenantContext["workspaceRole"]
  };
}
