import { describe, expect, it } from "vitest";
import { parseServerEnv } from "@/env/schema";

describe("environment validation", () => {
  it("accepts a valid development environment", () => {
    expect(
      parseServerEnv({
        NODE_ENV: "development",
        DATABASE_URL: "file:./dev.db",
        GRIDMIND_ENABLE_DEMO_USERS: "true"
      })
    ).toMatchObject({
      NODE_ENV: "development",
      DATABASE_URL: "file:./dev.db"
    });
  });

  it("rejects demo users in production", () => {
    expect(() =>
      parseServerEnv({
        NODE_ENV: "production",
        DATABASE_URL: "file:./prod.db",
        GRIDMIND_ENABLE_DEMO_USERS: "true"
      })
    ).toThrow(/must be false in production/);
  });
});
