import { scheduleDueWork } from "../src/features/jobs/scheduler";
import { prisma } from "../src/lib/prisma";

async function main() {
  const result = await scheduleDueWork();
  console.log(JSON.stringify(result, null, 2));
}

main()
  .finally(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
