export function normalizePageSize(
  value: string | number | null | undefined,
  options: {
    defaultSize?: number;
    maxSize?: number;
  } = {}
) {
  const parsed = Number(value);
  const defaultSize = options.defaultSize ?? 50;
  const maxSize = options.maxSize ?? 250;

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return defaultSize;
  }

  return Math.min(maxSize, Math.floor(parsed));
}
