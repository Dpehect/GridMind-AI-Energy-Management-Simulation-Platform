import { describe, expect, it } from "vitest";
import {
  decodeCursor,
  encodeCursor
} from "@/lib/pagination/cursor";

describe("cursor pagination", () => {
  it("round trips cursor values", () => {
    const encoded = encodeCursor({
      id: "reading-1",
      createdAt:
        new Date("2026-07-01T00:00:00Z")
    });

    const decoded =
      decodeCursor(encoded);

    expect(decoded?.id).toBe(
      "reading-1"
    );
    expect(
      decoded?.createdAt.toISOString()
    ).toBe(
      "2026-07-01T00:00:00.000Z"
    );
  });
});
