import { prisma } from "@/lib/prisma";
import { getObservabilityContext } from "./context";

export type StructuredLogInput = {
  level: "debug" | "info" | "warn" | "error";
  category: string;
  message: string;
  durationMs?: number;
  metadata?: Record<string, unknown>;
  persist?: boolean;
};

export async function structuredLog(input: StructuredLogInput) {
  const context = getObservabilityContext();

  const payload = {
    timestamp: new Date().toISOString(),
    level: input.level,
    category: input.category,
    message: input.message,
    requestId: context?.requestId,
    correlationId: context?.correlationId,
    workspaceId: context?.workspaceId,
    userId: context?.userId,
    route: context?.route,
    durationMs: input.durationMs,
    metadata: input.metadata
  };

  const serialized = JSON.stringify(payload);

  if (input.level === "error") console.error(serialized);
  else if (input.level === "warn") console.warn(serialized);
  else console.log(serialized);

  if (input.persist === false) return payload;

  try {
    await prisma.runtimeLog.create({
      data: {
        workspaceId: context?.workspaceId,
        requestId: context?.requestId,
        correlationId: context?.correlationId,
        level: input.level,
        category: input.category,
        message: input.message,
        durationMs: input.durationMs,
        metadata: {
          ...input.metadata,
          userId: context?.userId,
          route: context?.route
        }
      }
    });
  } catch {
    // Logging must never crash the application.
  }

  return payload;
}
