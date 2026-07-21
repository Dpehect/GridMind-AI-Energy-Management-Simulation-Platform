import { mean, standardDeviation } from "@/lib/intelligence/statistics";
import type { EnergyAnomaly, EnergyReading } from "@/lib/intelligence/types";

export function detectAnomalies(readings: EnergyReading[], threshold = 2.2): EnergyAnomaly[] {
  const byZone = new Map<string, EnergyReading[]>();
  for (const reading of readings) byZone.set(reading.zone, [...(byZone.get(reading.zone) ?? []), reading]);
  const anomalies: EnergyAnomaly[] = [];
  for (const [zone, zoneReadings] of byZone) {
    const baseline = zoneReadings.map((item) => item.value);
    const average = mean(baseline);
    const deviation = standardDeviation(baseline) || 1;
    for (const reading of zoneReadings) {
      const zScore = (reading.value - average) / deviation;
      if (Math.abs(zScore) < threshold) continue;
      const deviationPercent = average ? ((reading.value - average) / average) * 100 : 0;
      anomalies.push({
        id: `${zone}-${reading.timestamp}`,
        timestamp: reading.timestamp,
        zone,
        observed: reading.value,
        expected: average,
        deviationPercent,
        zScore,
        severity: Math.abs(zScore) >= 3.5 ? "high" : Math.abs(zScore) >= 2.8 ? "medium" : "low",
        explanation: `${zone} consumption is ${Math.abs(deviationPercent).toFixed(1)}% ${deviationPercent >= 0 ? "above" : "below"} its local baseline.`,
      });
    }
  }
  return anomalies.sort((a, b) => Math.abs(b.zScore) - Math.abs(a.zScore));
}
