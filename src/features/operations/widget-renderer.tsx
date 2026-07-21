import { AlertTriangle, ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { DashboardWidget } from "./types";

export function WidgetRenderer({widget}:{widget:DashboardWidget}) {
  if(widget.kind==="metric") return <div className="h-full rounded-2xl border border-border bg-card p-5"><p className="text-xs text-muted-foreground">{widget.title}</p><p className="mt-3 text-3xl font-semibold">{widget.dataSource.includes("cost")?"₺169,800":"428.6 MWh"}</p><p className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600"><ArrowDownRight className="size-3"/>8.4% improvement</p></div>;
  if(widget.kind==="alert") return <div className="h-full rounded-2xl border border-border bg-card p-5"><AlertTriangle className="size-5 text-amber-500"/><p className="mt-3 text-3xl font-semibold">14</p><p className="text-xs text-muted-foreground">{widget.title}</p></div>;
  if(widget.kind==="trend") return <div className="flex h-full items-end gap-2 rounded-2xl border border-border bg-card p-5">{[42,50,46,58,64,72,69,81,77,86,82,91].map((v,i)=><div key={i} className="flex-1 rounded-t bg-primary/80" style={{height:`${v}%`}}/>)}</div>;
  if(widget.kind==="progress") return <div className="h-full rounded-2xl border border-border bg-card p-5"><p className="text-sm font-semibold">{widget.title}</p><div className="mt-6 h-3 overflow-hidden rounded-full bg-muted"><div className="h-full w-[68%] rounded-full bg-primary"/></div><p className="mt-3 text-xs text-muted-foreground">68% achieved</p></div>;
  if(widget.kind==="heatmap") return <div className="grid h-full grid-cols-7 gap-1 rounded-2xl border border-border bg-card p-5">{Array.from({length:35},(_,i)=><div key={i} className="rounded" style={{background:`hsl(var(--primary) / ${0.12+(i%7)*0.1})`}}/>)}</div>;
  return <div className="h-full rounded-2xl border border-border bg-card p-5"><p className="text-sm font-semibold">{widget.title}</p><div className="mt-4 space-y-2">{["Primary Chiller","AHU-01","Pump-04"].map(x=><div key={x} className="flex justify-between rounded-xl bg-muted p-3 text-xs"><span>{x}</span><span>Open</span></div>)}</div></div>;
}
