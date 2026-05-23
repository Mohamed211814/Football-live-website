/**
 * Simple server-side in-memory cache.
 * Prevents hammering the API-Football quota with duplicate requests
 * within a short time window (TTL-based eviction).
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = new Map<string, CacheEntry<any>>();

/**
 * Get or set a cached value.
 * @param key        Unique cache key
 * @param ttlSeconds Time-to-live in seconds
 * @param fetcher    Async function that returns the fresh data
 */
export async function withCache<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  const cached = store.get(key);

  if (cached && cached.expiresAt > now) {
    return cached.data as T;
  }

  const data = await fetcher();
  store.set(key, { data, expiresAt: now + ttlSeconds * 1000 });
  return data;
}

/** Manually invalidate a cache entry (useful for testing). */
export function invalidateCache(key: string): void {
  store.delete(key);
}
