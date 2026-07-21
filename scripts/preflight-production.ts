import { access, readFile } from "node:fs/promises";
import { parseServerEnv } from "../src/env/schema";
import { verifySchemaCompatibility } from "../src/lib/deployment/migration-guard";
import { prisma } from "../src/lib/prisma";

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const env = parseServerEnv({
    ...process.env,
    NODE_ENV: "production"
  });

  const required = [
    "package.json",
    "prisma/schema.prisma",
    "next.config.mjs",
    "Dockerfile.enterprise",
    "docker-compose.enterprise.yml"
  ];

  const checks = [];

  for (const file of required) {
    checks.push({
      id: file,
      status: (await exists(file)) ? "pass" : "fail"
    });
  }

  checks.push({
    id: "environment",
    status: env.GRIDMIND_ENABLE_DEMO_USERS === "false" ? "pass" : "fail"
  });

  await verifySchemaCompatibility();

  const report = {
    checkedAt: new Date().toISOString(),
    checks
  };

  console.log(JSON.stringify(report, null, 2));

  if (checks.some(check => check.status === "fail")) {
    process.exitCode = 1;
  }
}

main()
  .finally(() => prisma.$disconnect())
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
