import { describe, expect, it } from "vitest";
import {
  createCsrfToken,
  verifyCsrfToken
} from "@/features/auth/csrf";

describe("csrf tokens", () => {
  it("verifies generated tokens", () => {
    const token = createCsrfToken("session-1");
    expect(verifyCsrfToken("session-1", token)).toBe(true);
  });

  it("rejects tokens from another session", () => {
    const token = createCsrfToken("session-1");
    expect(verifyCsrfToken("session-2", token)).toBe(false);
  });
});
