export const commandMetrics = [
  { label: "Energy consumption", value: "8,742", unit: "kWh", change: -12.4, detail: "1,238 kWh below baseline", tone: "energy" },
  { label: "Estimated cost", value: "₺31,480", unit: "", change: -8.7, detail: "₺2,990 avoided this month", tone: "cost" },
  { label: "Carbon impact", value: "3.62", unit: "tCO₂e", change: -14.1, detail: "596 kg below target", tone: "carbon" },
  { label: "Peak demand", value: "486", unit: "kW", change: 4.2, detail: "Detected at 14:35", tone: "warning" },
] as const;

export const demandSeries = [
  { hour: "00", actual: 182, baseline: 205 }, { hour: "02", actual: 168, baseline: 192 },
  { hour: "04", actual: 158, baseline: 188 }, { hour: "06", actual: 226, baseline: 235 },
  { hour: "08", actual: 352, baseline: 370 }, { hour: "10", actual: 418, baseline: 430 },
  { hour: "12", actual: 447, baseline: 452 }, { hour: "14", actual: 486, baseline: 462 },
  { hour: "16", actual: 432, baseline: 448 }, { hour: "18", actual: 344, baseline: 386 },
  { hour: "20", actual: 272, baseline: 318 }, { hour: "22", actual: 214, baseline: 246 },
  { hour: "24", actual: 190, baseline: 216 },
] as const;

export const zoneBreakdown = [
  { name: "Production floor", value: 38, usage: "3,322 kWh", delta: -5.2 },
  { name: "HVAC systems", value: 27, usage: "2,360 kWh", delta: -13.8 },
  { name: "Office spaces", value: 18, usage: "1,574 kWh", delta: -9.4 },
  { name: "Data & server rooms", value: 11, usage: "962 kWh", delta: 3.1 },
  { name: "Shared services", value: 6, usage: "524 kWh", delta: -2.7 },
] as const;

export const operationalAlerts = [
  { id: "ALT-1048", title: "Peak demand threshold exceeded", location: "Production floor · Line B", time: "8 min ago", severity: "critical", value: "486 kW" },
  { id: "ALT-1047", title: "Unusual overnight base load", location: "Data & server rooms", time: "42 min ago", severity: "warning", value: "+18.6%" },
  { id: "ALT-1046", title: "Meter data quality degraded", location: "West wing · Meter M-14", time: "2 hr ago", severity: "info", value: "91%" },
] as const;

export const heatmap = [
  [21,18,17,16,19,28,42,56,63,71,74,69,65,72,82,88,76,62,51,44,38,31,26,23],
  [20,17,16,16,18,25,39,52,61,69,73,68,64,70,79,84,75,64,54,47,39,32,27,23],
  [19,17,15,15,17,24,37,50,59,67,70,66,63,68,77,81,73,61,52,45,38,31,26,22],
  [18,16,15,14,17,23,35,48,58,66,69,64,62,67,75,79,71,60,50,43,36,29,25,21],
  [20,18,17,16,19,27,41,55,65,74,77,72,69,76,86,92,82,69,58,49,41,34,29,25],
  [17,15,14,14,16,21,31,43,52,59,63,60,58,62,69,72,66,57,48,41,34,28,24,20],
  [16,14,13,13,15,19,27,36,43,49,53,51,50,54,59,61,57,49,42,36,30,25,21,18],
] as const;
