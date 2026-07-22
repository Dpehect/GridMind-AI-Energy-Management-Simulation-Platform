import { spawnSync } from "node:child_process";

const steps = [
  ["npm", ["run", "db:generate"]],
  ["npm", ["run", "db:push"]],
  ["npm", ["run", "db:seed"]],
  ["npm", ["run", "db:seed:auth"]],
  ["npm", ["run", "db:seed:tenancy"]],
  ["npm", ["run", "db:seed:workflows"]]
] as const;

for (const [command, args] of steps) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32"
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
