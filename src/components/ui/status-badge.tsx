import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
const tones = {
  healthy: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  attention: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
  critical: "bg-rose-500/12 text-rose-700 dark:text-rose-300",
  neutral: "bg-muted text-muted-foreground",
};
function toneForStatus(status?: string): keyof typeof tones {
  const value = status?.toLowerCase();
  if (["operational", "active", "healthy"].includes(value ?? "")) return "healthy";
  if (["optimization", "maintenance", "attention"].includes(value ?? "")) return "attention";
  if (["inactive", "critical", "failed"].includes(value ?? "")) return "critical";
  return "neutral";
}
export function StatusBadge({ tone, status, children }: { tone?: keyof typeof tones; status?: string; children?: ReactNode }) {
  const resolvedTone = tone ?? toneForStatus(status);
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones[resolvedTone])}>{children ?? status}</span>;
}
