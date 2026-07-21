import { readFile } from "node:fs/promises";

const requiredModels = [
  "Organization",
  "Workspace",
  "LocalUser",
  "BackgroundJob",
  "RuntimeLog",
  "ErrorIncident",
  "InventoryMovement",
  "RecurringMaintenancePlan"
];

async function main() {
  const schema = await readFile("prisma/schema.prisma", "utf8");

  const results = requiredModels.map((model) => ({
    model,
    present: schema.includes(`model ${model} {`)
  }));

  console.log(JSON.stringify(results, null, 2));

  if (results.some((item) => !item.present)) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
