import { copyFile, stat } from 'node:fs/promises';
import path from 'node:path';

const requested = process.argv[2];
if (!requested) throw new Error('Usage: npm run db:restore -- backups/gridmind-<timestamp>.db');
const source = path.resolve(process.cwd(), requested);
const target = path.resolve(process.cwd(), process.env.GRIDMIND_DB_PATH ?? 'prisma/gridmind.db');
await stat(source);
await copyFile(source, target);
console.log(`Database restored from: ${source}`);
