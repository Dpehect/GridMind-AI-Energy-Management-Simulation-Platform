import type { ActionItem, EnergyGoal, Recommendation } from "./types";

export function goalProgress(goal: EnergyGoal) {
  const total = Math.abs(goal.baseline - goal.target);
  const achieved = Math.abs(goal.baseline - goal.current);
  return Math.max(0, Math.min(100, Math.round((achieved / Math.max(total, 1)) * 100)));
}

export function recommendationPriority(recommendation: Recommendation) {
  return Math.round(
    recommendation.impactScore * 0.5 +
    (100 - recommendation.effortScore) * 0.25 +
    recommendation.confidence * 100 * 0.25
  );
}

export function actionPlanSummary(items: ActionItem[]) {
  const expected = items.reduce((sum, item) => sum + item.expectedSavingsKwh, 0);
  const realized = items.reduce((sum, item) => sum + item.realizedSavingsKwh, 0);
  const completed = items.filter((item) => item.status === "done").length;
  return {
    expected,
    realized,
    realizationRate: expected ? Math.round((realized / expected) * 100) : 0,
    completed,
    total: items.length
  };
}
