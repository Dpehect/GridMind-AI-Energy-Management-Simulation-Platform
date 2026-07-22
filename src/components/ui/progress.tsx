import { cn } from "@/lib/utils";
export function Progress({ value = 0, className }: { value?: number; className?: string }) {
  const safe = Math.min(100, Math.max(0, value));
  return <div className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}><div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${safe}%` }} /></div>;
}
