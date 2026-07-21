import type { ActionItem, EnergyGoal, Recommendation } from "./types";

export const goals: EnergyGoal[] = [
  {
    id: "goal-energy-01",
    name: "Reduce annual electricity intensity",
    metric: "energy",
    baseline: 126,
    target: 104,
    current: 112,
    unit: "kWh/m²",
    startsAt: "2026-01-01",
    endsAt: "2026-12-31",
    owner: "Energy Operations",
    status: "on_track"
  },
  {
    id: "goal-cost-01",
    name: "Lower monthly operating cost",
    metric: "cost",
    baseline: 184000,
    target: 156000,
    current: 169800,
    unit: "TRY",
    startsAt: "2026-01-01",
    endsAt: "2026-12-31",
    owner: "Finance & Facilities",
    status: "at_risk"
  },
  {
    id: "goal-carbon-01",
    name: "Cut operational carbon",
    metric: "carbon",
    baseline: 482,
    target: 360,
    current: 401,
    unit: "tCO₂e",
    startsAt: "2026-01-01",
    endsAt: "2026-12-31",
    owner: "Sustainability",
    status: "on_track"
  }
];

export const recommendations: Recommendation[] = [
  {
    id: "rec-hvac-01",
    title: "Optimize AHU scheduling",
    summary: "Shift AHU start times and reduce simultaneous morning ramp-up.",
    category: "HVAC",
    impactScore: 91,
    effortScore: 34,
    confidence: 0.89,
    estimatedSavingsKwh: 28600,
    estimatedSavingsCost: 112400,
    status: "new",
    evidence: ["Morning peak exceeds baseline by 18%", "Four AHUs start within the same 10-minute window"]
  },
  {
    id: "rec-chiller-02",
    title: "Repair primary chiller efficiency loss",
    summary: "Maintenance signals indicate a recoverable 14.8% efficiency loss.",
    category: "Maintenance",
    impactScore: 86,
    effortScore: 58,
    confidence: 0.82,
    estimatedSavingsKwh: 13100,
    estimatedSavingsCost: 51700,
    status: "accepted",
    evidence: ["COP decline detected", "8 anomalies in 30 days"]
  },
  {
    id: "rec-light-03",
    title: "Introduce occupancy-based lighting zones",
    summary: "Late-evening lighting demand remains above occupancy-adjusted baseline.",
    category: "Lighting",
    impactScore: 67,
    effortScore: 42,
    confidence: 0.76,
    estimatedSavingsKwh: 8400,
    estimatedSavingsCost: 33200,
    status: "new",
    evidence: ["22% after-hours lighting load", "Low occupancy in affected zones"]
  },
  {
    id: "rec-tariff-04",
    title: "Move flexible load to off-peak tariff window",
    summary: "Battery charging and selected process loads can be shifted after 22:00.",
    category: "Tariff",
    impactScore: 73,
    effortScore: 26,
    confidence: 0.87,
    estimatedSavingsKwh: 0,
    estimatedSavingsCost: 46800,
    status: "accepted",
    evidence: ["13% flexible peak load", "Time-of-use plan outperforms baseline"]
  }
];

export const actionItems: ActionItem[] = [
  {
    id: "act-01",
    recommendationId: "rec-chiller-02",
    title: "Complete chiller inspection and cleaning",
    owner: "Mert Kaya",
    dueDate: "2026-08-05",
    status: "in_progress",
    expectedSavingsKwh: 13100,
    realizedSavingsKwh: 3200
  },
  {
    id: "act-02",
    recommendationId: "rec-tariff-04",
    title: "Reschedule EV charging profile",
    owner: "Selin Acar",
    dueDate: "2026-08-12",
    status: "planned",
    expectedSavingsKwh: 0,
    realizedSavingsKwh: 0
  },
  {
    id: "act-03",
    recommendationId: "rec-hvac-01",
    title: "Review AHU start sequence",
    owner: "Energy Operations",
    dueDate: "2026-08-01",
    status: "backlog",
    expectedSavingsKwh: 28600,
    realizedSavingsKwh: 0
  }
];
