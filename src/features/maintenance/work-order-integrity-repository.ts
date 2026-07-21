import { prisma } from "@/lib/prisma";
import { withTransaction } from "@/lib/data-integrity/transaction";
import { ConcurrencyError } from "@/lib/data-integrity/errors";

export async function updateWorkOrderStatus(input: {
  id: string;
  status:
    | "BACKLOG"
    | "SCHEDULED"
    | "IN_PROGRESS"
    | "BLOCKED"
    | "COMPLETED"
    | "OVERDUE";
  expectedUpdatedAt: string;
  actor: string;
  outcome?: string;
}) {
  return withTransaction("work_order.status_update", async (tx) => {
    const current = await tx.workOrder.findUnique({
      where: { id: input.id }
    });

    if (!current) {
      throw new Error("Work order not found");
    }

    if (
      current.updatedAt.getTime() !==
      new Date(input.expectedUpdatedAt).getTime()
    ) {
      throw new ConcurrencyError("WorkOrder", current.id);
    }

    const updated = await tx.workOrder.update({
      where: { id: current.id },
      data: {
        status: input.status,
        outcome: input.outcome ?? current.outcome
      }
    });

    await tx.activityLog.create({
      data: {
        workspaceId: current.buildingId,
        actor: input.actor,
        action: "work_order.status_changed",
        entityType: "WorkOrder",
        entityId: current.id,
        metadata: {
          previousStatus: current.status,
          nextStatus: input.status
        }
      }
    });

    return updated;
  });
}
