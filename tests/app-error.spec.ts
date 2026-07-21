import { describe, expect, it } from "vitest";
import { AppError, normalizeError } from "@/lib/errors/app-error";
import { toPublicError } from "@/lib/errors/public-error";

describe("application errors", () => {
  it("preserves explicit app errors", () => {
    const error = new AppError({
      message: "Record not found",
      code: "NOT_FOUND",
      status: 404
    });

    expect(normalizeError(error)).toBe(error);
  });

  it("hides internal error messages", () => {
    const publicError = toPublicError(new Error("database path leaked"));

    expect(publicError.message).not.toContain("database path");
    expect(publicError.status).toBe(500);
  });
});
