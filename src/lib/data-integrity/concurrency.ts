import type { Prisma } from "@prisma/client";
import { ConcurrencyError } from "./errors";

export async function updateVersionedRecord<T>(input: {
  entityType: string;
  entityId: string;
  expectedUpdatedAt: Date;
  update: () => Promise<T>;
  verify: () => Promise<{ updatedAt: Date } | null>;
}) {
  const current = await input.verify();

  if (!current) {
    throw new ConcurrencyError(input.entityType, input.entityId);
  }

  if (current.updatedAt.getTime() !== input.expectedUpdatedAt.getTime()) {
    throw new ConcurrencyError(input.entityType, input.entityId);
  }

  return input.update();
}
