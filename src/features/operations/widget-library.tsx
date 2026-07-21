"use client";
import { BarChart3, BellRing, Gauge, Grid3X3, LineChart, ListTree } from "lucide-react";
import type { WidgetKind } from "./types";

const widgets: Array<{kind:WidgetKind;label:string;icon:any;description:string}> = [
  {kind:"metric",label:"Metric",icon:Gauge,description:"Headline KPI with trend"},
  {kind:"trend",label:"Trend",icon:LineChart,description:"Time-series performance"},
  {kind:"table",label:"Table",icon:ListTree,description:"Operational records"},
  {kind:"alert",label:"Alert",icon:BellRing,description:"Active alert summary"},
  {kind:"progress",label:"Progress",icon:BarChart3,description:"Goal progress"},
  {kind:"heatmap",label:"Heatmap",icon:Grid3X3,description:"Intensity grid"}
];

export function WidgetLibrary({onAdd}:{onAdd:(kind:WidgetKind)=>void}) {
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
    {widgets.map(({kind,label,icon:Icon,description})=><button key={kind} onClick={()=>onAdd(kind)} className="rounded-2xl border border-border p-4 text-left hover:bg-accent"><Icon className="size-5 text-primary"/><p className="mt-3 text-sm font-semibold">{label}</p><p className="mt-1 text-xs text-muted-foreground">{description}</p></button>)}
  </div>;
}
