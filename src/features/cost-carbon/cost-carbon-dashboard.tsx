"use client";

import { useMemo, useState } from "react";
import { Leaf, PiggyBank, Scale, TimerReset, TrendingDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { compareTariffs } from "./engine";

const number = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });
const currency = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });

export function CostCarbonDashboard() {
  const [shiftPercent, setShiftPercent] = useState(10);
  const projections = useMemo(() => compareTariffs(shiftPercent), [shiftPercent]);
  const best = projections[0];
  const baseline = projections.find((item) => item.tariffId === "standard") ?? projections[0];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Best monthly cost" value={currency.format(best.totalCost)} trend={`${currency.format(best.savingsVsBaseline)} saved`} icon={PiggyBank} />
        <MetricCard label="Monthly energy" value={`${number.format(best.monthlyEnergyKwh)} kWh`} trend="Deterministic profile" icon={Zap} />
        <MetricCard label="Carbon impact" value={`${number.format(best.carbonKg)} kg`} trend={`${Math.round((1 - best.carbonKg / baseline.carbonKg) * 100)}% below baseline`} icon={Leaf} />
        <MetricCard label="Peak share" value={`${Math.round(best.peakShare * 100)}%`} trend={`${shiftPercent}% load shifted`} icon={TimerReset} />
      </div>

      <SectionCard title="Load shifting control" description="Move flexible demand away from peak hours and compare the result instantly.">
        <div className="space-y-4">
          <input
            aria-label="Load shift percentage"
            type="range"
            min="0"
            max="25"
            step="1"
            value={shiftPercent}
            onChange={(event) => setShiftPercent(Number(event.target.value))}
            className="w-full accent-[hsl(var(--primary))]"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Current shift: <strong className="text-foreground">{shiftPercent}%</strong></span>
            <div className="flex gap-2">
              {[0, 10, 15, 25].map((value) => (
                <Button key={value} size="sm" variant={shiftPercent === value ? "default" : "outline"} onClick={() => setShiftPercent(value)}>
                  {value}%
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Tariff comparison" description="Ranked by total monthly operating cost.">
        <div className="space-y-3">
          {projections.map((item, index) => (
            <div key={item.tariffId} className="grid gap-4 rounded-2xl border border-border p-4 md:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] md:items-center">
              <div>
                <p className="font-semibold">{item.tariffName}</p>
                <p className="mt-1 text-xs text-muted-foreground">{index === 0 ? "Recommended plan" : "Alternative plan"}</p>
              </div>
              <div><p className="text-xs text-muted-foreground">Total cost</p><p className="mt-1 font-semibold">{currency.format(item.totalCost)}</p></div>
              <div><p className="text-xs text-muted-foreground">Savings</p><p className="mt-1 font-semibold">{currency.format(item.savingsVsBaseline)}</p></div>
              <div><p className="text-xs text-muted-foreground">Carbon</p><p className="mt-1 font-semibold">{number.format(item.carbonKg)} kg</p></div>
              <div><p className="text-xs text-muted-foreground">Peak share</p><p className="mt-1 font-semibold">{Math.round(item.peakShare * 100)}%</p></div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard title="Best tariff" description="Lowest projected cost">
          <Scale className="size-5 text-primary" />
          <p className="mt-4 text-lg font-semibold">{best.tariffName}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">The engine balances unit price, fixed fee, peak demand and carbon factor.</p>
        </SectionCard>
        <SectionCard title="Peak reduction" description="Operational opportunity">
          <TrendingDown className="size-5 text-primary" />
          <p className="mt-4 text-lg font-semibold">{shiftPercent}% flexible load</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Move HVAC pre-cooling, charging and non-critical equipment away from peak windows.</p>
        </SectionCard>
        <SectionCard title="Carbon strategy" description="Lower-emission operating plan">
          <Leaf className="size-5 text-primary" />
          <p className="mt-4 text-lg font-semibold">Green Flex</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">The lowest-carbon plan may differ from the lowest-cost plan, so GridMind exposes both trade-offs.</p>
        </SectionCard>
      </div>
    </div>
  );
}
