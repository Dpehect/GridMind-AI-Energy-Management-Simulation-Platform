import { describe, expect, it } from "vitest";

function compatible(current: number, target: number) {
  return current === target || current === 0;
}

describe("release compatibility", () => {
  it("allows same-major upgrades", () => {
    expect(compatible(1, 1)).toBe(true);
  });

  it("blocks unsupported major upgrades", () => {
    expect(compatible(1, 2)).toBe(false);
  });
});
