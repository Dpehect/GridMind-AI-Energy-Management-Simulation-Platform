import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getJobHandler } from "./registry";
import { calculateBackoffMs } from "./backoff";

export async function claimNextJob(workerId = randomUUID()) {
  const candidate = await prisma.backgroundJob.findFirst({
    where: {
      status: "queued",
      runAt: { lte: new Date() },
      lockedAt: null
    },
    orderBy: [
      { priority: "asc" },
      { runAt: "asc" },
      { createdAt: "asc" }
    ]
  });

  if (!candidate) return null;

  return prisma.backgroundJob.update({
    where: {
      id: candidate.id,
      lockedAt: null,
      status: "queued"
    },
    data: {
      status: "running",
      lockedAt: new Date(),
      lockedBy: workerId,
      startedAt: new Date(),
      attempts: { increment: 1 }
    }
  }).catch(() => null);
}

export async function processOneJob(workerId = randomUUID()) {
  const job = await claimNextJob(workerId);
  if (!job) return { processed: false };

  const started = performance.now();
  const attemptNumber = job.attempts;

  const attempt = await prisma.jobAttempt.create({
    data: {
      backgroundJobId: job.id,
      attempt: attemptNumber,
      workerId,
      status: "running"
    }
  });

  try {
    const handler = getJobHandler(job.type);
    const result = await handler(job.payload, {
      jobId: job.id,
      workspaceId: job.workspaceId ?? undefined,
      attempt: attemptNumber,
      workerId
    });

    const durationMs = Math.round(performance.now() - started);

    await prisma.$transaction([
      prisma.backgroundJob.update({
        where: { id: job.id },
        data: {
          status: "completed",
          completedAt: new Date(),
          lockedAt: null,
          lockedBy: null,
          result: result as never
        }
      }),
      prisma.jobAttempt.update({
        where: { id: attempt.id },
        data: {
          status: "completed",
          completedAt: new Date(),
          durationMs
        }
      })
    ]);

    return { processed: true, jobId: job.id, status: "completed" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const durationMs = Math.round(performance.now() - started);
    const exhausted = attemptNumber >= job.maxAttempts;

    await prisma.$transaction([
      prisma.backgroundJob.update({
        where: { id: job.id },
        data: exhausted
          ? {
              status: "failed",
              failedAt: new Date(),
              lockedAt: null,
              lockedBy: null,
              lastError: message
            }
          : {
              status: "queued",
              runAt: new Date(Date.now() + calculateBackoffMs(attemptNumber)),
              lockedAt: null,
              lockedBy: null,
              lastError: message
            }
      }),
      prisma.jobAttempt.update({
        where: { id: attempt.id },
        data: {
          status: exhausted ? "failed" : "retry_scheduled",
          completedAt: new Date(),
          durationMs,
          error: message
        }
      })
    ]);

    return {
      processed: true,
      jobId: job.id,
      status: exhausted ? "failed" : "retry_scheduled"
    };
  }
}
