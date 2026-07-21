import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";

export async function getOperationsWorkflowSummary() {
  const context = await getTenantContext();

  const [
    openWorkOrders,
    overdueWorkOrders,
    lowStockItems,
    pendingPurchaseRequests,
    reportsInReview,
    atRiskGoals
  ] = await Promise.all([
    prisma.workOrder.count({
      where: {
        building: { workspaceId: context.workspaceId },
        status: { not: "COMPLETED" }
      }
    }),
    prisma.workOrder.count({
      where: {
        building: { workspaceId: context.workspaceId },
        OR: [
          { status: "OVERDUE" },
          {
            endsAt: { lt: new Date() },
            status: { not: "COMPLETED" }
          }
        ]
      }
    }),
    prisma.inventoryItem.count({
      where: {
        workspaceId: context.workspaceId,
        quantity: {
          lte: prisma.inventoryItem.fields.reorderPoint
        }
      }
    }).catch(() => 0),
    prisma.purchaseRequest.count({
      where: {
        workspaceId: context.workspaceId,
        status: { in: ["draft", "submitted"] }
      }
    }),
    prisma.report.count({
      where: {
        workspaceId: context.workspaceId,
        status: "in_review"
      }
    }),
    prisma.energyGoal.count({
      where: {
        workspaceId: context.workspaceId,
        status: { in: ["AT_RISK", "BEHIND"] }
      }
    })
  ]);

  return {
    openWorkOrders,
    overdueWorkOrders,
    lowStockItems,
    pendingPurchaseRequests,
    reportsInReview,
    atRiskGoals
  };
}
