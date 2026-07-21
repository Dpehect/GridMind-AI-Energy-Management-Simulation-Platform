import { z } from "zod";

export const workOrderSchema = z.object({
  title: z.string().trim().min(4, "Title must contain at least 4 characters").max(120),
  deviceId: z.string().trim().min(1, "Select a device"),
  technician: z.string().trim().min(2, "Technician is required").max(80),
  scheduledAt: z.string().datetime({ offset: true }),
  priority: z.enum(["low", "medium", "high", "critical"]),
  estimatedCost: z.coerce.number().min(0).max(10_000_000),
  description: z.string().trim().min(10, "Add a meaningful maintenance description").max(1000)
});

export const completeWorkOrderSchema = z.object({
  workOrderId: z.string().min(1),
  actualCost: z.coerce.number().min(0).max(10_000_000),
  outcome: z.string().trim().min(10).max(1500)
});

export type WorkOrderInput = z.infer<typeof workOrderSchema>;
export type CompleteWorkOrderInput = z.infer<typeof completeWorkOrderSchema>;
