import { prisma } from "@/lib/prisma";
import { getDefaultWorkspace } from "@/lib/workspace";
import { writeAuditEvent } from "@/lib/audit";

export async function listReports() {
  const workspace = await getDefaultWorkspace();
  return prisma.report.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { updatedAt: "desc" }
  });
}

export async function saveReport(input: {
  title: string;
  type: string;
  periodStart: string;
  periodEnd: string;
  building: string;
  content: unknown;
}) {
  const workspace = await getDefaultWorkspace();

  const created = await prisma.report.create({
    data: {
      workspaceId: workspace.id,
      title: input.title,
      type: input.type,
      periodStart: new Date(input.periodStart),
      periodEnd: new Date(input.periodEnd),
      building: input.building,
      content: input.content as never,
      status: "draft"
    }
  });

  await writeAuditEvent({
    action: "report.saved",
    entityType: "Report",
    entityId: created.id,
    metadata: { type: input.type }
  });

  return created;
}
