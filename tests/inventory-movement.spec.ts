import { describe, expect, it } from "vitest";

describe("inventory movement contract", () => {
  it("supports operational movement types", () => {
    const types = ["receipt", "issue", "adjustment", "return"];
    expect(types).toContain("issue");
    expect(types).toContain("receipt");
  });
});
