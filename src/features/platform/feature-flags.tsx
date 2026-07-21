"use client";
import { useState } from "react";
import { Flag } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";

const initial={digitalTwin:true,reportStudio:true,maintenance:true,scenarioEngine:true,localIntelligence:true,portfolioMode:false};

export function FeatureFlags() {
  const [flags,setFlags]=useState(initial);
  return (
    <SectionCard title="Feature flags" description="Enable or disable large platform capabilities locally.">
      <div className="grid gap-3 md:grid-cols-2">
        {Object.entries(flags).map(([key,value])=><label key={key} className="flex items-center justify-between rounded-2xl border border-border p-4"><span className="flex items-center gap-3 text-sm font-medium"><Flag className="size-4 text-primary"/>{key.replace(/([A-Z])/g," $1")}</span><input type="checkbox" checked={value} onChange={()=>setFlags((current)=>({...current,[key]:!value}))} className="size-4 accent-[hsl(var(--primary))]"/></label>)}
      </div>
    </SectionCard>
  );
}
