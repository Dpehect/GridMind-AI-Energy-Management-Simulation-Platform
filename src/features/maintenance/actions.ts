"use server";

import { revalidatePath } from "next/cache";
import { createWorkOrder } from "./repository";
import { workOrderSchema } from "./schemas";

export type WorkOrderActionState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export async function createWorkOrderAction(
  _previousState: WorkOrderActionState,
  formData: FormData
): Promise<WorkOrderActionState> {
  const result = workOrderSchema.safeParse({
    title: formData.get("title"),
    deviceId: formData.get("deviceId"),
    technician: formData.get("technician"),
    scheduledAt: formData.get("scheduledAt"),
    priority: formData.get("priority"),
    estimatedCost: formData.get("estimatedCost"),
    description: formData.get("description")
  });

  if (!result.success) {
    return {
      success: false,
      message: "Review the highlighted fields.",
      fieldErrors: result.error.flatten().fieldErrors
    };
  }

  await createWorkOrder(result.data);
  revalidatePath("/dashboard/maintenance");
  return { success: true, message: "Work order created successfully." };
}
