export type AppErrorCode =
  | "VALIDATION_ERROR"
  | "AUTHENTICATION_REQUIRED"
  | "PERMISSION_DENIED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "DATABASE_UNAVAILABLE"
  | "CONFIGURATION_ERROR"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status: number;
  readonly expose: boolean;
  readonly metadata?: Record<string, unknown>;

  constructor(input: {
    message: string;
    code?: AppErrorCode;
    status?: number;
    expose?: boolean;
    cause?: unknown;
    metadata?: Record<string, unknown>;
  }) {
    super(input.message, { cause: input.cause });
    this.name = "AppError";
    this.code = input.code ?? "INTERNAL_ERROR";
    this.status = input.status ?? 500;
    this.expose = input.expose ?? this.status < 500;
    this.metadata = input.metadata;
  }
}

export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) return error;

  if (error instanceof Error) {
    return new AppError({
      message: error.message,
      code: "INTERNAL_ERROR",
      status: 500,
      expose: false,
      cause: error
    });
  }

  return new AppError({
    message: "An unexpected error occurred.",
    code: "INTERNAL_ERROR",
    status: 500,
    expose: false,
    metadata: { original: String(error) }
  });
}
