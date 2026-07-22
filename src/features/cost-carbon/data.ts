import type { TariffPlan } from "./types";

export const tariffPlans: TariffPlan[] = [
  {
    id: "standard",
    name: "Standard commercial",
    currency: "TRY",
    fixedMonthlyFee: 1250,
    carbonFactorKgPerKwh: 0.42,
    periods: [
      { id: "all-day", label: "All day", startHour: 0, endHour: 24, pricePerKwh: 3.85 }
    ]
  },
  {
    id: "time-of-use",
    name: "Time of use",
    currency: "TRY",
    fixedMonthlyFee: 1450,
    carbonFactorKgPerKwh: 0.39,
    periods: [
      { id: "off-peak", label: "Off-peak", startHour: 0, endHour: 7, pricePerKwh: 2.65 },
      { id: "day", label: "Day", startHour: 7, endHour: 18, pricePerKwh: 3.75 },
      { id: "peak", label: "Peak", startHour: 18, endHour: 22, pricePerKwh: 5.35 },
      { id: "late", label: "Late", startHour: 22, endHour: 24, pricePerKwh: 2.95 }
    ]
  },
  {
    id: "green-flex",
    name: "Green Flex",
    currency: "TRY",
    fixedMonthlyFee: 1750,
    carbonFactorKgPerKwh: 0.18,
    periods: [
      { id: "solar-window", label: "Solar window", startHour: 9, endHour: 16, pricePerKwh: 2.95 },
      { id: "regular", label: "Regular", startHour: 0, endHour: 9, pricePerKwh: 3.35 },
      { id: "evening", label: "Evening", startHour: 16, endHour: 24, pricePerKwh: 4.15 }
    ]
  }
];

export const hourlyDemandProfile = [
  280, 260, 250, 245, 255, 290, 360, 520, 680, 760, 810, 840,
  830, 805, 790, 770, 745, 780, 860, 910, 885, 720, 540, 390
];
