import { BarChart3, BrainCircuit, Building2, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  { icon: Gauge, title: "Operational command", copy: "A focused view of demand, cost, carbon, peak events, and system health." },
  { icon: BrainCircuit, title: "Local intelligence", copy: "Deterministic anomaly detection and forecasting without remote AI services." },
  { icon: Building2, title: "Building context", copy: "Connect energy readings to floors, zones, meters, and operational schedules." },
  { icon: BarChart3, title: "Scenario evidence", copy: "Compare efficiency actions with transparent savings and confidence estimates." }
];

export function PlatformSection() {
  return (
    <section id="platform" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium text-primary">One operational model</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-.04em] sm:text-6xl">From fragmented readings to decisions people can act on.</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, copy }) => <Card key={title} className="p-6"><span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></Card>)}
        </div>
      </div>
    </section>
  );
}
