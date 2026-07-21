export type GoalMetric = "energy" | "cost" | "carbon";
export type GoalStatus = "on_track" | "at_risk" | "behind" | "completed";
export type ActionStatus = "backlog" | "planned" | "in_progress" | "done";

export type EnergyGoal = {
  id: string;
  name: string;
  metric: GoalMetric;
  baseline: number;
  target: number;
  current: number;
  unit: string;
  startsAt: string;
  endsAt: string;
  owner: string;
  status: GoalStatus;
};

export type Recommendation = {
  id: string;
  title: string;
  summary: string;
  category: string;
  impactScore: number;
  effortScore: number;
  confidence: number;
  estimatedSavingsKwh: number;
  estimatedSavingsCost: number;
  status: "new" | "accepted" | "dismissed" | "completed";
  evidence: string[];
};

export type ActionItem = {
  id: string;
  recommendationId: string;
  title: string;
  owner: string;
  dueDate: string;
  status: ActionStatus;
  expectedSavingsKwh: number;
  realizedSavingsKwh: number;
};
