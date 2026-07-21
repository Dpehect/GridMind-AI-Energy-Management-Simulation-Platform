import { describe, expect, it } from "vitest";
import { securityHeaders } from "../src/lib/security-headers.mjs";

describe("security headers", () => {
  it("includes a content security policy", () => {
    expect(
      securityHeaders.some(
        (header) => header.key === "Content-Security-Policy"
      )
    ).toBe(true);
  });
});
