import path from "node:path";
import { describe, expect, it } from "vitest";

function safeJoin(base: string, requested: string) {
  const target = path.resolve(base, requested);
  const normalizedBase = path.resolve(base) + path.sep;

  if (!target.startsWith(normalizedBase)) {
    throw new Error("Path traversal rejected");
  }

  return target;
}

describe("path traversal protection", () => {
  it("rejects parent directory traversal", () => {
    expect(() => safeJoin("/safe/uploads", "../../etc/passwd")).toThrow(
      /traversal/
    );
  });

  it("accepts files inside the configured directory", () => {
    expect(safeJoin("/safe/uploads", "reports/energy.pdf")).toContain(
      "/safe/uploads/reports/energy.pdf"
    );
  });
});
