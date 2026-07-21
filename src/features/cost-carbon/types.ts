export type TariffPeriod = {
  id: string;
  label: string;
  startHour: number;
  endHour: number;
  pricePerKwh: number;
};

export type TariffPlan = {
  id: string;
  name: string;
  currency: "TRY" | "EUR" | "USD";
  fixedMonthlyFee: number;
  periods: TariffPeriod[];
  carbonFactorKgPerKwh: number;
};

export type CostProjection = {
  tariffId: string;
  tariffName: string;
  monthlyEnergyKwh: number;
  energyCost: number;
  fixedCost: number;
  totalCost: number;
  carbonKg: number;
  peakShare: number;
  savingsVsBaseline: number;
};
