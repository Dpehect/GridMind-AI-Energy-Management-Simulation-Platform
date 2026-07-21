import { prisma } from "@/lib/prisma";
import { profileQuery } from "@/lib/performance/query-profiler";

export async function runPerformanceBenchmarks() {
  const results = [];

  results.push(
    await profileQuery(
      "buildings.list",
      () =>
        prisma.building.findMany({
          where: {
            deletedAt: null
          },
          take: 100
        })
    )
  );

  results.push(
    await profileQuery(
      "devices.list",
      () =>
        prisma.device.findMany({
          take: 1000,
          orderBy: {
            updatedAt: "desc"
          }
        })
    )
  );

  results.push(
    await profileQuery(
      "jobs.queue",
      () =>
        prisma.backgroundJob.findMany({
          where: {
            status: "queued"
          },
          take: 100
        })
    )
  );

  return results.map(
    ({ label, durationMs, result }) => ({
      label,
      durationMs,
      rows: Array.isArray(result)
        ? result.length
        : 1
    })
  );
}
