import { describe, expect, it } from "vitest";
import { releaseConfig } from "@/lib/release-config";

describe("release config", () => {
  it("requires no external API key", () => {
    expect(releaseConfig.externalApiKeysRequired).toBe(false);
  });
});
