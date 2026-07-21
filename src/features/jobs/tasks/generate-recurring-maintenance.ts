import { prisma } from "@/lib/prisma";
import { calculateNextRun } from "@/features/maintenance/recurring-plan-service";

export async function generateRecurringMaintenance(payload: {
  recurringMaintenancePlanId: string;
}) {
  const plan = await prisma.recurringMaintenancePlan.findUnique({
    where: { id: payload.recurringMaintenancePlanId }
  });

  if (!plan || !plan.enabled) {
    throw new Error("Recurring maintenance plan is unavailable");
  }

  const workOrder = await prisma.workOrder.create({
    data: {
      buildingId: plan.buildingId,
      deviceId: plan.deviceId,
      title: plan.title,
      description: "Generated from recurring maintenance plan",
      owner: plan.owner,
      status: "SCHEDULED",
      priority: "MEDIUM",
      startsAt: plan.nextRunAt,
      endsAt: new Date(plan.nextRunAt.getTime() + 2 * 3600000),
      estimatedCost: 0,
      checklist: plan.checklist
    }
  });

  const nextRunAt = calculateNextRun(
    plan.nextRunAt,
    plan.cadence,
    plan.interval
  );

  await prisma.recurringMaintenancePlan.update({
    where: { id: plan.id },
    data: { nextRunAt }
  });

  return { workOrderId: workOrder.id, nextRunAt: nextRunAt.toISOString() };
}
