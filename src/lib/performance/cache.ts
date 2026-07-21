import { unstable_cache } from "next/cache";

export function cachedRepositoryCall<T>(
  keyParts: string[],
  operation: () => Promise<T>,
  options: {
    revalidate?: number;
    tags?: string[];
  } = {}
) {
  return unstable_cache(
    operation,
    keyParts,
    {
      revalidate: options.revalidate ?? 60,
      tags: options.tags ?? []
    }
  )();
}
