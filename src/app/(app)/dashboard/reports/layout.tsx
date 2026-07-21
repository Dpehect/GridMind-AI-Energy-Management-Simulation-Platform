import type { ReactNode } from "react";
import { requirePermission } from "@/features/auth/session";

export default async function ReportsLayout({
  children
}: {
  children: ReactNode;
}) {
  await requirePermission("reports.read");
  return children;
}
