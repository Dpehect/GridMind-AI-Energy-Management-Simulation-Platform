import { cn } from "@/lib/utils";

export function Badge({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs font-medium text-muted-foreground",
        variant === "destructive" && "border-destructive/30 bg-destructive/10 text-destructive",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
