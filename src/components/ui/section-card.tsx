import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
export function SectionCard({ title, description, action, children }: { title: string; description?: string; action?: ReactNode; children: ReactNode }) {
 return <Card><div className="flex items-start justify-between gap-4 border-b p-5"><div><h2 className="font-semibold">{title}</h2>{description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}</div>{action}</div><div className="p-5">{children}</div></Card>;
}
