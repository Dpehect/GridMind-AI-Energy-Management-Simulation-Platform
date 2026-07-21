import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { integrationPrisma, resetIntegrationDatabase } from "./setup-database";

describe("background job persistence", () => {
  beforeEach(resetIntegrationDatabase);
  afterAll(() => integrationPrisma.$disconnect());

  it("persists failed attempt information", async () => {
    const job = await integrationPrisma.backgroundJob.create({
      data: {
        type: "test.failure",
        payload: {},
        status: "failed",
        attempts: 3,
        maxAttempts: 3,
        lastError: "Expected test failure",
        failedAt: new Date()
      }
    });

    await integrationPrisma.jobAttempt.create({
      data: {
        backgroundJobId: job.id,
        attempt: 3,
        workerId: "worker-test",
        status: "failed",
        error: "Expected test failure",
        completedAt: new Date(),
        durationMs: 120
      }
    });

    const stored = await integrationPrisma.backgroundJob.findUnique({
      where: { id: job.id },
      include: { attemptsHistory: true }
    });

    expect(stored?.status).toBe("failed");
    expect(stored?.attemptsHistory).toHaveLength(1);
  });
});
