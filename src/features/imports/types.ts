export type ImportRowResult<T> = {
  rowNumber: number;
  status: "accepted" | "rejected" | "duplicate";
  payload: T;
  error?: string;
};

export type ImportSummary = {
  totalRows: number;
  acceptedRows: number;
  rejectedRows: number;
  duplicateRows: number;
};
