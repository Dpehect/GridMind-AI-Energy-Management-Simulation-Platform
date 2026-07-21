import { createHash } from "node:crypto";

export function sha256(value: string | Buffer) {
  return createHash("sha256").update(value).digest("hex");
}

export function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, nested]) => `${JSON.stringify(key)}:${stableJson(nested)}`);

    return `{${entries.join(",")}}`;
  }

  return JSON.stringify(value);
}

export function hashObject(value: unknown) {
  return sha256(stableJson(value));
}
