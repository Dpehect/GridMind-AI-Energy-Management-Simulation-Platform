import { prisma } from "../src/lib/prisma";

async function main() {
  const [workOrders, workOrderLogs, inventoryItems, inventoryLogs] =
    await Promise.all([
      prisma.workOrder.count(),
      prisma.activityLog.count({
        where: { entityType: "WorkOrder" }
      }),
      prisma.inventoryItem.count(),
      prisma.activityLog.count({
        where: { entityType: "InventoryItem" }
      })
    ]);

  const result = {
    workOrders,
    workOrderLogs,
    inventoryItems,
    inventoryLogs,
    warnings: [
      ...(workOrders > 0 && workOrderLogs === 0
        ? ["Work orders exist without audit entries"]
        : []),
      ...(inventoryItems > 0 && inventoryLogs === 0
        ? ["Inventory items exist without audit entries"]
        : [])
    ]
  };

  console.log(JSON.stringify(result, null, 2));

  if (result.warnings.length) process.exit(1);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
