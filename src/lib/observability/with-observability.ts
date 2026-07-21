import { headers } from "next/headers";
import { createObservabilityContext, runWithObservabilityContext } from "./context";
import { structuredLog } from "./logger";

export async function withObservability<T>(
  category: string,
  operation: () => Promise<T>
): Promise<T> {
  const requestHeaders = await headers();
  const requestId =
    requestHeaders.get("x-request-id") ??
    undefined;
  const correlationId =
    requestHeaders.get("x-correlation-id") ??
    requestId;

  const context = createObservabilityContext({
    requestId,
    correlationId
  });

  return runWithObservabilityContext(context, async () => {
    const started = performance.now();

    try {
      const result = await operation();

      await structuredLog({
        level: "info",
        category,
        message: "Operation completed",
        durationMs: Math.round(performance.now() - started)
      });

      return result;
    } catch (error) {
      await structuredLog({
        level: "error",
        category,
        message:
          error instanceof Error
            ? error.message
            : "Unknown operation error",
        durationMs: Math.round(performance.now() - started),
        metadata: {
          errorType:
            error instanceof Error
              ? error.name
              : typeof error
        }
      });

      throw error;
    }
  });
}
