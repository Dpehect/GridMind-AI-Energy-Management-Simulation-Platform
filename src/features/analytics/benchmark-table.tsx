import { Award, Building2 } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";

export function BenchmarkTable({items}:{items:Array<any>}){
 return <SectionCard title="Facility benchmark" description="Compare normalized energy, cost and carbon performance across facility types.">
  <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="text-xs uppercase text-muted-foreground"><tr className="border-b"><th className="pb-3">Facility</th><th className="pb-3">Type</th><th className="pb-3">Energy intensity</th><th className="pb-3">Cost intensity</th><th className="pb-3">Carbon intensity</th><th className="pb-3">Score</th><th className="pb-3">Percentile</th></tr></thead><tbody>{items.map((i)=><tr key={i.id} className="border-b border-border/60"><td className="py-4"><span className="inline-flex items-center gap-2 font-medium"><Building2 className="size-4 text-primary"/>{i.building}</span></td><td className="py-4">{i.type}</td><td className="py-4">{i.intensity.toFixed(1)} kWh/m²</td><td className="py-4">₺{i.costIntensity.toFixed(1)}/m²</td><td className="py-4">{i.carbonIntensity.toFixed(1)} kg/m²</td><td className="py-4 font-semibold">{i.score}/100</td><td className="py-4"><span className="inline-flex items-center gap-2"><Award className="size-4 text-amber-500"/>{i.percentile}th</span></td></tr>)}</tbody></table></div>
 </SectionCard>
}
