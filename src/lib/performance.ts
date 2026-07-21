export const performanceBudgets = {
  initialJsKb: 250,
  routeJsKb: 180,
  largestContentfulPaintMs: 2500,
  interactionToNextPaintMs: 200,
  cumulativeLayoutShift: 0.1
};

export function shouldUseReducedEffects(input?: {
  hardwareConcurrency?: number;
  deviceMemory?: number;
  reducedMotion?: boolean;
}) {
  if (input?.reducedMotion) return true;
  if ((input?.hardwareConcurrency ?? 8) <= 4) return true;
  if ((input?.deviceMemory ?? 8) <= 4) return true;
  return false;
}
