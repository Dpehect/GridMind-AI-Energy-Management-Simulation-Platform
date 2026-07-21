import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";
import { withTransaction } from "@/lib/data-integrity/transaction";
import type { GoalProgressInput } from "@/features/operations/workflows/types";

export async function recordGoalProgress(
  input: GoalProgressInput
) {
  const context = await getTenantContext();

  return withTransaction("goal.progress", async (tx) => {
    const goal = await tx.energyGoal.findFirst({
      where: {
        id: input.goalId,
        workspaceId: context.workspaceId
      }
    });

    if (!goal) throw new Error("Goal not found");

    const entry = await tx.goalProgressEntry.create({
      data: {
        goalId: goal.id,
        value: input.value,
        note: input.note,
        recordedBy: context.userId
      }
    });

    const distance = Math.abs(goal.baseline - goal.target);
    const achieved = Math.abs(goal.baseline - input.value);
    const progress = distance > 0 ? achieved / distance : 1;

    await tx.energyGoal.update({
      where: { id: goal.id },
      data: {
        current: input.value,
        status:
          progress >= 1
            ? "COMPLETED"
            : progress >= 0.65
              ? "ON_TRACK"
              : progress >= 0.35
                ? "AT_RISK"
                : "BEHIND"
      }
    });

    return entry;
  });
}

export async function createGoalMilestone(input: {
  goalId: string;
  title: string;
  targetValue: number;
  dueDate: string;
}) {
  const context = await getTenantContext();

  const goal = await prisma.energyGoal.findFirst({
    where: {
      id: input.goalId,
      workspaceId: context.workspaceId
    }
  });

  if (!goal) throw new Error("Goal not found");

  return prisma.goalMilestone.create({
    data: {
      goalId: goal.id,
      title: input.title,
      targetValue: input.targetValue,
      dueDate: new Date(input.dueDate)
    }
  });
}
