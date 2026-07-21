import type { WorkOrderV2 } from "./types";
import { SectionCard } from "@/components/ui/section-card";

export function GanttTimeline({items}:{items:WorkOrderV2[]}) {
 const min=Math.min(...items.map(i=>new Date(i.startsAt).getTime()));
 const max=Math.max(...items.map(i=>new Date(i.endsAt).getTime()));
 const span=Math.max(1,max-min);
 return <SectionCard title="Gantt timeline" description="Visualize maintenance work duration and overlap.">
  <div className="space-y-4">{items.map(i=>{const left=(new Date(i.startsAt).getTime()-min)/span*100;const width=(new Date(i.endsAt).getTime()-new Date(i.startsAt).getTime())/span*100;return <div key={i.id}><div className="mb-2 flex justify-between text-xs"><span>{i.title}</span><span className="text-muted-foreground">{i.owner}</span></div><div className="relative h-8 rounded-full bg-muted"><div className="absolute top-1 h-6 rounded-full bg-primary" style={{left:`${left}%`,width:`${Math.max(4,width)}%`}}/></div></div>})}</div>
 </SectionCard>;
}
