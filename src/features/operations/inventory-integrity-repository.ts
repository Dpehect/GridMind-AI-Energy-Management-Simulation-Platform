import { prisma } from "@/lib/prisma";
import { writeAuditEvent } from "@/lib/audit";
import { withTransaction } from "@/lib/data-integrity/transaction";
import { createEntityVersion } from "@/lib/data-integrity/versioning";
import { ConcurrencyError } from "@/lib/data-integrity/errors";

export async function adjustInventoryQuantity(input: {
  inventoryItemId: string;
  delta: number;
  expectedUpdatedAt: string;
  actor: string;
  reason: string;
}) {
  return withTransaction("inventory.adjust", async (tx) => {
    const current = await tx.inventoryItem.findUnique({
      where: { id: input.inventoryItemId }
    });

    if (!current) {
      throw new Error("Inventory item not found");
    }

    if (
      current.updatedAt.getTime() !==
      new Date(input.expectedUpdatedAt).getTime()
    ) {
      throw new ConcurrencyError("InventoryItem", current.id);
    }

    const nextQuantity = current.quantity + input.delta;

    if (nextQuantity < 0) {
      throw new Error("Inventory quantity cannot be negative");
    }

    const updated = await tx.inventoryItem.update({
      where: { id: current.id },
      data: { quantity: nextQuantity }
    });

    await tx.activityLog.create({
      data: {
        workspaceId: current.workspaceId,
        actor: input.actor,
        action: "inventory.quantity_adjusted",
        entityType: "InventoryItem",
        entityId: current.id,
        metadata: {
          previousQuantity: current.quantity,
          delta: input.delta,
          nextQuantity,
          reason: input.reason
        }
      }
    });

    await createEntityVersion({
      context: {
        actor: input.actor,
        workspaceId: current.workspaceId
      },
      entityType: "InventoryItem",
      entityId: current.id,
      snapshot: updated
    });

    return updated;
  });
}
