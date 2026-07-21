import { describe, expect, it } from "vitest";
import { summarizeReleaseHealth } from "@/lib/release-health";

describe("release health", () => {
  it("blocks release when a check fails", () => {
    expect(
      summarizeReleaseHealth([
        { id: "1", label: "Build", status: "fail", detail: "Failed" }
      ])
    ).toBe("blocked");
  });

  it("marks attention when only warnings exist", () => {
    expect(
      summarizeReleaseHealth([
        { id: "1", label: "Coverage", status: "warn", detail: "Below target" }
      ])
    ).toBe("attention");
  });
});
