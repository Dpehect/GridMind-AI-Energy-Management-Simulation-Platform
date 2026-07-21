import type { ReactNode } from "react";
import { requirePermission } from "@/features/auth/session";

export default async function AdminLayout({
  children
}: {
  children: ReactNode;
}) {
  await requirePermission("users.manage");
  return children;
}
