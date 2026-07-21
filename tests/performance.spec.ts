import { describe, expect, it } from "vitest";
import { shouldUseReducedEffects } from "@/lib/performance";

describe("performance mode", () => {
  it("reduces effects on constrained hardware", () => {
    expect(shouldUseReducedEffects({ hardwareConcurrency: 2, deviceMemory: 2 })).toBe(true);
  });
});
