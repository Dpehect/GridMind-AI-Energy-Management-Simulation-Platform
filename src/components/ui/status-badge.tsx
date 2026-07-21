import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
const tones = {
  healthy: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  attention: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
  critical: "bg-rose-500/12 text-rose-700 dark:text-rose-300",
  neutral: "bg-muted text-muted-foreground",
};
export function StatusBadge({ tone = "neutral", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones[tone])}>{children}</span>;
}
