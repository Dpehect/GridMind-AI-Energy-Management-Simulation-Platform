import { copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve(process.cwd(), process.env.GRIDMIND_DB_PATH ?? 'prisma/gridmind.db');
const targetDirectory = path.resolve(process.cwd(), 'backups');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const target = path.join(targetDirectory, `gridmind-${stamp}.db`);

await stat(source);
await mkdir(targetDirectory, { recursive: true });
await copyFile(source, target);
console.log(`Database backup created: ${target}`);
