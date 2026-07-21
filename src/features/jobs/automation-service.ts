import { prisma } from "@/lib/prisma";
import { enqueueJob } from "./queue";

export async function evaluateAutomationRules(workspaceId: string) {
  const rules = await prisma.automationRule.findMany({
    where: {
      workspaceId,
      enabled: true,
      OR: [
        { nextRunAt: null },
        { nextRunAt: { lte: new Date() } }
      ]
    }
  });

  const queued: string[] = [];

  for (const rule of rules) {
    const job = await enqueueJob({
      workspaceId,
      type: rule.actionType,
      payload: rule.action,
      idempotencyKey: `automation:${rule.id}:${rule.nextRunAt?.toISOString() ?? "now"}`
    });

    queued.push(job.id);

    await prisma.automationRule.update({
      where: { id: rule.id },
      data: {
        lastRunAt: new Date(),
        nextRunAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });
  }

  return queued;
}
