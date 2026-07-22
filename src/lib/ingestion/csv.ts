import { z } from "zod";
import type { ReadingImportIssue, ReadingImportPreview, ReadingImportRow } from "./types";

const readingSchema = z.object({
  meterSerial: z.string().trim().min(3, "Meter serial is required"),
  capturedAt: z.string().datetime({ offset: true }),
  value: z.coerce.number().finite().nonnegative(),
  quality: z.coerce.number().min(0).max(1).default(1),
  source: z.enum(["csv", "manual", "demo"]).default("csv")
});

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') { current += '"'; i += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === "," && !quoted) { cells.push(current.trim()); current = ""; continue; }
    current += char;
  }
  cells.push(current.trim());
  return cells;
}

export function parseReadingCsv(input: string): ReadingImportPreview {
  const normalized = input.replace(/^\uFEFF/, "").trim();
  if (!normalized) return { rows: [], issues: [{ row: 0, field: "file", message: "CSV file is empty", severity: "error" }], validRows: 0, rejectedRows: 0, qualityScore: 0 };
  const lines = normalized.split(/\r?\n/).filter(Boolean);
  const headers = splitCsvLine(lines[0]).map((header) => header.toLowerCase().replace(/[^a-z]/g, ""));
  const aliases: Record<string, string[]> = {
    meterSerial: ["meterserial", "serial", "meter", "serialnumber"],
    capturedAt: ["capturedat", "timestamp", "date", "datetime"],
    value: ["value", "reading", "consumption", "kwh"],
    quality: ["quality", "confidence"]
  };
  const indexOf = (field: keyof typeof aliases) => headers.findIndex((header) => aliases[field].includes(header));
  const indexes = { meterSerial: indexOf("meterSerial"), capturedAt: indexOf("capturedAt"), value: indexOf("value"), quality: indexOf("quality") };
  const issues: ReadingImportIssue[] = [];
  for (const [field, index] of Object.entries(indexes)) if (field !== "quality" && index < 0) issues.push({ row: 1, field, message: `Missing required ${field} column`, severity: "error" });
  if (issues.length) return { rows: [], issues, validRows: 0, rejectedRows: Math.max(0, lines.length - 1), qualityScore: 0 };
  const rows: ReadingImportRow[] = [];
  const seen = new Set<string>();
  lines.slice(1).forEach((line, offset) => {
    const rowNumber = offset + 2;
    const cells = splitCsvLine(line);
    const candidate = {
      meterSerial: cells[indexes.meterSerial],
      capturedAt: cells[indexes.capturedAt],
      value: cells[indexes.value],
      quality: indexes.quality >= 0 ? cells[indexes.quality] || 1 : 1,
      source: "csv" as const
    };
    const parsed = readingSchema.safeParse(candidate);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => issues.push({ row: rowNumber, field: issue.path.join(".") || "row", message: issue.message, severity: "error" }));
      return;
    }
    const duplicateKey = `${parsed.data.meterSerial}:${parsed.data.capturedAt}`;
    if (seen.has(duplicateKey)) { issues.push({ row: rowNumber, field: "capturedAt", message: "Duplicate meter timestamp in this file", severity: "warning" }); return; }
    seen.add(duplicateKey);
    rows.push(parsed.data);
  });
  const total = Math.max(1, lines.length - 1);
  const rejectedRows = total - rows.length;
  const qualityScore = Math.max(0, Math.round((rows.length / total) * 100 - issues.filter((issue) => issue.severity === "warning").length * 2));
  return { rows, issues, validRows: rows.length, rejectedRows, qualityScore };
}

export { readingSchema };
