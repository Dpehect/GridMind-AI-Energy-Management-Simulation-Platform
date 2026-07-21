import { describe, expect, it } from "vitest";
import { normalizePageSize } from "@/lib/pagination/page-size";

describe("page size", () => {
  it("caps large values", () => {
    expect(
      normalizePageSize(5000, {
        maxSize: 250
      })
    ).toBe(250);
  });

  it("uses defaults for invalid values", () => {
    expect(
      normalizePageSize("invalid")
    ).toBe(50);
  });
});
