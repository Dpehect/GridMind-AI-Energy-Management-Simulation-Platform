import { access, readFile, writeFile } from "node:fs/promises";

type Check = {
  id: string;
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
  const schema = await readFile("prisma/schema.prisma", "utf8");

  const requiredFiles = [
    "prisma/schema.prisma",
    "next.config.mjs",
    "src/features/auth/session.ts",
    "src/features/tenancy/context.ts",
    "src/features/jobs/worker.ts",
    "src/lib/observability/context.ts",
    "Dockerfile.enterprise",
    "docker-compose.enterprise.yml",
    "playwright.config.ts"
  ];

  const requiredModels = [
    "Organization",
    "Workspace",
    "LocalUser",
    "BackgroundJob",
    "RuntimeLog",
    "ErrorIncident"
  ];

  const requiredScripts = [
    "build",
    "test",
    "test:e2e",
    "verify:enterprise",
    "preflight:production",
    "audit:security",
    "audit:compliance"
  ];

  const checks: Check[] = [];

  for (const file of requiredFiles) {
    checks.push({
      id: `file:${file}`,
      status: (await exists(file)) ? "pass" : "fail",
      detail: file
    });
  }

  for (const model of requiredModels) {
    checks.push({
      id: `model:${model}`,
      status: schema.includes(`model ${model} {`) ? "pass" : "fail",
      detail: model
    });
  }

  for (const script of requiredScripts) {
    checks.push({
      id: `script:${script}`,
      status: packageJson.scripts?.[script] ? "pass" : "fail",
      detail: packageJson.scripts?.[script] ?? "Missing"
    });
  }

  checks.push({
    id: "lockfile",
    status: (await exists("package-lock.json")) ? "pass" : "warn",
    detail: "Generate with npm install before CI or Docker build."
  });

  const status = checks.some((check) => check.status === "fail")
    ? "blocked"
    : checks.some((check) => check.status === "warn")
      ? "attention"
      : "ready";

  const report = {
    product: "GridMind Enterprise",
    version: packageJson.version,
    generatedAt: new Date().toISOString(),
    status,
    checks
  };

  await writeFile(
    "gridmind-final-release-report.json",
    JSON.stringify(report, null, 2)
  );

  console.log(JSON.stringify(report, null, 2));

  if (status === "blocked") process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
