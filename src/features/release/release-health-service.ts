import { access, readFile } from "node:fs/promises";
import path from "node:path";
import type { ReleaseHealth } from "@/lib/release-health";

export async function getReleaseHealth(): Promise<ReleaseHealth> {
  const reportPath = path.resolve("release-health.json");

  try {
    await access(reportPath);
    return JSON.parse(await readFile(reportPath, "utf8")) as ReleaseHealth;
  } catch {
    return {
      version: "unknown",
      checkedAt: new Date().toISOString(),
      status: "attention",
      checks: [
        {
          id: "release-health",
          label: "Release health report",
          status: "warn",
          detail: "Run npm run audit:release to generate release-health.json"
        }
      ]
    };
  }
}
