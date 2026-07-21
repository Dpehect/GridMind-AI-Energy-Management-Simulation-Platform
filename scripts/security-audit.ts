import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const dangerousPatterns = [
  { name: "eval", pattern: /\beval\s*\(/ },
  { name: "new Function", pattern: /new\s+Function\s*\(/ },
  { name: "dangerouslySetInnerHTML", pattern: /dangerouslySetInnerHTML/ },
  { name: "raw SQL unsafe", pattern: /\$executeRawUnsafe|\$queryRawUnsafe/ },
  { name: "hardcoded secret", pattern: /(password|secret|api[_-]?key)\s*[:=]\s*["'][^"']{8,}["']/i }
];

async function walk(directory: string, files: string[] = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) await walk(fullPath, files);
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry.name)) files.push(fullPath);
  }

  return files;
}

async function main() {
  const files = await walk("src");
  const findings: Array<{ file: string; rule: string }> = [];

  for (const file of files) {
    const content = await readFile(file, "utf8");

    for (const rule of dangerousPatterns) {
      if (rule.pattern.test(content)) {
        findings.push({ file, rule: rule.name });
      }
    }
  }

  console.log(JSON.stringify({ scannedFiles: files.length, findings }, null, 2));

  if (findings.some((finding) => finding.rule !== "raw SQL unsafe")) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
