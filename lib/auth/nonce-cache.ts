// Simple cache for nonce tracking with automatic cleanup
// For production with multiple servers, swap this with Redis/Vercel KV
export class NonceCache {
  private cache = new Map<string, number>();
  private cleanupInterval: NodeJS.Timeout | null = null;
  private readonly TTL_MS = 3000; // 3 seconds

  constructor() {
    // Cleanup expired nonces every 5 seconds
    if (typeof window === 'undefined') { // Server-side only
      this.cleanupInterval = setInterval(() => this.cleanup(), 5000);
    }
  }

  has(nonce: string): boolean {
    const expiry = this.cache.get(nonce);
    if (expiry === undefined) return false;

    // Check if expired
    if (expiry < Date.now()) {
      this.cache.delete(nonce);
      return false;
    }
    return true;
  }

  add(nonce: string): void {
    this.cache.set(nonce, Date.now() + this.TTL_MS);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [nonce, expiry] of this.cache.entries()) {
      if (expiry < now) {
        this.cache.delete(nonce);
      }
    }
  }

  // For testing
  clear(): void {
    this.cache.clear();
  }

  // Cleanup on shutdown
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.cache.clear();
  }
}

export const nonceCache = new NonceCache();
