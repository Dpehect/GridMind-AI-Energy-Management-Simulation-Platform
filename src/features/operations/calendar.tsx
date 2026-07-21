import type { WorkOrderV2 } from "./types";
import { SectionCard } from "@/components/ui/section-card";

export function OperationsCalendar({items}:{items:WorkOrderV2[]}) {
  const days=Array.from({length:31},(_,i)=>i+1);
  return <SectionCard title="Maintenance calendar" description="Monthly operational schedule for work orders.">
    <div className="grid grid-cols-7 gap-2">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=><div key={d} className="p-2 text-center text-xs font-semibold text-muted-foreground">{d}</div>)}{days.map(day=><div key={day} className="min-h-24 rounded-xl border border-border p-2"><p className="text-xs text-muted-foreground">{day}</p>{items.filter(i=>new Date(i.startsAt).getDate()===day).map(i=><div key={i.id} className="mt-2 rounded-lg bg-primary/10 p-2 text-[10px] text-primary">{i.title}</div>)}</div>)}</div>
  </SectionCard>;
}
