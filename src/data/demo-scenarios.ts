import type { ScenarioInput } from "@/lib/scenario/types";

export const demoScenarios: ScenarioInput[] = [
  {
    name: "Night load reduction",
    kind: "night-load",
    baselineKwh: 48200,
    baselineCost: 11840,
    baselineCarbonKg: 18500,
    implementationCost: 4200,
    reductionPercent: 18,
    confidence: 0.89
  },
  {
    name: "Peak shaving program",
    kind: "peak-shaving",
    baselineKwh: 48200,
    baselineCost: 11840,
    baselineCarbonKg: 18500,
    implementationCost: 12800,
    reductionPercent: 24,
    confidence: 0.78
  },
  {
    name: "LED lighting retrofit",
    kind: "lighting",
    baselineKwh: 48200,
    baselineCost: 11840,
    baselineCarbonKg: 18500,
    implementationCost: 18400,
    reductionPercent: 31,
    confidence: 0.92
  }
];
