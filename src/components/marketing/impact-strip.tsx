import { Gauge, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const items = [
  { label: "Peak-load visibility", value: "24/7", icon: Gauge },
  { label: "Local-first analysis", value: "100%", icon: ShieldCheck },
  { label: "Carbon intelligence", value: "Live", icon: Leaf },
  { label: "Actionable scenarios", value: "Instant", icon: Sparkles },
];

export function ImpactStrip() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.05} className="bg-card p-6 md:p-8">
            <item.icon className="size-5 text-primary" aria-hidden="true" />
            <p className="mt-8 text-3xl font-semibold tracking-[-0.04em]">{item.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
