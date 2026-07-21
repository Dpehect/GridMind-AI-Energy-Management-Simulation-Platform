import { SectionCard } from "@/components/ui/section-card";
export function ForecastChart({points}:{points:Array<any>}){
 const max=Math.max(...points.map(p=>p.upper));
 return <SectionCard title="Forecast v2" description="Local regression forecast with 90% confidence interval.">
  <div className="flex h-72 items-end gap-1 overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4">{points.map((p,index)=><div key={p.label} className="flex min-w-5 flex-1 flex-col items-center justify-end gap-1"><div className="relative w-full" style={{height:`${p.upper/max*100}%`}}><div className="absolute inset-x-0 bottom-0 rounded-t bg-primary/20" style={{height:"100%"}}/><div className="absolute inset-x-[25%] bottom-0 rounded-t bg-primary" style={{height:`${p.forecast/p.upper*100}%`}}/></div><span className="text-[9px] text-muted-foreground">{index%3===0?p.label:""}</span></div>)}</div>
 </SectionCard>
}
