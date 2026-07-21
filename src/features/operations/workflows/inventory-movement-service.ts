import { prisma } from "@/lib/prisma";
import { withTransaction } from "@/lib/data-integrity/transaction";
import { getTenantContext } from "@/features/tenancy/context";
import type { InventoryMovementInput } from "./types";

function movementDelta(input: InventoryMovementInput) {
  if (["receipt", "return"].includes(input.type)) return input.quantity;
  if (input.type === "issue") return -input.quantity;
  return input.quantity;
}

export async function recordInventoryMovement(
  input: InventoryMovementInput
) {
  const context = await getTenantContext();

  return withTransaction("inventory.movement", async (tx) => {
    const item = await tx.inventoryItem.findFirst({
      where: {
        id: input.inventoryItemId,
        workspaceId: context.workspaceId
      }
    });

    if (!item) throw new Error("Inventory item not found");

    if (input.workOrderId) {
      const workOrder = await tx.workOrder.findFirst({
        where: {
          id: input.workOrderId,
          building: {
            workspaceId: context.workspaceId
          }
        }
      });

      if (!workOrder) throw new Error("Work order not found");
    }

    const delta = movementDelta(input);
    const nextQuantity = item.quantity + delta;

    if (nextQuantity < 0) {
      throw new Error("Insufficient stock");
    }

    const movement = await tx.inventoryMovement.create({
      data: {
        workspaceId: context.workspaceId,
        inventoryItemId: item.id,
        workOrderId: input.workOrderId,
        type: input.type,
        quantity: input.quantity,
        unitCost: input.unitCost,
        reference: input.reference,
        actor: context.userId
      }
    });

    await tx.inventoryItem.update({
      where: { id: item.id },
      data: {
        quantity: nextQuantity,
        unitCost:
          input.type === "receipt"
            ? input.unitCost
            : item.unitCost
      }
    });

    await tx.activityLog.create({
      data: {
        workspaceId: context.workspaceId,
        actor: context.userId,
        action: "inventory.movement_recorded",
        entityType: "InventoryMovement",
        entityId: movement.id,
        metadata: {
          inventoryItemId: item.id,
          type: input.type,
          quantity: input.quantity,
          workOrderId: input.workOrderId
        }
      }
    });

    return movement;
  });
}
