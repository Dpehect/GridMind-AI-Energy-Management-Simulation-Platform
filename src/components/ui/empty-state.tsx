import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
export function EmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description: string; action?: string }) {
  return <div className="rounded-2xl border border-dashed p-8 text-center"><div className="mx-auto grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-5" /></div><h3 className="mt-4 font-semibold">{title}</h3><p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>{action ? <Button className="mt-5" size="sm">{action}</Button> : null}</div>;
}
