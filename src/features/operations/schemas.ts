import { z } from "zod";

export const widgetSchema = z.object({
  title: z.string().trim().min(3).max(80),
  kind: z.enum(["metric","trend","table","alert","progress","heatmap"]),
  dataSource: z.string().trim().min(3).max(120),
  w: z.coerce.number().int().min(2).max(12),
  h: z.coerce.number().int().min(1).max(8)
});

export const inventoryItemSchema = z.object({
  sku: z.string().trim().min(2).max(40),
  name: z.string().trim().min(2).max(120),
  category: z.string().trim().min(2).max(60),
  quantity: z.coerce.number().int().min(0),
  reorderPoint: z.coerce.number().int().min(0),
  unitCost: z.coerce.number().min(0),
  location: z.string().trim().min(2).max(80)
});

export const workOrderV2Schema = z.object({
  title: z.string().trim().min(4).max(140),
  assetId: z.string().trim().min(1),
  priority: z.enum(["low","medium","high","critical"]),
  owner: z.string().trim().min(2).max(80),
  startsAt: z.string().datetime({ offset: true }),
  endsAt: z.string().datetime({ offset: true }),
  estimatedCost: z.coerce.number().min(0).max(10_000_000)
}).refine(v => new Date(v.endsAt) > new Date(v.startsAt), { path:["endsAt"], message:"End must be after start" });
