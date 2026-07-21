import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/features/auth/password";
import { hasPermission } from "@/features/auth/permissions";

describe("local authentication", () => {
  it("hashes and verifies passwords", () => {
    const hash = hashPassword("GridMindSecure123!");
    expect(hash).not.toContain("GridMindSecure123!");
    expect(verifyPassword("GridMindSecure123!", hash)).toBe(true);
    expect(verifyPassword("wrong-password", hash)).toBe(false);
  });

  it("enforces role permissions", () => {
    expect(hasPermission("admin", "users.manage")).toBe(true);
    expect(hasPermission("viewer", "users.manage")).toBe(false);
    expect(hasPermission("facility_manager", "maintenance.write")).toBe(true);
  });
});
