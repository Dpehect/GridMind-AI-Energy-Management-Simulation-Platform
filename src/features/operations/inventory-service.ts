import { inventoryItems } from "./data";
export function getInventory(){return structuredClone(inventoryItems)}
export function getLowStock(){return inventoryItems.filter(i=>i.quantity<=i.reorderPoint)}
export function inventoryValue(){return inventoryItems.reduce((s,i)=>s+i.quantity*i.unitCost,0)}
