import { describe, expect, it } from "vitest";
import { deduplicateRows } from "@/features/imports/deduplication";

describe("import deduplication", () => {
  it("marks repeated payloads as duplicates", () => {
    const result = deduplicateRows([
      { meter: "M-1", value: 10 },
      { meter: "M-1", value: 10 }
    ]);

    expect(result[0].status).toBe("accepted");
    expect(result[1].status).toBe("duplicate");
  });
});
