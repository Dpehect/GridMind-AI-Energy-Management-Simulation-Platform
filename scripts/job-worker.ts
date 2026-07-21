import { processOneJob } from "../src/features/jobs/worker";
import { prisma } from "../src/lib/prisma";

async function main() {
  const maxJobs = Number(process.env.GRIDMIND_WORKER_MAX_JOBS ?? 100);

  for (let index = 0; index < maxJobs; index += 1) {
    const result = await processOneJob();

    if (!result.processed) break;
    console.log(JSON.stringify(result));
  }
}

main()
  .finally(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
