class Cache {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ttlMs = 0) {
    const expires = ttlMs > 0 ? Date.now() + ttlMs : null;
    this.store.set(key, { value, expires });
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (entry.expires && entry.expires < Date.now()) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key) {
    const entry = this.store.get(key);
    if (!entry) return false;

    if (entry.expires && entry.expires < Date.now()) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  clear() {
    this.store.clear();
  }
}

export const cache = new Cache();
