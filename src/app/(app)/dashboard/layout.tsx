import type { ReactNode } from "react";
import { DashboardShellV2 } from "@/components/dashboard/dashboard-shell-v2";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShellV2>{children}</DashboardShellV2>;
}
