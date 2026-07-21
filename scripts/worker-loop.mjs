let stopping = false;

process.on("SIGTERM", () => {
  stopping = true;
  console.log(JSON.stringify({
    level: "info",
    message: "Worker shutdown requested",
    timestamp: new Date().toISOString()
  }));
});

process.on("SIGINT", () => {
  stopping = true;
});

const idleMs = Number(process.env.GRIDMIND_WORKER_IDLE_MS ?? 5000);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const { processOneJob } = await import("../src/features/jobs/worker.js");

  while (!stopping) {
    const result = await processOneJob();

    if (!result.processed) {
      await sleep(idleMs);
    }
  }

  console.log(JSON.stringify({
    level: "info",
    message: "Worker stopped gracefully",
    timestamp: new Date().toISOString()
  }));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
