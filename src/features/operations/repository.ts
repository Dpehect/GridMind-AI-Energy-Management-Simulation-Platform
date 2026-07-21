import { prisma } from "@/lib/prisma";
import { getDefaultWorkspace } from "@/lib/workspace";
import { writeAuditEvent } from "@/lib/audit";

export async function listInventoryItems() {
  const workspace = await getDefaultWorkspace();
  return prisma.inventoryItem.findMany({
    where: { workspaceId: workspace.id },
    orderBy: [{ category: "asc" }, { name: "asc" }]
  });
}

export async function listScheduledReports() {
  const workspace = await getDefaultWorkspace();
  return prisma.scheduledReport.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { nextRunAt: "asc" }
  });
}

export async function getDefaultDashboardLayout() {
  const workspace = await getDefaultWorkspace();
  return prisma.dashboardLayout.findFirst({
    where: { workspaceId: workspace.id, isDefault: true }
  });
}

export async function saveDashboardLayout(input: {
  name: string;
  widgets: unknown;
  isDefault?: boolean;
}) {
  const workspace = await getDefaultWorkspace();

  if (input.isDefault) {
    await prisma.dashboardLayout.updateMany({
      where: { workspaceId: workspace.id, isDefault: true },
      data: { isDefault: false }
    });
  }

  const created = await prisma.dashboardLayout.create({
    data: {
      workspaceId: workspace.id,
      name: input.name,
      widgets: input.widgets as never,
      isDefault: input.isDefault ?? false
    }
  });

  await writeAuditEvent({
    action: "dashboard_layout.saved",
    entityType: "DashboardLayout",
    entityId: created.id
  });

  return created;
}
