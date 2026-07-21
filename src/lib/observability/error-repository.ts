import { prisma } from "@/lib/prisma";
import { getObservabilityContext } from "./context";
import { createErrorFingerprint } from "./error-fingerprint";

export async function recordErrorIncident(input: {
  code: string;
  message: string;
  stack?: string;
  route?: string;
  metadata?: Record<string, unknown>;
}) {
  const context = getObservabilityContext();
  const fingerprint = createErrorFingerprint(input);

  return prisma.errorIncident.upsert({
    where: { fingerprint },
    update: {
      occurrences: { increment: 1 },
      lastSeenAt: new Date(),
      requestId: context?.requestId,
      correlationId: context?.correlationId,
      workspaceId: context?.workspaceId,
      actorId: context?.userId,
      metadata: input.metadata
    },
    create: {
      fingerprint,
      code: input.code,
      message: input.message,
      stack: input.stack,
      route: input.route ?? context?.route,
      requestId: context?.requestId,
      correlationId: context?.correlationId,
      workspaceId: context?.workspaceId,
      actorId: context?.userId,
      metadata: input.metadata
    }
  });
}
