import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export function AlertBanner({ icon: Icon, title, description, tone="info" }: { icon: LucideIcon; title: string; description: string; tone?: "info"|"warning"|"critical" }) {
 const styles={info:"border-sky-500/25 bg-sky-500/8",warning:"border-amber-500/25 bg-amber-500/8",critical:"border-rose-500/25 bg-rose-500/8"};
 return <div className={cn("flex gap-3 rounded-2xl border p-4",styles[tone])}><Icon className="mt-0.5 size-5 shrink-0"/><div><p className="font-medium">{title}</p><p className="mt-1 text-sm text-muted-foreground">{description}</p></div></div>;
}
