import { enforceLogRetention } from "../src/lib/observability/log-retention";
import { prisma } from "../src/lib/prisma";

async function main() {
  const result = await enforceLogRetention({
    runtimeLogDays: Number(
      process.env.GRIDMIND_RUNTIME_LOG_DAYS ?? 30
    ),
    metricDays: Number(
      process.env.GRIDMIND_METRIC_DAYS ?? 14
    ),
    diagnosticDays: Number(
      process.env.GRIDMIND_DIAGNOSTIC_DAYS ?? 90
    )
  });

  console.log(JSON.stringify(result, null, 2));
}

main()
  .finally(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
