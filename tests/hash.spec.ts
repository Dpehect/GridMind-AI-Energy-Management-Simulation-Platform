import { describe, expect, it } from "vitest";
import { hashObject } from "@/lib/data-integrity/hash";

describe("stable hashing", () => {
  it("produces the same hash for different key order", () => {
    expect(hashObject({ a: 1, b: 2 })).toBe(
      hashObject({ b: 2, a: 1 })
    );
  });
});
