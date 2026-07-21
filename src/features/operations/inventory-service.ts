import { listInventoryItems } from "./repository";

export async function getInventory() {
  return listInventoryItems();
}

export async function getLowStock() {
  const items = await listInventoryItems();
  return items.filter((item) => item.quantity <= item.reorderPoint);
}

export async function inventoryValue() {
  const items = await listInventoryItems();
  return items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
}
