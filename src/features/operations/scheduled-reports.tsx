"use client";
import { useState } from "react";
import { Clock3, FileOutput } from "lucide-react";
import { scheduledReports } from "./data";
import { SectionCard } from "@/components/ui/section-card";

export function ScheduledReports() {
  const [items,setItems]=useState(scheduledReports);
  return <SectionCard title="Scheduled reports" description="Run recurring exports locally according to deterministic schedules.">
    <div className="space-y-3">{items.map(i=><div key={i.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-4"><div className="flex gap-3"><FileOutput className="mt-1 size-5 text-primary"/><div><p className="font-medium">{i.name}</p><p className="mt-1 text-xs text-muted-foreground capitalize">{i.cadence} · {i.format} · next {new Date(i.nextRunAt).toLocaleString("tr-TR")}</p></div></div><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={i.enabled} onChange={()=>setItems(cur=>cur.map(x=>x.id===i.id?{...x,enabled:!x.enabled}:x))}/>Enabled</label></div>)}</div>
  </SectionCard>;
}
