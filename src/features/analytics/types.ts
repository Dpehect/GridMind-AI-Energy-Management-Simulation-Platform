export type TimePoint = { timestamp: string; value: number };
export type BenchmarkRecord = {
  id: string;
  building: string;
  type: string;
  areaM2: number;
  energyKwh: number;
  cost: number;
  carbonKg: number;
  occupancy: number;
};
export type CorrelationResult = {
  left: string;
  right: string;
  coefficient: number;
  strength: "weak" | "moderate" | "strong";
  direction: "positive" | "negative";
};
export type RootCauseCandidate = {
  id: string;
  title: string;
  confidence: number;
  impactScore: number;
  evidence: string[];
  recommendedAction: string;
};
export type ForecastPoint = {
  label: string;
  actual?: number;
  forecast: number;
  lower: number;
  upper: number;
};
export type OptimizationAction = {
  id: string;
  title: string;
  category: string;
  annualSavingsKwh: number;
  annualSavingsCost: number;
  carbonSavedKg: number;
  implementationCost: number;
  paybackMonths: number;
  confidence: number;
  selected: boolean;
};
