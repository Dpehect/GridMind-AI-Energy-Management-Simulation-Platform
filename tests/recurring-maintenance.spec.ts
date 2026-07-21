import { describe, expect, it } from "vitest";
import { calculateNextRun } from "@/features/maintenance/recurring-plan-service";

describe("recurring maintenance", () => {
  it("calculates weekly recurrence", () => {
    const next = calculateNextRun(
      new Date("2026-07-01T00:00:00Z"),
      "weekly",
      2
    );

    expect(next.toISOString()).toBe("2026-07-15T00:00:00.000Z");
  });
});
