import type { ReactNode } from "react";
import { DashboardShellV2 } from "@/components/dashboard/dashboard-shell-v2";
import { requireUser } from "@/features/auth/session";

export default async function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  const user = await requireUser();
  return <DashboardShellV2 user={user}>{children}</DashboardShellV2>;
}
