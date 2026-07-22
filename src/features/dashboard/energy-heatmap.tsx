import { Card } from "@/components/ui/card";
import { heatmap } from "@/data/command-center";
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
export function EnergyHeatmap() {
  return <Card className="p-6"><div className="flex items-start justify-between"><div><p className="font-medium">Consumption heatmap</p><p className="mt-1 text-sm text-muted-foreground">Seven-day hourly intensity</p></div><span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">Last 7 days</span></div>
  <div className="mt-7 overflow-x-auto"><div className="min-w-[620px]"><div className="ml-10 grid grid-cols-6 text-[10px] text-muted-foreground"><span>00</span><span>04</span><span>08</span><span>12</span><span>16</span><span>20</span></div><div className="mt-2 space-y-1.5">{heatmap.map((row, r) => <div key={days[r]} className="grid grid-cols-[32px_repeat(24,minmax(12px,1fr))] items-center gap-1"><span className="text-[10px] text-muted-foreground">{days[r]}</span>{row.map((value,c) => <div key={`${r}-${c}`} title={`${days[r]} ${String(c).padStart(2,"0")}:00 · ${value}% intensity`} className="aspect-square rounded-[4px] border border-primary/5" style={{background:`color-mix(in oklab, var(--primary) ${Math.max(8,value)}%, var(--muted))`}} />)}</div>)}</div></div></div>
  <div className="mt-5 flex items-center justify-end gap-2 text-[10px] text-muted-foreground"><span>Low</span>{[12,30,48,66,84].map(v => <i key={v} className="size-3 rounded-[3px]" style={{background:`color-mix(in oklab, var(--primary) ${v}%, var(--muted))`}}/>)}<span>High</span></div></Card>;
}
