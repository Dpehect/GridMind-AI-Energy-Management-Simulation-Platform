import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
export function FilterChip({ children, active, onRemove }: { children: ReactNode; active?: boolean; onRemove?: () => void }) {
 return <span className={cn("inline-flex h-8 items-center gap-2 rounded-full border px-3 text-xs font-medium", active && "border-primary/40 bg-primary/10 text-primary")}>{children}{onRemove ? <button aria-label="Remove filter" onClick={onRemove}><X className="size-3.5" /></button> : null}</span>;
}
