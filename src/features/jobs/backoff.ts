export function calculateBackoffMs(
  attempt: number,
  baseMs = 1_000,
  maxMs = 60_000
) {
  const exponential = baseMs * 2 ** Math.max(0, attempt - 1);
  const jitter = Math.floor(Math.random() * Math.min(1_000, exponential * 0.2));
  return Math.min(maxMs, exponential + jitter);
}
