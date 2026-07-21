import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  role: z.enum(["admin","energy_manager","facility_manager","analyst","viewer"]),
  active: z.coerce.boolean()
});

export const workspaceSettingsSchema = z.object({
  workspaceName: z.string().trim().min(3).max(100),
  timezone: z.string().min(2),
  currency: z.enum(["TRY","EUR","USD"]),
  weekStartsOn: z.enum(["monday","sunday"]),
  reducedMotionDefault: z.coerce.boolean()
});
