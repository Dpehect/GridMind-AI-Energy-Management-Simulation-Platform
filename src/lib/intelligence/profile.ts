import { clamp, mean, standardDeviation } from "@/lib/intelligence/statistics";
import type { ConsumptionProfile, EnergyReading } from "@/lib/intelligence/types";

export function classifyConsumption(readings: EnergyReading[]): ConsumptionProfile {
  if (!readings.length) return { type: "balanced", confidence: 0, evidence: ["No readings available"] };
  const values = readings.map((item) => item.value);
  const average = mean(values);
  const variability = average ? standardDeviation(values) / average : 0;
  const night = readings.filter((item) => { const h = new Date(item.timestamp).getHours(); return h < 6 || h >= 22; });
  const weekend = readings.filter((item) => [0, 6].includes(new Date(item.timestamp).getDay()));
  const nightRatio = night.length ? mean(night.map((item) => item.value)) / average : 0;
  const weekendRatio = weekend.length ? mean(weekend.map((item) => item.value)) / average : 0;
  const peakRatio = Math.max(...values) / Math.max(average, 1);
  if (nightRatio > 0.78) return { type: "night-waste", confidence: clamp(nightRatio, 0, 1), evidence: ["Night load remains close to daytime baseline", "Base-load reduction opportunity detected"] };
  if (weekendRatio > 1.12) return { type: "weekend-heavy", confidence: clamp(weekendRatio - 0.2, 0, 1), evidence: ["Weekend average exceeds weekday baseline"] };
  if (variability > 0.42) return { type: "irregular", confidence: clamp(variability + 0.25, 0, 1), evidence: ["High hour-to-hour variability", "Schedule consistency is low"] };
  if (peakRatio > 1.65) return { type: "peak-heavy", confidence: clamp(peakRatio / 2, 0, 1), evidence: ["Peak demand materially exceeds average load"] };
  if (variability < 0.12) return { type: "continuous-load", confidence: clamp(1 - variability, 0, 1), evidence: ["Load remains nearly constant across the day"] };
  return { type: "balanced", confidence: 0.82, evidence: ["Demand profile is stable", "No dominant waste pattern detected"] };
}
