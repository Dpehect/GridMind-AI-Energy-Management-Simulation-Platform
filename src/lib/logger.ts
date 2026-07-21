import { randomUUID } from "node:crypto";
import { getServerEnv } from "@/env/server";

export type LogLevel = "debug" | "info" | "warn" | "error";

const order: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

function shouldLog(level: LogLevel) {
  const configured = getServerEnv().GRIDMIND_LOG_LEVEL;
  return order[level] >= order[configured];
}

export function createRequestId() {
  return randomUUID();
}

export function log(
  level: LogLevel,
  message: string,
  context: Record<string, unknown> = {}
) {
  if (!shouldLog(level)) return;

  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context
  };

  const serialized = JSON.stringify(payload);

  if (level === "error") console.error(serialized);
  else if (level === "warn") console.warn(serialized);
  else console.log(serialized);
}
