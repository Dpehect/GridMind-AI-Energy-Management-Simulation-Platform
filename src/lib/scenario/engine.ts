import type { ScenarioInput, ScenarioResult } from "./types";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function simulateScenario(input: ScenarioInput): ScenarioResult {
  const reduction = clamp(input.reductionPercent, 0, 80) / 100;
  const confidence = clamp(input.confidence, 0.2, 0.99);
  const effectiveReduction = reduction * confidence;
  const projectedKwh = input.baselineKwh * (1 - effectiveReduction);
  const projectedCost = input.baselineCost * (1 - effectiveReduction);
  const projectedCarbonKg = input.baselineCarbonKg * (1 - effectiveReduction);
  const annualEnergySavings = (input.baselineKwh - projectedKwh) * 12;
  const annualCostSavings = (input.baselineCost - projectedCost) * 12;
  const annualCarbonSavingsKg = (input.baselineCarbonKg - projectedCarbonKg) * 12;
  const paybackMonths = annualCostSavings > 0
    ? Math.ceil((input.implementationCost / annualCostSavings) * 12)
    : null;
  const risk = confidence >= 0.82 && reduction <= 0.3
    ? "low"
    : confidence >= 0.65 && reduction <= 0.5
      ? "medium"
      : "high";
  const score = Math.round(
    clamp(
      effectiveReduction * 70 +
        confidence * 20 +
        (paybackMonths !== null ? clamp(24 - paybackMonths, 0, 24) / 24 * 10 : 0),
      0,
      100
    )
  );

  return {
    ...input,
    projectedKwh,
    projectedCost,
    projectedCarbonKg,
    annualEnergySavings,
    annualCostSavings,
    annualCarbonSavingsKg,
    paybackMonths,
    risk,
    score
  };
}

export function compareScenarios(inputs: ScenarioInput[]) {
  return inputs
    .map(simulateScenario)
    .sort((a, b) => b.score - a.score || b.annualCostSavings - a.annualCostSavings);
}
