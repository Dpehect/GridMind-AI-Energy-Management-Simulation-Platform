import { readdir } from "node:fs/promises";
import path from "node:path";

type RouteEntry = {
  route: string;
  file: string;
};

async function walk(directory: string, files: string[] = []) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath, files);
    } else if (
      /(?:page|route|manifest)\.(?:ts|tsx|js|jsx)$/.test(entry.name)
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeRoute(file: string) {
  return file
    .replace(/^src[\\/]app/, "")
    .replace(/[\\/]\([^/\\]+\)/g, "")
    .replace(/[\\/](page|route)\.(ts|tsx|js|jsx)$/, "")
    .replace(/[\\/]manifest\.(ts|js)$/, "/manifest.webmanifest")
    .replaceAll("\\", "/") || "/";
}

async function main() {
  const files = await walk(path.resolve("src/app"));
  const routes = files.map<RouteEntry>((file) => ({
    route: normalizeRoute(path.relative(process.cwd(), file)),
    file
  }));

  const groups = new Map<string, RouteEntry[]>();

  for (const entry of routes) {
    const current = groups.get(entry.route) ?? [];
    current.push(entry);
    groups.set(entry.route, current);
  }

  const duplicates = [...groups.entries()].filter(([, entries]) => entries.length > 1);

  if (duplicates.length) {
    console.error("Duplicate routes detected:");
    for (const [route, entries] of duplicates) {
      console.error(`\n${route}`);
      for (const entry of entries) console.error(`  - ${entry.file}`);
    }
    process.exit(1);
  }

  console.log(`No duplicate routes found across ${routes.length} route files.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
