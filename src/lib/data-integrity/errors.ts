import { AppError } from "@/lib/errors/app-error";

export class ConcurrencyError extends AppError {
  constructor(entityType: string, entityId: string) {
    super({
      message: `${entityType} ${entityId} was modified by another user.`,
      code: "CONFLICT",
      status: 409,
      expose: true,
      metadata: { entityType, entityId }
    });
  }
}

export class DuplicateImportError extends AppError {
  constructor(fileHash: string) {
    super({
      message: "This import file has already been processed.",
      code: "CONFLICT",
      status: 409,
      expose: true,
      metadata: { fileHash }
    });
  }
}
