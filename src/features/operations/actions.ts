"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getDefaultWorkspace } from "@/lib/workspace";
import { requirePermission } from "@/features/auth/session";
import { inventoryItemSchema } from "./schemas";
import { saveDashboardLayout } from "./repository";

export async function createInventoryItemAction(formData: FormData) {
  await requirePermission("operations.write");

  const parsed = inventoryItemSchema.safeParse({
    sku: formData.get("sku"),
    name: formData.get("name"),
    category: formData.get("category"),
    quantity: formData.get("quantity"),
    reorderPoint: formData.get("reorderPoint"),
    unitCost: formData.get("unitCost"),
    location: formData.get("location")
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors
    };
  }

  const workspace = await getDefaultWorkspace();

  await prisma.inventoryItem.create({
    data: {
      workspaceId: workspace.id,
      ...parsed.data
    }
  });

  revalidatePath("/dashboard/operations");
  return { success: true };
}

export async function saveDashboardLayoutAction(input: {
  name: string;
  widgets: unknown;
}) {
  await requirePermission("operations.write");

  await saveDashboardLayout({
    name: input.name,
    widgets: input.widgets,
    isDefault: true
  });

  revalidatePath("/dashboard/operations");
  return { success: true };
}
