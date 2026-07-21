import { NextResponse } from "next/server";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const reportPath = path.resolve("release-health.json");

  try {
    await access(reportPath);
    const report = JSON.parse(await readFile(reportPath, "utf8"));
    return NextResponse.json(report);
  } catch {
    return NextResponse.json({
      version: "unknown",
      checkedAt: null,
      status: "attention",
      checks: [],
      message: "Run npm run audit:release to generate release health."
    });
  }
}
