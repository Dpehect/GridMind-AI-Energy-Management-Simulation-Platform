import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";

export async function listDueMaintenancePlans(
  until = new Date(Date.now() + 7 * 86400000)
) {
  const context = await getTenantContext();

  return prisma.recurringMaintenancePlan.findMany({
    where: {
      workspaceId: context.workspaceId,
      enabled: true,
      nextRunAt: {
        lte: until
      }
    },
    include: {
      building: true,
      device: true
    },
    orderBy: {
      nextRunAt: "asc"
    }
  });
}

export function calculateNextRun(
  current: Date,
  cadence: string,
  interval: number
) {
  const next = new Date(current);

  if (cadence === "daily") next.setDate(next.getDate() + interval);
  else if (cadence === "weekly") next.setDate(next.getDate() + interval * 7);
  else if (cadence === "monthly") next.setMonth(next.getMonth() + interval);
  else if (cadence === "yearly") next.setFullYear(next.getFullYear() + interval);
  else throw new Error("Unsupported maintenance cadence");

  return next;
}
