import { describe, expect, it } from "vitest";
import { checkEnvironment } from "@/lib/runtime/health";

describe("runtime health", () => {
  it("returns a structured environment check", async () => {
    const result = await checkEnvironment();

    expect(result).toHaveProperty("id", "environment");
    expect(["pass", "warn", "fail"]).toContain(result.status);
  });
});
