import { hashObject } from "@/lib/data-integrity/hash";
import type { ImportRowResult } from "./types";

export function deduplicateRows<T>(rows: T[]): ImportRowResult<T>[] {
  const seen = new Set<string>();

  return rows.map((payload, index) => {
    const rowHash = hashObject(payload);

    if (seen.has(rowHash)) {
      return {
        rowNumber: index + 1,
        status: "duplicate",
        payload
      };
    }

    seen.add(rowHash);

    return {
      rowNumber: index + 1,
      status: "accepted",
      payload
    };
  });
}
