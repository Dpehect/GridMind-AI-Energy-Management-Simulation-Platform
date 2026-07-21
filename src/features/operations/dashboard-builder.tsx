"use client";
import { useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useDashboardBuilder } from "./dashboard-store";
import type { WidgetKind } from "./types";
import { WidgetLibrary } from "./widget-library";
import { WidgetRenderer } from "./widget-renderer";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";

export function DashboardBuilder() {
  const {widgets,selectedId,setSelectedId,addWidget,removeWidget,resizeWidget}=useDashboardBuilder();
  const selected=useMemo(()=>widgets.find(w=>w.id===selectedId)??null,[widgets,selectedId]);
  const onAdd=(kind:WidgetKind)=>addWidget({id:`w-${Date.now()}`,title:`New ${kind}`,kind,x:0,y:widgets.length,w:4,h:3,dataSource:`custom.${kind}`});

  return <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_280px]">
    <SectionCard title="Widget library" description="Add reusable operational components."><WidgetLibrary onAdd={onAdd}/></SectionCard>
    <SectionCard title="Dashboard canvas" description="Select any widget to configure its layout.">
      <div className="grid auto-rows-[110px] grid-cols-12 gap-3">
        {widgets.map(w=><button key={w.id} onClick={()=>setSelectedId(w.id)} className={`text-left ${selectedId===w.id?"ring-2 ring-primary ring-offset-2":""}`} style={{gridColumn:`span ${Math.min(12,w.w)}`,gridRow:`span ${Math.max(1,w.h)}`}}><WidgetRenderer widget={w}/></button>)}
      </div>
    </SectionCard>
    <SectionCard title="Inspector" description="Configure selected widget.">
      {selected?<div className="space-y-4"><div><p className="text-sm font-semibold">{selected.title}</p><p className="text-xs text-muted-foreground">{selected.kind}</p></div><div className="grid grid-cols-2 gap-2"><Button variant="outline" onClick={()=>resizeWidget(selected.id,Math.max(2,selected.w-1),selected.h)}>Narrower</Button><Button variant="outline" onClick={()=>resizeWidget(selected.id,Math.min(12,selected.w+1),selected.h)}>Wider</Button><Button variant="outline" onClick={()=>resizeWidget(selected.id,selected.w,Math.max(1,selected.h-1))}>Shorter</Button><Button variant="outline" onClick={()=>resizeWidget(selected.id,selected.w,Math.min(8,selected.h+1))}>Taller</Button></div><Button variant="destructive" className="w-full" onClick={()=>removeWidget(selected.id)}><Trash2 className="mr-2 size-4"/>Remove widget</Button></div>:<p className="text-sm text-muted-foreground">Select a widget from the canvas.</p>}
    </SectionCard>
  </div>;
}
