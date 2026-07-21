import { readFile } from "node:fs/promises";

function parseVersion(version: string) {
  const [major, minor, patch] = version.split(".").map(Number);

  return {
    major: major ?? 0,
    minor: minor ?? 0,
    patch: patch ?? 0
  };
}

async function main() {
  const packageJson = JSON.parse(
    await readFile("package.json", "utf8")
  );

  const current = parseVersion(
    process.env.GRIDMIND_CURRENT_VERSION ?? packageJson.version
  );
  const target = parseVersion(packageJson.version);

  const compatible =
    current.major === target.major ||
    current.major === 0;

  const result = {
    current,
    target,
    compatible,
    requiresBackup: true,
    requiresMigration: true
  };

  console.log(JSON.stringify(result, null, 2));

  if (!compatible) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
