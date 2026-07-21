import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

export type ObservabilityContext = {
  requestId: string;
  correlationId: string;
  workspaceId?: string;
  userId?: string;
  route?: string;
};

const storage = new AsyncLocalStorage<ObservabilityContext>();

export function createObservabilityContext(
  input: Partial<ObservabilityContext> = {}
): ObservabilityContext {
  return {
    requestId: input.requestId ?? randomUUID(),
    correlationId: input.correlationId ?? randomUUID(),
    workspaceId: input.workspaceId,
    userId: input.userId,
    route: input.route
  };
}

export function runWithObservabilityContext<T>(
  context: ObservabilityContext,
  operation: () => T
) {
  return storage.run(context, operation);
}

export function getObservabilityContext() {
  return storage.getStore();
}
