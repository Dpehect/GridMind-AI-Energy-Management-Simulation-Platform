import { z } from "zod";

export const buildingFormSchema = z.object({
  name: z.string().min(3, "Building name must contain at least 3 characters."),
  code: z.string().min(2).max(12).regex(/^[A-Z0-9-]+$/, "Use uppercase letters, numbers and hyphens."),
  type: z.string().min(2),
  address: z.string().min(5),
  floorAreaM2: z.coerce.number().positive().max(1_000_000),
  occupancy: z.coerce.number().int().nonnegative().max(100_000)
});
export type BuildingFormValues = z.infer<typeof buildingFormSchema>;

export const assetFormSchema = z.object({
  name: z.string().min(3), assetTag: z.string().min(3).max(24), category: z.string().min(2), building: z.string().min(2), zone: z.string().min(2), ratedPowerKw: z.coerce.number().nonnegative().max(100_000)
});
export type AssetFormValues = z.infer<typeof assetFormSchema>;
