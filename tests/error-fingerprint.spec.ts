import { describe, expect, it } from "vitest";
import { createErrorFingerprint } from "@/lib/observability/error-fingerprint";

describe("error fingerprint", () => {
  it("groups equivalent stacks", () => {
    const left = createErrorFingerprint({
      code: "INTERNAL_ERROR",
      message: "Failure",
      stack: "Error\n at file.ts:10:5"
    });
    const right = createErrorFingerprint({
      code: "INTERNAL_ERROR",
      message: "Failure",
      stack: "Error\n at file.ts:99:30"
    });

    expect(left).toBe(right);
  });
});
