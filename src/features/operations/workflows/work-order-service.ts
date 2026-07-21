import { prisma } from "@/lib/prisma";
import { withTransaction } from "@/lib/data-integrity/transaction";
import { getTenantContext } from "@/features/tenancy/context";

export async function addWorkOrderComment(input: {
  workOrderId: string;
  body: string;
}) {
  const context = await getTenantContext();

  return withTransaction("work_order.comment", async (tx) => {
    const workOrder = await tx.workOrder.findFirst({
      where: {
        id: input.workOrderId,
        building: {
          workspaceId: context.workspaceId
        }
      }
    });

    if (!workOrder) throw new Error("Work order not found");

    const comment = await tx.workOrderComment.create({
      data: {
        workOrderId: workOrder.id,
        authorId: context.userId,
        authorName: context.userId,
        body: input.body
      }
    });

    await tx.activityLog.create({
      data: {
        workspaceId: context.workspaceId,
        actor: context.userId,
        action: "work_order.comment_added",
        entityType: "WorkOrder",
        entityId: workOrder.id
      }
    });

    return comment;
  });
}

export async function closeWorkOrder(input: {
  workOrderId: string;
  outcome: string;
  actualCost: number;
}) {
  const context = await getTenantContext();

  return withTransaction("work_order.close", async (tx) => {
    const current = await tx.workOrder.findFirst({
      where: {
        id: input.workOrderId,
        building: {
          workspaceId: context.workspaceId
        }
      }
    });

    if (!current) throw new Error("Work order not found");
    if (current.status === "COMPLETED") throw new Error("Work order already completed");

    const checklist = Array.isArray(current.checklist)
      ? current.checklist
      : [];

    const incomplete = checklist.filter(
      (item: any) => item?.done !== true
    );

    if (incomplete.length) {
      throw new Error("All checklist items must be completed before closure");
    }

    const updated = await tx.workOrder.update({
      where: { id: current.id },
      data: {
        status: "COMPLETED",
        actualCost: input.actualCost,
        outcome: input.outcome,
        endsAt: new Date()
      }
    });

    await tx.activityLog.create({
      data: {
        workspaceId: context.workspaceId,
        actor: context.userId,
        action: "work_order.completed",
        entityType: "WorkOrder",
        entityId: current.id,
        metadata: {
          actualCost: input.actualCost,
          outcome: input.outcome
        }
      }
    });

    return updated;
  });
}
