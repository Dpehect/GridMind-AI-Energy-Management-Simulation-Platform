export type ReadingImportRow = {
  meterSerial: string;
  capturedAt: string;
  value: number;
  quality: number;
  source: "csv" | "manual" | "demo";
};

export type ReadingImportIssue = {
  row: number;
  field: string;
  message: string;
  severity: "error" | "warning";
};

export type ReadingImportPreview = {
  rows: ReadingImportRow[];
  issues: ReadingImportIssue[];
  validRows: number;
  rejectedRows: number;
  qualityScore: number;
};
