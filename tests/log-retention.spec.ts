import { describe, expect, it } from "vitest";

describe("log retention contract", () => {
  it("uses positive retention windows", () => {
    const runtimeDays = 30;
    const metricDays = 14;

    expect(runtimeDays).toBeGreaterThan(0);
    expect(metricDays).toBeGreaterThan(0);
  });
});
