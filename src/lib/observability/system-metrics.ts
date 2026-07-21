import os from "node:os";
import { statfs } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export async function collectSystemMetrics() {
  const memory = process.memoryUsage();
  const databasePath = path.resolve(
    (process.env.DATABASE_URL ?? "file:./dev.db")
      .replace(/^file:/, "")
  );

  let diskFreeBytes = 0;
  let diskTotalBytes = 0;

  try {
    const stats = await statfs(databasePath);
    diskFreeBytes = stats.bavail * stats.bsize;
    diskTotalBytes = stats.blocks * stats.bsize;
  } catch {
    // File may not exist during first boot.
  }

  const metrics = [
    {
      key: "process.heap_used",
      value: memory.heapUsed,
      unit: "bytes"
    },
    {
      key: "process.rss",
      value: memory.rss,
      unit: "bytes"
    },
    {
      key: "system.load_1m",
      value: os.loadavg()[0],
      unit: "ratio"
    },
    {
      key: "system.cpu_count",
      value: os.cpus().length,
      unit: "count"
    },
    {
      key: "disk.free",
      value: diskFreeBytes,
      unit: "bytes"
    },
    {
      key: "disk.total",
      value: diskTotalBytes,
      unit: "bytes"
    }
  ];

  await prisma.systemMetric.createMany({
    data: metrics.map((metric) => ({
      ...metric,
      capturedAt: new Date()
    }))
  });

  return metrics;
}
