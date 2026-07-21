import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { getDefaultWorkspace } from "@/lib/workspace";
import { sha256File } from "./checksum";

function resolveSqlitePath(databaseUrl: string) {
  if (!databaseUrl.startsWith("file:")) {
    throw new Error("Backup service currently supports SQLite file URLs only");
  }

  return path.resolve(databaseUrl.slice("file:".length));
}

export async function createVerifiedBackup(input: {
  destinationDirectory: string;
}) {
  const workspace = await getDefaultWorkspace();
  const sourcePath = resolveSqlitePath(process.env.DATABASE_URL ?? "");
  const fileName = `gridmind-${new Date().toISOString().replaceAll(":", "-")}.db`;

  await mkdir(input.destinationDirectory, { recursive: true });

  const destinationPath = path.join(
    input.destinationDirectory,
    fileName
  );

  await prisma.$executeRawUnsafe("PRAGMA wal_checkpoint(FULL)");
  await copyFile(sourcePath, destinationPath);

  const [metadata, checksumSha256] = await Promise.all([
    stat(destinationPath),
    sha256File(destinationPath)
  ]);

  return prisma.backupRecord.create({
    data: {
      workspaceId: workspace.id,
      fileName,
      filePath: destinationPath,
      checksumSha256,
      sizeBytes: metadata.size,
      status: "verified",
      verifiedAt: new Date()
    }
  });
}

export async function verifyBackupRecord(backupId: string) {
  const backup = await prisma.backupRecord.findUnique({
    where: { id: backupId }
  });

  if (!backup) throw new Error("Backup record not found");

  const checksum = await sha256File(backup.filePath);
  const valid = checksum === backup.checksumSha256;

  return prisma.backupRecord.update({
    where: { id: backup.id },
    data: {
      status: valid ? "verified" : "corrupt",
      verifiedAt: new Date()
    }
  });
}
