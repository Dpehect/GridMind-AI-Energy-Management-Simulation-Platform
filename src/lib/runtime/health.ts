import { prisma } from "@/lib/prisma";
import { getServerEnv } from "@/env/server";

export type RuntimeCheck = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
  durationMs?: number;
};

async function timed<T>(operation: () => Promise<T>) {
  const started = performance.now();
  const value = await operation();
  return {
    value,
    durationMs: Math.round(performance.now() - started)
  };
}

export async function checkEnvironment(): Promise<RuntimeCheck> {
  try {
    const env = getServerEnv();

    return {
      id: "environment",
      label: "Environment configuration",
      status: "pass",
      detail: `${env.NODE_ENV} configuration validated`
    };
  } catch (error) {
    return {
      id: "environment",
      label: "Environment configuration",
      status: "fail",
      detail: error instanceof Error ? error.message : "Invalid configuration"
    };
  }
}

export async function checkDatabase(): Promise<RuntimeCheck> {
  try {
    const result = await timed(async () => {
      await prisma.$queryRaw`SELECT 1`;
    });

    return {
      id: "database",
      label: "Database connectivity",
      status: result.durationMs > 500 ? "warn" : "pass",
      detail: `SQLite query completed in ${result.durationMs} ms`,
      durationMs: result.durationMs
    };
  } catch (error) {
    return {
      id: "database",
      label: "Database connectivity",
      status: "fail",
      detail: error instanceof Error ? error.message : "Database unavailable"
    };
  }
}

export async function getRuntimeHealth() {
  const checks = await Promise.all([
    checkEnvironment(),
    checkDatabase()
  ]);

  const status = checks.some((check) => check.status === "fail")
    ? "blocked"
    : checks.some((check) => check.status === "warn")
      ? "attention"
      : "ready";

  return {
    status,
    checkedAt: new Date().toISOString(),
    checks
  };
}
