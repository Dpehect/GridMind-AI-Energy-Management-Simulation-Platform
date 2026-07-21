import { prisma } from "@/lib/prisma";
import { enqueueJob } from "./queue";

export async function scheduleDueWork() {
  const now = new Date();

  const [reports, plans] = await Promise.all([
    prisma.scheduledReport.findMany({
      where: {
        enabled: true,
        nextRunAt: { lte: now }
      }
    }),
    prisma.recurringMaintenancePlan.findMany({
      where: {
        enabled: true,
        nextRunAt: { lte: now }
      }
    })
  ]);

  for (const report of reports) {
    await enqueueJob({
      workspaceId: report.workspaceId,
      type: "report.generate_scheduled",
      payload: { scheduledReportId: report.id },
      idempotencyKey: `scheduled-report:${report.id}:${report.nextRunAt.toISOString()}`
    });
  }

  for (const plan of plans) {
    await enqueueJob({
      workspaceId: plan.workspaceId,
      type: "maintenance.generate_recurring",
      payload: { recurringMaintenancePlanId: plan.id },
      idempotencyKey: `maintenance-plan:${plan.id}:${plan.nextRunAt.toISOString()}`
    });
  }

  return {
    scheduledReports: reports.length,
    maintenancePlans: plans.length
  };
}
