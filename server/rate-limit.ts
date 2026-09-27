/**
 * Basic in-memory rate limiter. Suitable for a single instance / basic abuse
 * protection. Replace with a shared store (Redis) if scaling horizontally.
 */

type Entry = {
  count: number
  resetAt: number
}

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const MAX_KEYS = 5000

const buckets = new Map<string, Entry>()

function pruneExpired(now: number): void {
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key)
  }
}

/** Evicts the oldest entries so the map can never exceed `MAX_KEYS`. */
function enforceCapacity(): void {
  if (buckets.size < MAX_KEYS) return
  const overflow = buckets.size - MAX_KEYS + 1
  let removed = 0
  for (const key of buckets.keys()) {
    buckets.delete(key)
    removed += 1
    if (removed >= overflow) break
  }
}

export function checkRateLimit(
  key: string,
  now: number = Date.now(),
): { allowed: boolean; retryAfterSeconds: number } {
  pruneExpired(now)

  if (!buckets.has(key)) {
    enforceCapacity()
  }

  const entry = buckets.get(key)

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  entry.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}
