export type ScenarioKind =
  | "schedule"
  | "device-upgrade"
  | "tariff"
  | "lighting"
  | "night-load"
  | "peak-shaving"
  | "renewable";

export type ScenarioInput = {
  name: string;
  kind: ScenarioKind;
  baselineKwh: number;
  baselineCost: number;
  baselineCarbonKg: number;
  implementationCost: number;
  reductionPercent: number;
  confidence: number;
};

export type ScenarioResult = ScenarioInput & {
  projectedKwh: number;
  projectedCost: number;
  projectedCarbonKg: number;
  annualEnergySavings: number;
  annualCostSavings: number;
  annualCarbonSavingsKg: number;
  paybackMonths: number | null;
  risk: "low" | "medium" | "high";
  score: number;
};
