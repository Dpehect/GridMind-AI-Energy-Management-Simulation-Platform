import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

let stopping = false;

process.on("SIGTERM", () => {
  stopping = true;
});

process.on("SIGINT", () => {
  stopping = true;
});

const intervalMs = Number(
  process.env.GRIDMIND_BACKUP_INTERVAL_MS ?? 86400000
);
const retentionDays = Number(
  process.env.GRIDMIND_BACKUP_RETENTION_DAYS ?? 14
);
const backupDir = process.env.GRIDMIND_BACKUP_DIR ?? "/backups";

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function rotateBackups() {
  const cutoff = Date.now() - retentionDays * 86400000;
  const files = await readdir(backupDir);

  for (const file of files) {
    if (!file.endsWith(".db")) continue;

    const fullPath = path.join(backupDir, file);
    const metadata = await stat(fullPath);

    if (metadata.mtimeMs < cutoff) {
      await unlink(fullPath);
    }
  }
}

async function main() {
  const { createVerifiedBackup } = await import(
    "../src/lib/backup/backup-service.js"
  );

  while (!stopping) {
    try {
      const backup = await createVerifiedBackup({
        destinationDirectory: backupDir
      });

      await rotateBackups();

      console.log(JSON.stringify({
        level: "info",
        category: "backup",
        backupId: backup.id,
        fileName: backup.fileName,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error(JSON.stringify({
        level: "error",
        category: "backup",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      }));
    }

    await sleep(intervalMs);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
