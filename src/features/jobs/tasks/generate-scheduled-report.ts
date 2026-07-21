import { prisma } from "@/lib/prisma";

export async function generateScheduledReport(payload: {
  scheduledReportId: string;
}) {
  const scheduled = await prisma.scheduledReport.findUnique({
    where: { id: payload.scheduledReportId }
  });

  if (!scheduled || !scheduled.enabled) {
    throw new Error("Scheduled report is unavailable");
  }

  const report = await prisma.report.create({
    data: {
      workspaceId: scheduled.workspaceId,
      title: scheduled.name,
      type: scheduled.format,
      periodStart: new Date(Date.now() - 7 * 86400000),
      periodEnd: new Date(),
      status: "generated",
      building: "All buildings",
      content: {
        generatedBy: "background-job",
        scheduledReportId: scheduled.id
      }
    }
  });

  const nextRunAt = new Date(scheduled.nextRunAt);

  if (scheduled.cadence === "daily") nextRunAt.setDate(nextRunAt.getDate() + 1);
  else if (scheduled.cadence === "weekly") nextRunAt.setDate(nextRunAt.getDate() + 7);
  else nextRunAt.setMonth(nextRunAt.getMonth() + 1);

  await prisma.scheduledReport.update({
    where: { id: scheduled.id },
    data: { nextRunAt }
  });

  return { reportId: report.id, nextRunAt: nextRunAt.toISOString() };
}
