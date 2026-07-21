import { describe, expect, it } from "vitest";
import { pearson } from "./math";
import { optimizePortfolio, optimizationActions } from "./optimization-engine";
describe("analytics math",()=>{it("returns strong positive correlation",()=>{expect(pearson([1,2,3],[2,4,6])).toBeCloseTo(1)});it("respects optimization budget",()=>{expect(optimizePortfolio(optimizationActions,20000).spent).toBeLessThanOrEqual(20000)})});
