import { describe, expect, it } from "vitest";
import { escapeCsvCell } from "@/lib/security";

describe("CSV security", () => {
  it("neutralizes formula injection", () => {
    expect(escapeCsvCell("=SUM(A1:A2)")).toContain("'=");
  });
});
