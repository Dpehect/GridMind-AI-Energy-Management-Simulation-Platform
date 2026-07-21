import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { summarizeReleaseHealth, type ReleaseCheck } from "../src/lib/release-health";

async function exists(file: string) {
  try {
    await access(path.resolve(file));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));
  const requiredFiles = [
    ".github/workflows/ci.yml",
    "playwright.config.ts",
    "prisma/schema.prisma",
    "public/sw.js",
    "Dockerfile",
    "next.config.mjs"
  ];

  const checks: ReleaseCheck[] = [
    {
      id: "version",
      label: "Release version",
      status: packageJson.version === "1.0.0" ? "pass" : "warn",
      detail: packageJson.version
    },
    {
      id: "test-script",
      label: "Test script",
      status: packageJson.scripts?.test ? "pass" : "fail",
      detail: packageJson.scripts?.test ?? "Missing"
    },
    {
      id: "e2e-script",
      label: "E2E script",
      status: packageJson.scripts?.["test:e2e"] ? "pass" : "fail",
      detail: packageJson.scripts?.["test:e2e"] ?? "Missing"
    }
  ];

  for (const file of requiredFiles) {
    checks.push({
      id: file,
      label: file,
      status: (await exists(file)) ? "pass" : "fail",
      detail: (await exists(file)) ? "Present" : "Missing"
    });
  }

  const report = {
    version: packageJson.version,
    checkedAt: new Date().toISOString(),
    status: summarizeReleaseHealth(checks),
    checks
  };

  await writeFile("release-health.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));

  if (report.status === "blocked") process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
