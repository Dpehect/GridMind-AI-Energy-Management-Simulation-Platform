import { prisma } from "@/lib/prisma";
import { getServerEnv } from "@/env/server";
import { log } from "@/lib/logger";

let completed = false;
let running: Promise<void> | null = null;

async function runChecks() {
  const env = getServerEnv();

  await prisma.$connect();
  await prisma.$queryRaw`SELECT 1`;

  log("info", "GridMind startup checks completed", {
    nodeEnv: env.NODE_ENV,
    demoUsersEnabled: env.GRIDMIND_ENABLE_DEMO_USERS
  });

  completed = true;
}

export function ensureStartupReady() {
  if (completed) return Promise.resolve();
  running ??= runChecks().catch((error) => {
    running = null;
    throw error;
  });
  return running;
}
