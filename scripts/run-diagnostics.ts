import { runDiagnostics } from "../src/lib/observability/diagnostics";
import { prisma } from "../src/lib/prisma";

async function main() {
  const result = await runDiagnostics();
  console.log(JSON.stringify(result, null, 2));

  if (result.status === "blocked") {
    process.exitCode = 1;
  }
}

main()
  .finally(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
