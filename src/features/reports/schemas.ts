import { z } from "zod";

export const reportConfigSchema = z.object({
  title: z.string().trim().min(4).max(140),
  templateId: z.string().min(1),
  building: z.string().min(1),
  periodStart: z.string().date(),
  periodEnd: z.string().date(),
  notes: z.string().trim().max(2000).optional()
}).refine((value) => new Date(value.periodEnd) >= new Date(value.periodStart), {
  message: "End date must be after start date",
  path: ["periodEnd"]
});

export type ReportConfigInput = z.infer<typeof reportConfigSchema>;
