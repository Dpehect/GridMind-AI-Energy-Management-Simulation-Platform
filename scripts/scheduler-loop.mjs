let stopping = false;

process.on("SIGTERM", () => {
  stopping = true;
});

process.on("SIGINT", () => {
  stopping = true;
});

const intervalMs = Number(
  process.env.GRIDMIND_SCHEDULER_INTERVAL_MS ?? 60000
);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const { scheduleDueWork } = await import("../src/features/jobs/scheduler.js");

  while (!stopping) {
    try {
      const result = await scheduleDueWork();

      console.log(JSON.stringify({
        level: "info",
        category: "scheduler",
        result,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error(JSON.stringify({
        level: "error",
        category: "scheduler",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      }));
    }

    await sleep(intervalMs);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
