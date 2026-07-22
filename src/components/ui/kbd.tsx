import type { ReactNode } from "react";
export function Kbd({ children }: { children: ReactNode }) { return <kbd className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground shadow-sm">{children}</kbd>; }
