import { describe, expect, it } from "vitest";
import { inventoryValue } from "@/features/operations/inventory-service";

describe("persistence services", () => {
  it("exposes async inventory value calculation", () => {
    expect(typeof inventoryValue).toBe("function");
  });
});
