import { describe, expect, it } from "vitest";
import { validatePasswordPolicy } from "@/features/auth/security-policy";

describe("password policy", () => {
  it("rejects weak passwords", () => {
    expect(validatePasswordPolicy("password").valid).toBe(false);
  });

  it("accepts enterprise passwords", () => {
    expect(
      validatePasswordPolicy("GridMindSecure2026!").valid
    ).toBe(true);
  });
});
