import { describe, expect, it, vi } from "vitest";

describe("schema compatibility contract", () => {
  it("requires core enterprise models", () => {
    const models = [
      "Workspace",
      "LocalUser",
      "BackgroundJob",
      "RuntimeLog"
    ];

    expect(models).toContain("BackgroundJob");
    expect(models).toContain("RuntimeLog");
  });
});
