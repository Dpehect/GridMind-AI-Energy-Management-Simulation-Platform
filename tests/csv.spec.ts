import { describe, expect, it } from "vitest";
import { parseSimpleCsv } from "@/features/imports/csv";

describe("CSV parser", () => {
  it("supports quoted commas", () => {
    expect(parseSimpleCsv('name,value\n"North, Wing",42')).toEqual([
      ["name", "value"],
      ["North, Wing", "42"]
    ]);
  });
});
