import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

function secret() {
  return process.env.GRIDMIND_CSRF_SECRET ?? "development-only-change-me";
}

export function createCsrfToken(sessionId: string) {
  const nonce = randomBytes(16).toString("base64url");
  const signature = createHmac("sha256", secret())
    .update(`${sessionId}.${nonce}`)
    .digest("base64url");

  return `${nonce}.${signature}`;
}

export function verifyCsrfToken(
  sessionId: string,
  token: string | null | undefined
) {
  if (!token) return false;

  const [nonce, signature] = token.split(".");
  if (!nonce || !signature) return false;

  const expected = createHmac("sha256", secret())
    .update(`${sessionId}.${nonce}`)
    .digest();

  const actual = Buffer.from(signature, "base64url");

  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}
