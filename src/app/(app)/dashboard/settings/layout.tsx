import type { ReactNode } from "react";
import { requirePermission } from "@/features/auth/session";

export default async function SettingsLayout({
  children
}: {
  children: ReactNode;
}) {
  await requirePermission("settings.manage");
  return children;
}
