import { prisma } from "@/lib/prisma";
import { structuredLog } from "@/lib/observability/logger";

let registered = false;
let shuttingDown = false;

export function registerGracefulShutdown() {
  if (registered) return;
  registered = true;

  const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;

    await structuredLog({
      level: "info",
      category: "system.shutdown",
      message: `Shutdown requested by ${signal}`,
      persist: false
    });

    const timeout = setTimeout(() => {
      process.exit(1);
    }, 25_000);

    timeout.unref();

    try {
      await prisma.$disconnect();

      await structuredLog({
        level: "info",
        category: "system.shutdown",
        message: "Database disconnected cleanly",
        persist: false
      });

      clearTimeout(timeout);
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}
