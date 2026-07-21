import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[1.5rem] border border-border/70 bg-card/90 shadow-[0_20px_70px_-45px_rgba(15,23,42,.45)] backdrop-blur", className)} {...props} />;
}
