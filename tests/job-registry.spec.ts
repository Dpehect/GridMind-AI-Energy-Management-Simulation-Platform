import { describe, expect, it } from "vitest";
import { getJobHandler } from "@/features/jobs/registry";

describe("job registry", () => {
  it("resolves known job types", () => {
    expect(typeof getJobHandler("report.generate_scheduled")).toBe("function");
  });
});
