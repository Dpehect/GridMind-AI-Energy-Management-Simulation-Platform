import { z } from "zod";

export const actionItemSchema = z.object({
  recommendationId: z.string().min(1),
  title: z.string().trim().min(4).max(140),
  owner: z.string().trim().min(2).max(80),
  dueDate: z.string().date(),
  expectedSavingsKwh: z.coerce.number().min(0).max(100_000_000)
});

export type ActionItemInput = z.infer<typeof actionItemSchema>;
