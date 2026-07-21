import { spawnSync } from "node:child_process";

const commands = [
  ["npm", ["run", "env:validate"]],
  ["npm", ["run", "audit:schema"]],
  ["npm", ["run", "check:routes"]],
  ["npm", ["run", "check:imports"]],
  ["npm", ["run", "typecheck"]],
  ["npm", ["run", "lint"]],
  ["npm", ["run", "test"]],
  ["npm", ["run", "build"]],
  ["npm", ["run", "audit:security"]],
  ["npm", ["run", "audit:compliance"]],
  ["npm", ["run", "preflight:production"]],
  ["npm", ["run", "release:validate"]]
] as const;

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32"
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
