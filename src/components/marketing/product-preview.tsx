import { Activity, ArrowUpRight, CircleDollarSign, Leaf, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function ProductPreview() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-border bg-[linear-gradient(145deg,var(--card),var(--accent))] p-4 shadow-2xl shadow-primary/5 md:p-8">
        <Reveal className="rounded-[2rem] border border-border/80 bg-background/90 p-5 backdrop-blur md:p-7">
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 md:flex-row md:items-center">
            <div><p className="text-sm text-muted-foreground">Central Operations / Atlas Office</p><h3 className="mt-1 text-2xl font-semibold">Energy command center</h3></div>
            <div className="flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-sm"><span className="size-2 rounded-full bg-primary" /> Live local dataset</div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <div className="rounded-[1.5rem] border border-border bg-card p-5">
              <div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Consumption profile</p><p className="mt-1 text-3xl font-semibold">486.2 kWh</p></div><Zap className="size-6 text-primary" /></div>
              <div className="mt-10 flex h-48 items-end gap-2" aria-label="Illustrative energy usage chart">
                {[42,58,48,72,66,90,74,61,82,56,68,45].map((height, index) => <div key={index} className="flex-1 rounded-t-md bg-primary/20 transition-colors hover:bg-primary" style={{ height: `${height}%` }} />)}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[{icon:Activity,label:"Health score",value:"92 / 100"},{icon:CircleDollarSign,label:"Monthly cost",value:"₺38,420"},{icon:Leaf,label:"Carbon trend",value:"-8.4%"}].map((item) => <div key={item.label} className="rounded-[1.5rem] border border-border bg-card p-5"><div className="flex items-center justify-between"><item.icon className="size-5 text-primary"/><ArrowUpRight className="size-4 text-muted-foreground"/></div><p className="mt-8 text-sm text-muted-foreground">{item.label}</p><p className="mt-1 text-xl font-semibold">{item.value}</p></div>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
