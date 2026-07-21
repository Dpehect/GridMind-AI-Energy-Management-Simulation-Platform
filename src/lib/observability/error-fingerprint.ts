import { createHash } from "node:crypto";

export function createErrorFingerprint(input: {
  code: string;
  message: string;
  stack?: string;
  route?: string;
}) {
  const normalizedStack = input.stack
    ?.split("\n")
    .slice(0, 5)
    .join("\n")
    .replace(/\d+:\d+/g, "line:column");

  return createHash("sha256")
    .update(
      JSON.stringify({
        code: input.code,
        message: input.message,
        stack: normalizedStack,
        route: input.route
      })
    )
    .digest("hex");
}
