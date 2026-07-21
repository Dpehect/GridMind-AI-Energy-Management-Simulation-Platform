import { readFile, writeFile } from "node:fs/promises";

const requiredIndexes = [
  "@@index([meterId, capturedAt])",
  "@@index([buildingId, status, priority])",
  "@@index([status, runAt, priority])",
  "@@index([workspaceId, level, createdAt])"
];

async function main() {
  const schema = await readFile(
    "prisma/schema.prisma",
    "utf8"
  );

  const checks = requiredIndexes.map(
    (index) => ({
      index,
      present:
        schema.includes(index)
    })
  );

  await writeFile(
    "index-audit.json",
    JSON.stringify(
      {
        generatedAt:
          new Date().toISOString(),
        checks
      },
      null,
      2
    )
  );

  console.log(
    JSON.stringify(checks, null, 2)
  );

  if (
    checks.some(
      (check) => !check.present
    )
  ) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
