import { normalizeError } from "./app-error";

export function toPublicError(error: unknown) {
  const normalized = normalizeError(error);

  return {
    code: normalized.code,
    message: normalized.expose
      ? normalized.message
      : "The operation could not be completed.",
    status: normalized.status
  };
}
