import { Network } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";

export function CorrelationCards({items}:{items:Array<any>}){
 return <SectionCard title="Correlation analysis" description="Reveal relationships between energy demand, weather and occupancy.">
  <div className="grid gap-4 md:grid-cols-2">{items.map((i)=><article key={`${i.left}-${i.right}`} className="rounded-2xl border border-border p-5"><Network className="size-5 text-primary"/><p className="mt-4 font-semibold">{i.left} ↔ {i.right}</p><p className="mt-2 text-3xl font-semibold">{i.coefficient}</p><p className="mt-1 text-sm capitalize text-muted-foreground">{i.strength} {i.direction} relationship</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{width:`${Math.abs(i.coefficient)*100}%`}}/></div></article>)}</div>
 </SectionCard>
}
