import { SearchCheck } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";
export function RootCausePanel({items}:{items:Array<any>}){
 return <SectionCard title="Root-cause analysis" description="Ranked hypotheses with evidence, confidence and recommended action.">
  <div className="space-y-4">{items.map((i)=><article key={i.id} className="rounded-2xl border border-border p-5"><div className="flex items-start justify-between gap-3"><div className="flex gap-3"><SearchCheck className="mt-0.5 size-5 text-primary"/><div><p className="font-semibold">{i.title}</p><p className="mt-1 text-xs text-muted-foreground">{Math.round(i.confidence*100)}% confidence · impact {i.impactScore}</p></div></div></div><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{i.evidence.map((e:string)=><li key={e}>• {e}</li>)}</ul><p className="mt-4 rounded-xl bg-primary/5 p-3 text-sm">{i.recommendedAction}</p></article>)}</div>
 </SectionCard>
}
