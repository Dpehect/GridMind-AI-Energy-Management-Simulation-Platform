import { BadgeCheck } from "lucide-react";
import { releaseConfig } from "@/lib/release-config";

export function ReleaseBanner() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-primary/5 px-4 py-2 text-xs">
      <span className="inline-flex items-center gap-2 font-medium"><BadgeCheck className="size-4 text-primary" />GridMind {releaseConfig.version}</span>
      <span className="text-muted-foreground">Local-first · Offline-capable · No API keys</span>
    </div>
  );
}
