import { describe, expect, it } from "vitest";
import { getLowStock, inventoryValue } from "./inventory-service";
describe("operations",()=>{it("detects low stock",()=>expect(getLowStock().length).toBeGreaterThan(0));it("calculates inventory value",()=>expect(inventoryValue()).toBeGreaterThan(0))});
