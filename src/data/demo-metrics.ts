export const energyMetrics = [
  { label: "Consumption", value: "14.8 MWh", change: "−8.4%", detail: "vs. previous period" },
  { label: "Energy cost", value: "$2,946", change: "−5.1%", detail: "projected monthly" },
  { label: "Peak demand", value: "124 kW", change: "−12 kW", detail: "today at 14:20" },
  { label: "Carbon impact", value: "5.9 tCO₂e", change: "−7.8%", detail: "market-based" }
] as const;

export const hourlyUsage = [32, 29, 27, 26, 28, 34, 45, 62, 78, 84, 91, 88, 83, 95, 100, 93, 86, 74, 68, 59, 51, 45, 39, 35];

export const zones = [
  { name: "Operations floor", usage: "4.8 MWh", health: 92, status: "Efficient" },
  { name: "Data room", usage: "3.2 MWh", health: 76, status: "Review" },
  { name: "Common areas", usage: "2.7 MWh", health: 88, status: "Stable" },
  { name: "Workshop", usage: "4.1 MWh", health: 81, status: "Stable" }
] as const;
