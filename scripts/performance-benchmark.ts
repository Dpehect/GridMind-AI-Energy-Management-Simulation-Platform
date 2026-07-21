import { runPerformanceBenchmarks } from "../src/features/performance/benchmark-runner";
import { prisma } from "../src/lib/prisma";

async function main() {
  const results =
    await runPerformanceBenchmarks();

  console.log(
    JSON.stringify(results, null, 2)
  );

  if (
    results.some(
      (result) =>
        result.durationMs > 1000
    )
  ) {
    process.exitCode = 1;
  }
}

main()
  .finally(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
