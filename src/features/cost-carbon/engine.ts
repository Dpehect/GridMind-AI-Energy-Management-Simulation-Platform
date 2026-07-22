import { hourlyDemandProfile, tariffPlans } from "./data";
import type { CostProjection, TariffPlan } from "./types";

function resolvePrice(plan: TariffPlan, hour: number) {
  const direct = plan.periods.find((period) => hour >= period.startHour && hour < period.endHour);
  if (direct) return direct.pricePerKwh;
  return plan.periods[0]?.pricePerKwh ?? 0;
}

export function calculateProjection(plan: TariffPlan, shiftPercent = 0): CostProjection {
  const safeShift = Math.max(0, Math.min(25, shiftPercent));
  const shifted = [...hourlyDemandProfile];

  const peakHours = [18, 19, 20, 21];
  const offPeakHours = [1, 2, 3, 4, 5, 6];

  const peakEnergy = peakHours.reduce((sum, hour) => sum + shifted[hour], 0);
  const movable = peakEnergy * (safeShift / 100);
  const reductionPerPeakHour = movable / peakHours.length;
  const additionPerOffPeakHour = movable / offPeakHours.length;

  peakHours.forEach((hour) => shifted[hour] -= reductionPerPeakHour);
  offPeakHours.forEach((hour) => shifted[hour] += additionPerOffPeakHour);

  const dailyEnergy = shifted.reduce((sum, value) => sum + value, 0);
  const monthlyEnergyKwh = dailyEnergy * 30;
  const dailyEnergyCost = shifted.reduce((sum, value, hour) => sum + value * resolvePrice(plan, hour), 0);
  const energyCost = dailyEnergyCost * 30;
  const totalCost = energyCost + plan.fixedMonthlyFee;
  const carbonKg = monthlyEnergyKwh * plan.carbonFactorKgPerKwh;
  const peakShare = shifted.slice(18, 22).reduce((sum, value) => sum + value, 0) / dailyEnergy;

  return {
    tariffId: plan.id,
    tariffName: plan.name,
    monthlyEnergyKwh,
    energyCost,
    fixedCost: plan.fixedMonthlyFee,
    totalCost,
    carbonKg,
    peakShare,
    savingsVsBaseline: 0
  };
}

export function compareTariffs(shiftPercent = 0) {
  const projections = tariffPlans.map((plan) => calculateProjection(plan, shiftPercent));
  const baseline = projections.find((item) => item.tariffId === "standard") ?? projections[0];
  return projections
    .map((item) => ({
      ...item,
      savingsVsBaseline: baseline.totalCost - item.totalCost
    }))
    .sort((a, b) => a.totalCost - b.totalCost);
}
