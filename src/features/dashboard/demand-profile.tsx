"use client";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { demandSeries } from "@/data/command-center";

function linePoints(key: "actual" | "baseline", width = 720, height = 230) {
  const max = 520; const min = 120;
  return demandSeries.map((point, index) => `${(index / (demandSeries.length - 1)) * width},${height - ((point[key] - min) / (max - min)) * height}`).join(" ");
}

export function DemandProfile() {
  const [mode, setMode] = useState<"actual" | "comparison">("comparison");
  const actual = useMemo(() => linePoints("actual"), []); const baseline = useMemo(() => linePoints("baseline"), []);
  return <Card className="overflow-hidden p-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div><p className="font-medium">Demand profile</p><p className="mt-1 text-sm text-muted-foreground">Actual load against the calculated operating baseline</p></div>
      <div className="flex rounded-xl border bg-muted/40 p-1 text-xs"><button onClick={() => setMode("actual")} className={`rounded-lg px-3 py-1.5 ${mode === "actual" ? "bg-card shadow-sm" : "text-muted-foreground"}`}>Actual</button><button onClick={() => setMode("comparison")} className={`rounded-lg px-3 py-1.5 ${mode === "comparison" ? "bg-card shadow-sm" : "text-muted-foreground"}`}>Compare</button></div>
    </div>
    <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground"><span><i className="mr-2 inline-block size-2 rounded-full bg-primary"/>Actual demand</span>{mode === "comparison" ? <span><i className="mr-2 inline-block size-2 rounded-full bg-muted-foreground/50"/>Baseline</span> : null}<span className="sm:ml-auto">Peak 486 kW · 14:35</span></div>
    <div className="mt-4 h-[280px] w-full overflow-hidden">
      <svg viewBox="0 0 720 260" preserveAspectRatio="none" className="h-full w-full" role="img" aria-label="Energy demand line chart">
        <defs><linearGradient id="command-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--primary)" stopOpacity=".28"/><stop offset="1" stopColor="var(--primary)" stopOpacity="0"/></linearGradient></defs>
        {[0,1,2,3,4].map((line) => <line key={line} x1="0" x2="720" y1={line * 57.5} y2={line * 57.5} stroke="currentColor" className="text-border" strokeDasharray="3 6" />)}
        <polygon points={`0,230 ${actual} 720,230`} fill="url(#command-area)" />
        {mode === "comparison" ? <polyline points={baseline} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="7 7" vectorEffect="non-scaling-stroke" className="text-muted-foreground/50"/> : null}
        <polyline points={actual} fill="none" stroke="var(--primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
    <div className="grid grid-cols-7 text-[10px] text-muted-foreground"><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span className="text-right">24:00</span></div>
  </Card>;
}
