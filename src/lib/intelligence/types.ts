export type EnergyReading = { timestamp: string; value: number; zone: string };
export type AnomalySeverity = "low" | "medium" | "high";
export type EnergyAnomaly = {
  id: string;
  timestamp: string;
  zone: string;
  observed: number;
  expected: number;
  deviationPercent: number;
  zScore: number;
  severity: AnomalySeverity;
  explanation: string;
};
export type ForecastPoint = { timestamp: string; predicted: number; lower: number; upper: number };
export type ConsumptionProfile = {
  type: "peak-heavy" | "continuous-load" | "irregular" | "weekend-heavy" | "night-waste" | "balanced";
  confidence: number;
  evidence: string[];
};
export type Recommendation = {
  id: string;
  title: string;
  description: string;
  impactScore: number;
  effortScore: number;
  confidence: number;
  estimatedAnnualSavingsKwh: number;
  estimatedAnnualSavingsCost: number;
  paybackMonths: number;
  rationale: string[];
};
