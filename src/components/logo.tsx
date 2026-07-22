import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-semibold tracking-tight", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"><Activity className="size-4" /></span>
      {!compact && <span>GridMind</span>}
    </div>
  );
}
