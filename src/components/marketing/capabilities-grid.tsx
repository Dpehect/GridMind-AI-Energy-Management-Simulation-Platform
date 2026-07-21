import { Activity, Building2, ChartNoAxesCombined, CircleDollarSign, Cpu, Workflow } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const capabilities = [
  { icon: Activity, title: "Anomaly intelligence", copy: "Surface abnormal loads, overnight waste and recurring spikes with explainable local models." },
  { icon: ChartNoAxesCombined, title: "Demand forecasting", copy: "Create transparent short-term baselines without depending on paid cloud inference." },
  { icon: Building2, title: "Building operations", copy: "Compare floors, zones, meters and devices in a consistent operational hierarchy." },
  { icon: Workflow, title: "Scenario simulation", copy: "Model schedules, tariffs and equipment changes before committing budget." },
  { icon: CircleDollarSign, title: "Cost intelligence", copy: "Translate energy behavior into financial impact, payback windows and prioritized actions." },
  { icon: Cpu, title: "Local architecture", copy: "Keep the core product useful offline with deterministic analysis and portable data." },
];

export function CapabilitiesGrid() {
  return (
    <section id="platform" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow">Platform capabilities</p>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Built for energy teams who need clarity, not another dashboard.</h2>
            <p className="max-w-md text-base leading-7 text-muted-foreground">Every layer is designed around explainability, fast navigation and decisions that can be validated.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04} className="group rounded-[1.75rem] border border-border bg-card p-7 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-primary"><item.icon className="size-5" /></div>
              <h3 className="mt-10 text-xl font-semibold tracking-[-0.025em]">{item.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{item.copy}</p>
              <div className="mt-8 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
