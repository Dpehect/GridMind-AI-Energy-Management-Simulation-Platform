"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Gauge, Leaf, Save, Sparkles, WalletCards, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { demoScenarios } from "@/data/demo-scenarios";
import { compareScenarios } from "@/lib/scenario/engine";

const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function ScenarioLab() {
  const [reduction, setReduction] = useState(22);
  const [investment, setInvestment] = useState(9500);
  const [confidence, setConfidence] = useState(82);

  const scenarios = useMemo(() => compareScenarios([
    ...demoScenarios,
    {
      name: "Custom operating plan",
      kind: "schedule",
      baselineKwh: 48200,
      baselineCost: 11840,
      baselineCarbonKg: 18500,
      implementationCost: investment,
      reductionPercent: reduction,
      confidence: confidence / 100
    }
  ]), [reduction, investment, confidence]);

  const custom = scenarios.find((scenario) => scenario.name === "Custom operating plan")!;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.05fr_1.95fr]">
        <SectionCard title="Simulation controls" description="Tune assumptions and review outputs instantly.">
          <div className="space-y-6">
            <Control label="Expected reduction" value={`${reduction}%`} min={5} max={60} current={reduction} onChange={setReduction} />
            <Control label="Implementation cost" value={money.format(investment)} min={1000} max={50000} step={500} current={investment} onChange={setInvestment} />
            <Control label="Confidence" value={`${confidence}%`} min={40} max={98} current={confidence} onChange={setConfidence} />
            <Button className="w-full" onClick={() => toast.success("Scenario saved locally")}><Save className="size-4" /> Save scenario</Button>
          </div>
        </SectionCard>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Metric icon={Zap} label="Annual energy savings" value={`${number.format(custom.annualEnergySavings)} kWh`} />
          <Metric icon={WalletCards} label="Annual cost savings" value={money.format(custom.annualCostSavings)} />
          <Metric icon={Leaf} label="Carbon avoided" value={`${number.format(custom.annualCarbonSavingsKg)} kg`} />
          <Metric icon={Gauge} label="Confidence" value={`${confidence}%`} />
          <Metric icon={BarChart3} label="Payback" value={custom.paybackMonths ? `${custom.paybackMonths} months` : "N/A"} />
          <Metric icon={Sparkles} label="Scenario score" value={`${custom.score}/100`} />
        </div>
      </div>

      <SectionCard title="Scenario comparison" description="Ranked by impact, confidence and payback performance.">
        <div className="grid gap-4 lg:grid-cols-2">
          {scenarios.map((scenario, index) => (
            <motion.article key={scenario.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-border bg-card/70 p-5">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-sm text-muted-foreground">#{index + 1} recommendation</p><h3 className="mt-1 font-semibold">{scenario.name}</h3></div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{scenario.score}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Stat label="Energy" value={`${number.format(scenario.annualEnergySavings)} kWh`} />
                <Stat label="Cost" value={money.format(scenario.annualCostSavings)} />
                <Stat label="Carbon" value={`${number.format(scenario.annualCarbonSavingsKg)} kg`} />
                <Stat label="Risk" value={scenario.risk} />
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${scenario.score}%` }} /></div>
            </motion.article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function Control({ label, value, min, max, step = 1, current, onChange }: { label: string; value: string; min: number; max: number; step?: number; current: number; onChange: (value: number) => void }) {
  return <label className="block"><span className="flex items-center justify-between text-sm"><span className="font-medium">{label}</span><span className="text-muted-foreground">{value}</span></span><input className="mt-3 w-full accent-[hsl(var(--primary))]" type="range" min={min} max={max} step={step} value={current} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}

function Metric({ icon: Icon, label, value }: { icon: typeof Zap; label: string; value: string }) {
  return <div className="rounded-2xl border border-border bg-card p-5"><Icon className="size-5 text-primary" /><p className="mt-4 text-sm text-muted-foreground">{label}</p><p className="mt-2 text-xl font-semibold tracking-tight">{value}</p></div>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-muted/60 p-3"><p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 font-medium capitalize">{value}</p></div>;
}
