import { copyFile, rename, stat } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { sha256File } from "./checksum";

function resolveSqlitePath(databaseUrl: string) {
  if (!databaseUrl.startsWith("file:")) {
    throw new Error("Restore service currently supports SQLite file URLs only");
  }

  return path.resolve(databaseUrl.slice("file:".length));
}

export async function restoreVerifiedBackup(backupId: string) {
  const backup = await prisma.backupRecord.findUnique({
    where: { id: backupId }
  });

  if (!backup) throw new Error("Backup record not found");

  const checksum = await sha256File(backup.filePath);
  if (checksum !== backup.checksumSha256) {
    throw new Error("Backup checksum verification failed");
  }

  const target = resolveSqlitePath(process.env.DATABASE_URL ?? "");
  const previous = `${target}.before-restore-${Date.now()}`;

  await prisma.$disconnect();
  await rename(target, previous);
  await copyFile(backup.filePath, target);

  const restored = await stat(target);

  return {
    restored: true,
    target,
    previous,
    restoredBytes: restored.size
  };
}
