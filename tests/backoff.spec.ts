import { describe, expect, it } from "vitest";
import { calculateBackoffMs } from "@/features/jobs/backoff";

describe("job backoff", () => {
  it("increases with attempt count", () => {
    expect(calculateBackoffMs(3, 1000, 60000)).toBeGreaterThanOrEqual(4000);
  });
});
