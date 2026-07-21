export type CursorPage<T> = {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
};

export function encodeCursor(value: {
  id: string;
  createdAt: Date | string;
}) {
  return Buffer.from(
    JSON.stringify({
      id: value.id,
      createdAt:
        value.createdAt instanceof Date
          ? value.createdAt.toISOString()
          : value.createdAt
    })
  ).toString("base64url");
}

export function decodeCursor(cursor?: string | null) {
  if (!cursor) return null;

  const parsed = JSON.parse(
    Buffer.from(cursor, "base64url").toString("utf8")
  );

  return {
    id: String(parsed.id),
    createdAt: new Date(parsed.createdAt)
  };
}
