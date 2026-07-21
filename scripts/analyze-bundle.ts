import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const manifestPath = path.resolve(
    ".next/build-manifest.json"
  );

  const manifest = JSON.parse(
    await readFile(manifestPath, "utf8")
  );

  const pages = Object.entries(
    manifest.pages as Record<
      string,
      string[]
    >
  ).map(([route, files]) => ({
    route,
    files,
    chunkCount: files.length
  }));

  const report = {
    generatedAt: new Date().toISOString(),
    pages,
    largestChunkCount:
      Math.max(
        ...pages.map(
          (page) => page.chunkCount
        ),
        0
      )
  };

  await writeFile(
    "bundle-analysis.json",
    JSON.stringify(report, null, 2)
  );

  console.log(
    JSON.stringify(report, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
