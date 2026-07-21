export async function profileQuery<T>(
  label: string,
  operation: () => Promise<T>
) {
  const started = performance.now();
  const result = await operation();
  const durationMs = Math.round(
    performance.now() - started
  );

  return {
    label,
    durationMs,
    result
  };
}
