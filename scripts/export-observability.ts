import { writeFile } from "node:fs/promises";
import { prisma } from "../src/lib/prisma";

async function main() {
  const [logs, incidents, diagnostics] =
    await Promise.all([
      prisma.runtimeLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 5000
      }),
      prisma.errorIncident.findMany({
        orderBy: { lastSeenAt: "desc" }
      }),
      prisma.diagnosticRun.findMany({
        orderBy: { createdAt: "desc" },
        take: 100
      })
    ]);

  const output = {
    exportedAt: new Date().toISOString(),
    logs,
    incidents,
    diagnostics
  };

  await writeFile(
    "gridmind-observability-export.json",
    JSON.stringify(output, null, 2)
  );
}

main()
  .finally(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
