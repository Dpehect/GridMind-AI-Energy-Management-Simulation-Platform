import "server-only";
import { parseServerEnv } from "./schema";

let cached:
  | ReturnType<typeof parseServerEnv>
  | undefined;

export function getServerEnv() {
  cached ??= parseServerEnv();
  return cached;
}
