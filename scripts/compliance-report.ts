import { access, readFile, writeFile } from "node:fs/promises";

type Check = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
};

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));

  const requiredFiles = [
    "prisma/schema.prisma",
    "src/features/auth/session.ts",
    "src/features/tenancy/context.ts",
    "src/lib/observability/context.ts",
    "src/features/jobs/worker.ts",
    "playwright.config.ts",
    ".github/workflows/ci.yml"
  ];

  const checks: Check[] = [];

  for (const file of requiredFiles) {
    const present = await exists(file);
    checks.push({
      id: file,
      label: file,
      status: present ? "pass" : "fail",
      detail: present ? "Present" : "Missing"
    });
  }

  checks.push({
    id: "unit-tests",
    label: "Unit test script",
    status: packageJson.scripts?.test ? "pass" : "fail",
    detail: packageJson.scripts?.test ?? "Missing"
  });

  checks.push({
    id: "e2e-tests",
    label: "E2E test script",
    status: packageJson.scripts?.["test:e2e"] ? "pass" : "fail",
    detail: packageJson.scripts?.["test:e2e"] ?? "Missing"
  });

  const status = checks.some((check) => check.status === "fail")
    ? "blocked"
    : checks.some((check) => check.status === "warn")
      ? "attention"
      : "ready";

  const report = {
    generatedAt: new Date().toISOString(),
    version: packageJson.version,
    status,
    frameworks: {
      security: "OWASP-inspired application controls",
      accessibility: "WCAG 2.2 AA target",
      auditability: "Persistent activity and security events"
    },
    checks
  };

  await writeFile(
    "compliance-report.json",
    JSON.stringify(report, null, 2)
  );

  console.log(JSON.stringify(report, null, 2));

  if (status === "blocked") process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
