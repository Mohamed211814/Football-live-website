/**
 * Lightweight sliding-window rate limiter.
 * Edge-runtime compatible (no Node.js APIs — pure Map-based).
 *
 * Each IP gets a bucket of timestamps. On every request we:
 *   1. Evict timestamps older than the window
 *   2. Check if the remaining count exceeds the limit
 *   3. If allowed, record the new timestamp
 *
 * Stale buckets are periodically pruned to prevent memory leaks.
 */

interface RateLimitBucket {
  timestamps: number[];
}

interface RateLimiterConfig {
  /** Max requests allowed per window. */
  maxRequests: number;
  /** Window size in seconds. */
  windowSeconds: number;
}

const store = new Map<string, RateLimitBucket>();

// Prune stale entries every 60 seconds
let lastPrune = Date.now();
const PRUNE_INTERVAL_MS = 60_000;

function pruneStaleEntries(windowMs: number) {
  const now = Date.now();
  if (now - lastPrune < PRUNE_INTERVAL_MS) return;
  lastPrune = now;

  const cutoff = now - windowMs;
  for (const [key, bucket] of store) {
    // Remove timestamps older than the window
    bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);
    // Delete empty buckets
    if (bucket.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Requests remaining in the current window. */
  remaining: number;
  /** Unix timestamp (seconds) when the window resets. */
  resetAt: number;
  /** Total limit per window. */
  limit: number;
}

export function checkRateLimit(
  key: string,
  config: RateLimiterConfig,
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const cutoff = now - windowMs;

  // Periodic cleanup
  pruneStaleEntries(windowMs);

  // Get or create bucket
  let bucket = store.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    store.set(key, bucket);
  }

  // Evict old timestamps
  bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);

  const remaining = Math.max(0, config.maxRequests - bucket.timestamps.length);
  // Reset time = oldest surviving timestamp + window, or now + window if empty
  const resetAt = Math.ceil(
    ((bucket.timestamps.length > 0 ? bucket.timestamps[0] : now) + windowMs) / 1000,
  );

  if (bucket.timestamps.length >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt, limit: config.maxRequests };
  }

  // Record this request
  bucket.timestamps.push(now);

  return {
    allowed: true,
    remaining: remaining - 1,
    resetAt,
    limit: config.maxRequests,
  };
}
