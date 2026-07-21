"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/features/auth/session";
import { saveReport } from "./repository";
import { reportConfigSchema } from "./schemas";

export async function saveReportAction(formData: FormData) {
  await requirePermission("reports.generate");

  const parsed = reportConfigSchema.safeParse({
    title: formData.get("title"),
    templateId: formData.get("templateId"),
    building: formData.get("building"),
    periodStart: formData.get("periodStart"),
    periodEnd: formData.get("periodEnd"),
    notes: formData.get("notes")
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors
    };
  }

  await saveReport({
    title: parsed.data.title,
    type: parsed.data.templateId,
    periodStart: parsed.data.periodStart,
    periodEnd: parsed.data.periodEnd,
    building: parsed.data.building,
    content: {
      notes: parsed.data.notes ?? "",
      templateId: parsed.data.templateId
    }
  });

  revalidatePath("/dashboard/reports");
  return { success: true };
}
