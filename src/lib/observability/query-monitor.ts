import { structuredLog } from "./logger";

const SLOW_QUERY_MS = Number(
  process.env.GRIDMIND_SLOW_QUERY_MS ?? 250
);

export async function monitorQuery<T>(
  label: string,
  query: () => Promise<T>
) {
  const started = performance.now();

  try {
    const result = await query();
    const durationMs = Math.round(
      performance.now() - started
    );

    if (durationMs >= SLOW_QUERY_MS) {
      await structuredLog({
        level: "warn",
        category: "database.slow_query",
        message: label,
        durationMs,
        metadata: {
          thresholdMs: SLOW_QUERY_MS
        }
      });
    }

    return result;
  } catch (error) {
    await structuredLog({
      level: "error",
      category: "database.query_error",
      message: label,
      durationMs: Math.round(
        performance.now() - started
      ),
      metadata: {
        error:
          error instanceof Error
            ? error.message
            : String(error)
      }
    });

    throw error;
  }
}
