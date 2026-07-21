import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";

export async function getJobDashboard() {
  const context = await getTenantContext();

  const [queued, running, failed, completed, recent] = await Promise.all([
    prisma.backgroundJob.count({
      where: { workspaceId: context.workspaceId, status: "queued" }
    }),
    prisma.backgroundJob.count({
      where: { workspaceId: context.workspaceId, status: "running" }
    }),
    prisma.backgroundJob.count({
      where: { workspaceId: context.workspaceId, status: "failed" }
    }),
    prisma.backgroundJob.count({
      where: { workspaceId: context.workspaceId, status: "completed" }
    }),
    prisma.backgroundJob.findMany({
      where: { workspaceId: context.workspaceId },
      orderBy: { createdAt: "desc" },
      take: 25
    })
  ]);

  return { queued, running, failed, completed, recent };
}
