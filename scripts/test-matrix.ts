import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

async function walk(directory: string, files: string[] = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) await walk(fullPath, files);
    else if (entry.name.endsWith(".spec.ts") || entry.name.endsWith(".spec.tsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files = await walk("tests");

  const groups = {
    unit: files.filter((file) => !file.includes("/integration/") && !file.includes("/e2e/")),
    integration: files.filter((file) => file.includes("/integration/")),
    e2e: files.filter((file) => file.includes("/e2e/")),
    security: files.filter((file) => file.includes("/security/"))
  };

  const report = {
    generatedAt: new Date().toISOString(),
    counts: Object.fromEntries(
      Object.entries(groups).map(([key, value]) => [key, value.length])
    ),
    files: groups
  };

  await writeFile("test-matrix.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
