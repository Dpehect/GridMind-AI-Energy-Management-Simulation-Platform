import { AlertTriangle, BrainCircuit, ChartNoAxesCombined, Gauge, Lightbulb, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { intelligenceReadings } from "@/data/intelligence";
import { classifyConsumption, detectAnomalies, forecastDemand, generateRecommendations } from "@/lib/intelligence";

const format = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
export function IntelligenceOverview() {
  const anomalies = detectAnomalies(intelligenceReadings);
  const profile = classifyConsumption(intelligenceReadings);
  const forecast = forecastDemand(intelligenceReadings, 8);
  const recommendations = generateRecommendations(profile, anomalies);
  return <div className="space-y-5">
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Metric icon={BrainCircuit} label="Profile" value={profile.type.replace("-", " ")} detail={`${Math.round(profile.confidence * 100)}% confidence`} />
      <Metric icon={AlertTriangle} label="Detected anomalies" value={String(anomalies.length)} detail={`${anomalies.filter((item) => item.severity === "high").length} high severity`} />
      <Metric icon={ChartNoAxesCombined} label="Next-hour forecast" value={`${format.format(forecast[0]?.predicted ?? 0)} kWh`} detail="90% prediction interval" />
      <Metric icon={Gauge} label="Top opportunity" value={`${recommendations[0]?.impactScore ?? 0}/100`} detail="Impact score" />
    </section>
    <section className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
      <Card className="p-5"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold">Explainable anomaly analysis</p><p className="mt-1 text-xs text-muted-foreground">Deterministic local models. No external API calls.</p></div><Badge>Live model</Badge></div><div className="mt-5 space-y-3">{anomalies.slice(0,5).map((item)=><div key={item.id} className="rounded-2xl border p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-medium">{item.zone}</p><p className="mt-1 text-sm text-muted-foreground">{item.explanation}</p></div><Badge variant={item.severity === "high" ? "destructive" : "secondary"}>{item.severity}</Badge></div><div className="mt-3 grid grid-cols-3 gap-3 text-xs"><span><b>{format.format(item.observed)}</b><br/>Observed kWh</span><span><b>{format.format(item.expected)}</b><br/>Expected kWh</span><span><b>{format.format(item.zScore)}</b><br/>Z-score</span></div></div>)}</div></Card>
      <Card className="p-5"><div className="flex items-center gap-2"><Sparkles className="size-4 text-primary"/><p className="text-sm font-semibold">Consumption profile</p></div><p className="mt-5 text-3xl font-semibold capitalize tracking-tight">{profile.type.replace("-", " ")}</p><div className="mt-4"><Progress value={profile.confidence * 100}/><p className="mt-2 text-xs text-muted-foreground">Confidence {Math.round(profile.confidence*100)}%</p></div><div className="mt-5 space-y-2">{profile.evidence.map((item)=><p key={item} className="rounded-xl bg-muted px-3 py-2 text-sm">{item}</p>)}</div></Card>
    </section>
    <Card className="p-5"><div className="flex items-center gap-2"><Lightbulb className="size-4 text-primary"/><div><p className="text-sm font-semibold">Prioritized recommendations</p><p className="text-xs text-muted-foreground">Ranked by impact, feasibility and model confidence.</p></div></div><div className="mt-5 grid gap-4 lg:grid-cols-3">{recommendations.map((item)=><article key={item.id} className="rounded-2xl border p-4"><div className="flex items-center justify-between"><Badge variant="secondary">Impact {item.impactScore}</Badge><span className="text-xs text-muted-foreground">{Math.round(item.confidence*100)}% confidence</span></div><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><span><b>{item.estimatedAnnualSavingsKwh.toLocaleString()} kWh</b><br/>Annual savings</span><span><b>${item.estimatedAnnualSavingsCost.toLocaleString()}</b><br/>Cost savings</span></div></article>)}</div></Card>
  </div>;
}
function Metric({icon:Icon,label,value,detail}:{icon:typeof BrainCircuit;label:string;value:string;detail:string}){return <Card className="p-5"><Icon className="size-4 text-primary"/><p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold capitalize">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></Card>}
