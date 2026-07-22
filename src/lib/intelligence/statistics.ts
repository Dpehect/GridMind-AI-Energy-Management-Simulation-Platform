export function mean(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}
export function standardDeviation(values: number[]) {
  if (values.length < 2) return 0;
  const average = mean(values);
  return Math.sqrt(mean(values.map((value) => (value - average) ** 2)));
}
export function movingAverage(values: number[], windowSize: number) {
  return values.map((_, index) => {
    const start = Math.max(0, index - windowSize + 1);
    return mean(values.slice(start, index + 1));
  });
}
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
