import { zones } from "@/data/demo-metrics";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ZoneTable() {
  return <Card className="p-6"><div><p className="text-sm font-medium">Zone performance</p><p className="mt-1 text-sm text-muted-foreground">Efficiency context by operational area</p></div><div className="mt-6 divide-y divide-border">{zones.map((zone) => <div key={zone.name} className="grid grid-cols-[1fr_auto] items-center gap-4 py-4"><div><div className="flex items-center gap-2"><p className="text-sm font-medium">{zone.name}</p><Badge>{zone.status}</Badge></div><p className="mt-1 text-xs text-muted-foreground">{zone.usage} · health {zone.health}/100</p></div><div className="h-2 w-24 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${zone.health}%` }} /></div></div>)}</div></Card>;
}
