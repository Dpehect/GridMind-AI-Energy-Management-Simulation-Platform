import type { ReactNode } from "react";
import { requirePermission } from "@/features/auth/session";

export default async function OperationsLayout({
  children
}: {
  children: ReactNode;
}) {
  await requirePermission("operations.read");
  return children;
}
