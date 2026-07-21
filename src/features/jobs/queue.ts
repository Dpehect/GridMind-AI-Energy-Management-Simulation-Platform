import { prisma } from "@/lib/prisma";

export async function enqueueJob(input: {
  workspaceId?: string;
  type: string;
  payload: unknown;
  runAt?: Date;
  priority?: number;
  maxAttempts?: number;
  idempotencyKey?: string;
}) {
  if (input.idempotencyKey) {
    const existing = await prisma.backgroundJob.findUnique({
      where: { idempotencyKey: input.idempotencyKey }
    });

    if (existing) return existing;
  }

  return prisma.backgroundJob.create({
    data: {
      workspaceId: input.workspaceId,
      type: input.type,
      payload: input.payload as never,
      runAt: input.runAt ?? new Date(),
      priority: input.priority ?? 100,
      maxAttempts: input.maxAttempts ?? 5,
      idempotencyKey: input.idempotencyKey
    }
  });
}

export async function cancelJob(jobId: string) {
  return prisma.backgroundJob.update({
    where: { id: jobId },
    data: {
      status: "cancelled",
      lockedAt: null,
      lockedBy: null
    }
  });
}
