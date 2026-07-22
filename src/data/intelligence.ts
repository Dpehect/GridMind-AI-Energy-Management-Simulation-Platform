import type { EnergyReading } from "@/lib/intelligence";
const zones = ["Operations", "Data Center", "Studio", "Common Areas"];
export const intelligenceReadings: EnergyReading[] = Array.from({ length: 96 }, (_, index) => {
  const timestamp = new Date(Date.UTC(2026, 6, 20, index % 24, 0, 0));
  const zone = zones[index % zones.length];
  const hour = timestamp.getUTCHours();
  const occupied = hour >= 7 && hour <= 19;
  const base = zone === "Data Center" ? 42 : zone === "Operations" ? 29 : zone === "Studio" ? 18 : 13;
  const daily = occupied ? 1.32 : 0.72;
  const spike = index === 55 || index === 78 ? 2.4 : 1;
  return { timestamp: timestamp.toISOString(), zone, value: Number((base * daily * spike * (1 + ((index % 7) - 3) * 0.018)).toFixed(2)) };
});
