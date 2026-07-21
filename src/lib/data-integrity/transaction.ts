import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { log } from "@/lib/logger";

export async function withTransaction<T>(
  label: string,
  operation: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  const started = performance.now();

  try {
    const result = await prisma.$transaction(
      async (tx) => operation(tx),
      {
        maxWait: 5_000,
        timeout: 20_000
      }
    );

    log("info", "Database transaction completed", {
      label,
      durationMs: Math.round(performance.now() - started)
    });

    return result;
  } catch (error) {
    log("error", "Database transaction failed", {
      label,
      durationMs: Math.round(performance.now() - started),
      error: error instanceof Error ? error.message : String(error)
    });

    throw error;
  }
}
