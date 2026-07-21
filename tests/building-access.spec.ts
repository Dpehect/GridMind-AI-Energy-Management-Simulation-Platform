import { describe, expect, it } from "vitest";

describe("building access levels", () => {
  const rank = {
    read: 1,
    operate: 2,
    manage: 3
  };

  it("allows manage access to satisfy read", () => {
    expect(rank.manage).toBeGreaterThanOrEqual(rank.read);
  });

  it("does not allow read access to satisfy operate", () => {
    expect(rank.read).toBeLessThan(rank.operate);
  });
});
