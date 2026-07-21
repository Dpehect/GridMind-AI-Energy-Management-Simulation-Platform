import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";
import { withTransaction } from "@/lib/data-integrity/transaction";

export async function createPurchaseRequest(input: {
  justification: string;
  items: Array<{
    inventoryItemId?: string;
    description: string;
    quantity: number;
    estimatedUnitCost: number;
  }>;
}) {
  const context = await getTenantContext();

  const totalCost = input.items.reduce(
    (sum, item) =>
      sum + item.quantity * item.estimatedUnitCost,
    0
  );

  return withTransaction("purchase_request.create", async (tx) => {
    const created = await tx.purchaseRequest.create({
      data: {
        workspaceId: context.workspaceId,
        requestedBy: context.userId,
        justification: input.justification,
        totalCost,
        items: {
          create: input.items
        }
      },
      include: {
        items: true
      }
    });

    await tx.activityLog.create({
      data: {
        workspaceId: context.workspaceId,
        actor: context.userId,
        action: "purchase_request.created",
        entityType: "PurchaseRequest",
        entityId: created.id,
        metadata: { totalCost }
      }
    });

    return created;
  });
}

export async function approvePurchaseRequest(input: {
  purchaseRequestId: string;
  approved: boolean;
}) {
  const context = await getTenantContext();

  if (context.workspaceRole !== "workspace_admin") {
    throw new Error("Only workspace administrators may approve requests");
  }

  return prisma.purchaseRequest.update({
    where: {
      id: input.purchaseRequestId,
      workspaceId: context.workspaceId
    },
    data: {
      status: input.approved ? "approved" : "rejected",
      approvedBy: context.userId,
      approvedAt: new Date()
    }
  });
}
