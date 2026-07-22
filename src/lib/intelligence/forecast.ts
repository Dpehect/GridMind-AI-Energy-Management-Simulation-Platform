import { mean, standardDeviation } from "@/lib/intelligence/statistics";
import type { EnergyReading, ForecastPoint } from "@/lib/intelligence/types";

export function forecastDemand(readings: EnergyReading[], horizon = 12): ForecastPoint[] {
  const values = readings.map((item) => item.value);
  if (!values.length) return [];
  const n = values.length;
  const xMean = (n - 1) / 2;
  const yMean = mean(values);
  const numerator = values.reduce((sum, value, index) => sum + (index - xMean) * (value - yMean), 0);
  const denominator = values.reduce((sum, _, index) => sum + (index - xMean) ** 2, 0) || 1;
  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;
  const residuals = values.map((value, index) => value - (intercept + slope * index));
  const error = standardDeviation(residuals) || yMean * 0.04;
  const last = new Date(readings.at(-1)!.timestamp);
  return Array.from({ length: horizon }, (_, index) => {
    const predicted = Math.max(0, intercept + slope * (n + index));
    const timestamp = new Date(last.getTime() + (index + 1) * 60 * 60 * 1000).toISOString();
    return { timestamp, predicted, lower: Math.max(0, predicted - error * 1.64), upper: predicted + error * 1.64 };
  });
}
