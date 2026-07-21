import * as React from "react";
import { cn } from "@/lib/utils";
export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn("min-h-28 w-full resize-y rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10", className)} {...props} />;
}
