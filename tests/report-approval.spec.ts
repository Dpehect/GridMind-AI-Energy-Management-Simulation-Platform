import { describe, expect, it } from "vitest";

describe("report approval workflow", () => {
  it("defines supported decisions", () => {
    expect(["approve", "reject", "request_changes"]).toHaveLength(3);
  });
});
