import { describe, expect, it } from "vitest";
import { hasPermission, rolePermissions } from "@/features/auth/permissions";

describe("authorization matrix", () => {
  it("prevents viewers from mutation permissions", () => {
    expect(hasPermission("viewer", "maintenance.write")).toBe(false);
    expect(hasPermission("viewer", "operations.write")).toBe(false);
    expect(hasPermission("viewer", "users.manage")).toBe(false);
  });

  it("keeps every role permission list unique", () => {
    for (const permissions of Object.values(rolePermissions)) {
      expect(new Set(permissions).size).toBe(permissions.length);
    }
  });
});
