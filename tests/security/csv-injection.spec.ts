import { describe, expect, it } from "vitest";
import { escapeCsvCell } from "@/lib/security";

describe("CSV injection protection", () => {
  for (const dangerous of ["=1+1", "+cmd", "-10+20", "@SUM(A1:A2)"]) {
    it(`neutralizes ${dangerous}`, () => {
      expect(escapeCsvCell(dangerous)).toContain("'");
    });
  }
});
