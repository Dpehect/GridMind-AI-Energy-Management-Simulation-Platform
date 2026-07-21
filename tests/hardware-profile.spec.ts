import { describe, expect, it } from "vitest";
import {
  detectHardwareProfile,
  performanceFeatures
} from "@/lib/performance/hardware-profile";

describe("hardware profile", () => {
  it("detects constrained devices", () => {
    expect(
      detectHardwareProfile({
        hardwareConcurrency: 2,
        deviceMemory: 2
      })
    ).toBe("constrained");
  });

  it("disables post processing on constrained devices", () => {
    expect(
      performanceFeatures(
        "constrained"
      ).enablePostProcessing
    ).toBe(false);
  });
});
