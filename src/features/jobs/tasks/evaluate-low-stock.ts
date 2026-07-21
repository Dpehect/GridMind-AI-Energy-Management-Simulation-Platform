import { prisma } from "@/lib/prisma";

export async function evaluateLowStock(payload: {
  workspaceId: string;
}) {
  const items = await prisma.inventoryItem.findMany({
    where: { workspaceId: payload.workspaceId }
  });

  const lowStock = items.filter(
    (item) => item.quantity <= item.reorderPoint
  );

  return {
    evaluated: items.length,
    lowStock: lowStock.map((item) => ({
      id: item.id,
      sku: item.sku,
      quantity: item.quantity,
      reorderPoint: item.reorderPoint
    }))
  };
}
