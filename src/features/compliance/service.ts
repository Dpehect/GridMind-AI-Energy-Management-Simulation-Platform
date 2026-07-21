import { access, readFile } from "node:fs/promises";
import path from "node:path";
import type { ComplianceReport } from "./types";

export async function getComplianceReport(): Promise<ComplianceReport> {
  const reportPath = path.resolve("compliance-report.json");

  try {
    await access(reportPath);
    return JSON.parse(await readFile(reportPath, "utf8")) as ComplianceReport;
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      version: "unknown",
      status: "attention",
      checks: [
        {
          id: "report",
          label: "Compliance report",
          status: "warn",
          detail: "Run npm run audit:compliance"
        }
      ]
    };
  }
}
