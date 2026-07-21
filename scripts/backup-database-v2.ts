import { createVerifiedBackup } from "../src/lib/backup/backup-service";

async function main() {
  const backup = await createVerifiedBackup({
    destinationDirectory: process.env.GRIDMIND_BACKUP_DIR ?? "./backups"
  });

  console.log(JSON.stringify(backup, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
