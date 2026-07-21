import { prisma } from "../src/lib/prisma";
import { verifyBackupRecord } from "../src/lib/backup/backup-service";

async function main() {
  const backups = await prisma.backupRecord.findMany({
    orderBy: { createdAt: "desc" }
  });

  for (const backup of backups) {
    const verified = await verifyBackupRecord(backup.id);
    console.log(`${verified.fileName}: ${verified.status}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
