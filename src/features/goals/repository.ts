import { prisma } from "@/lib/prisma";
import { getDefaultWorkspace } from "@/lib/workspace";
import { writeAuditEvent } from "@/lib/audit";

export async function listGoals() {
  const workspace = await getDefaultWorkspace();
  return prisma.energyGoal.findMany({
    where: { workspaceId: workspace.id },
    orderBy: [{ status: "asc" }, { endsAt: "asc" }]
  });
}

export async function listRecommendations() {
  const workspace = await getDefaultWorkspace();
  return prisma.recommendation.findMany({
    where: { workspaceId: workspace.id },
    include: { actionItems: true },
    orderBy: [{ impactScore: "desc" }, { confidence: "desc" }]
  });
}

export async function createActionItem(input: {
  recommendationId: string;
  title: string;
  owner: string;
  dueDate: string;
  expectedSavingsKwh: number;
}) {
  const created = await prisma.actionItem.create({
    data: {
      recommendationId: input.recommendationId,
      title: input.title,
      owner: input.owner,
      dueDate: new Date(input.dueDate),
      expectedSavingsKwh: input.expectedSavingsKwh
    }
  });

  await writeAuditEvent({
    action: "action_item.created",
    entityType: "ActionItem",
    entityId: created.id,
    metadata: { recommendationId: input.recommendationId }
  });

  return created;
}
