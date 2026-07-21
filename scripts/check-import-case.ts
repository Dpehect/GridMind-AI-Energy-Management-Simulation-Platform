import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const extensions = [".ts", ".tsx", ".js", ".jsx", ".mjs"];

async function walk(directory: string, files: string[] = []) {
  for (const entry of await readdir(directory)) {
    const fullPath = path.join(directory, entry);
    const metadata = await stat(fullPath);

    if (metadata.isDirectory()) {
      await walk(fullPath, files);
    } else if (extensions.includes(path.extname(entry))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function existsWithExactCase(filePath: string) {
  const parent = path.dirname(filePath);
  const target = path.basename(filePath);

  try {
    return (await readdir(parent)).includes(target);
  } catch {
    return false;
  }
}

async function resolveImport(fromFile: string, specifier: string) {
  if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return null;

  const base = specifier.startsWith("@/")
    ? path.resolve("src", specifier.slice(2))
    : path.resolve(path.dirname(fromFile), specifier);

  const candidates = [
    base,
    ...extensions.map((extension) => `${base}${extension}`),
    ...extensions.map((extension) => path.join(base, `index${extension}`))
  ];

  for (const candidate of candidates) {
    if (await existsWithExactCase(candidate)) return candidate;
  }

  return false;
}

async function main() {
  const files = await walk(path.resolve("src"));
  const failures: string[] = [];
  const importPattern =
    /(?:from\s+|import\s*\()\s*["']([^"']+)["']/g;

  for (const file of files) {
    const source = await readFile(file, "utf8");

    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1];
      const resolved = await resolveImport(file, specifier);

      if (resolved === false) {
        failures.push(
          `${path.relative(process.cwd(), file)} -> ${specifier}`
        );
      }
    }
  }

  if (failures.length) {
    console.error("Unresolved or case-sensitive imports detected:");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }

  console.log(`Import casing verified across ${files.length} source files.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
