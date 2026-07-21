import { prisma } from "@/lib/prisma";
import { hashObject, sha256 } from "@/lib/data-integrity/hash";
import { DuplicateImportError } from "@/lib/data-integrity/errors";
import { withTransaction } from "@/lib/data-integrity/transaction";
import type { ImportRowResult, ImportSummary } from "./types";

export async function createImportJob(input: {
  workspaceId: string;
  fileName: string;
  fileContent: string;
}) {
  const fileHash = sha256(input.fileContent);

  const existing = await prisma.importJob.findUnique({
    where: {
      workspaceId_fileHash: {
        workspaceId: input.workspaceId,
        fileHash
      }
    }
  });

  if (existing) throw new DuplicateImportError(fileHash);

  return prisma.importJob.create({
    data: {
      workspaceId: input.workspaceId,
      fileName: input.fileName,
      fileHash,
      status: "pending"
    }
  });
}

export async function persistImportRows<T>(input: {
  importJobId: string;
  rows: ImportRowResult<T>[];
}) {
  const summary: ImportSummary = {
    totalRows: input.rows.length,
    acceptedRows: input.rows.filter((row) => row.status === "accepted").length,
    rejectedRows: input.rows.filter((row) => row.status === "rejected").length,
    duplicateRows: input.rows.filter((row) => row.status === "duplicate").length
  };

  return withTransaction("import.persist_rows", async (tx) => {
    await tx.importRow.createMany({
      data: input.rows.map((row) => ({
        importJobId: input.importJobId,
        rowNumber: row.rowNumber,
        rowHash: hashObject(row.payload),
        status: row.status,
        payload: row.payload as never,
        error: row.error
      }))
    });

    return tx.importJob.update({
      where: { id: input.importJobId },
      data: {
        status: summary.rejectedRows > 0 ? "completed_with_errors" : "completed",
        totalRows: summary.totalRows,
        acceptedRows: summary.acceptedRows,
        rejectedRows: summary.rejectedRows,
        duplicateRows: summary.duplicateRows,
        completedAt: new Date()
      }
    });
  });
}
