class RateLimiter {
  private store = new Map();
  check(key: string, max: number, window: number) {
    const now = Date.now();
    const entry = this.store.get(key);
    if (!entry || now > entry.resetAt) {
      this.store.set(key, { count: 1, resetAt: now + window });
      return true;
    }
    if (entry.count >= max) return false;
    entry.count++;
    return true;
  }
}
export const rateLimiter = new RateLimiter();