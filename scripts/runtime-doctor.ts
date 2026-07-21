import { getRuntimeHealth } from "../src/lib/runtime/health";

async function main() {
  const health = await getRuntimeHealth();
  console.log(JSON.stringify(health, null, 2));

  if (health.status === "blocked") {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
