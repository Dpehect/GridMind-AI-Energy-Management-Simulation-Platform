import type { WorkOrderV2 } from "./types";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

const columns=["backlog","scheduled","in_progress","blocked","completed"] as const;
export function WorkOrderBoardV2({items}:{items:WorkOrderV2[]}) {
 return <SectionCard title="Work Orders v2" description="Checklist-driven maintenance execution with cost and schedule visibility.">
  <div className="grid gap-3 xl:grid-cols-5">{columns.map(c=><section key={c} className="rounded-2xl bg-muted/40 p-3"><h3 className="mb-3 text-sm font-semibold capitalize">{c.replace("_"," ")}</h3><div className="space-y-3">{items.filter(i=>i.status===c).map(i=><article key={i.id} className="rounded-2xl border border-border bg-card p-4"><div className="flex justify-between gap-2"><p className="font-medium">{i.title}</p><StatusBadge status={i.priority==="critical"?"critical":i.priority==="high"?"warning":"info"}>{i.priority}</StatusBadge></div><p className="mt-2 text-xs text-muted-foreground">{i.assetId} · {i.owner}</p><div className="mt-4 space-y-2">{i.checklist.map(ch=><label key={ch.id} className="flex items-center gap-2 text-xs"><input type="checkbox" checked={ch.done} readOnly/>{ch.label}</label>)}</div></article>)}</div></section>)}</div>
 </SectionCard>
}
