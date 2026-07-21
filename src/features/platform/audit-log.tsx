import { History } from "lucide-react";
import { auditEvents } from "./data";
import { SectionCard } from "@/components/ui/section-card";

export function AuditLog() {
  return (
    <SectionCard title="Audit trail" description="Immutable-style local activity history for critical actions.">
      <div className="space-y-3">
        {auditEvents.map((event)=><article key={event.id} className="flex gap-3 rounded-2xl border border-border p-4"><div className="rounded-xl bg-primary/10 p-2 text-primary"><History className="size-4"/></div><div className="min-w-0"><p className="text-sm font-medium">{event.action}</p><p className="mt-1 text-xs text-muted-foreground">{event.actor} · {event.entityType}{event.entityId?` · ${event.entityId}`:""}</p><p className="mt-2 text-[11px] text-muted-foreground">{new Date(event.createdAt).toLocaleString("tr-TR")}</p></div></article>)}
      </div>
    </SectionCard>
  );
}
