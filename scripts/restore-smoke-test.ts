import { copyFile, mkdtemp, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { sha256File } from "../src/lib/backup/checksum";

async function main() {
  const source = process.argv[2];

  if (!source) {
    throw new Error("Usage: npm run db:test-restore -- /path/to/backup.db");
  }

  const tempDirectory = await mkdtemp(
    path.join(os.tmpdir(), "gridmind-restore-")
  );
  const restored = path.join(tempDirectory, "restored.db");

  try {
    await copyFile(source, restored);

    const [metadata, checksum] = await Promise.all([
      stat(restored),
      sha256File(restored)
    ]);

    if (metadata.size <= 0) {
      throw new Error("Restored backup is empty");
    }

    console.log(
      JSON.stringify(
        {
          restored: true,
          sizeBytes: metadata.size,
          checksum
        },
        null,
        2
      )
    );
  } finally {
    await rm(tempDirectory, {
      recursive: true,
      force: true
    });
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
