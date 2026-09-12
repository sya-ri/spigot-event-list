// Bound both memory use and staleness; failed loads can be retried immediately.
export const createAsyncCache = (
  ttlMs: number,
  maxEntries = 16,
  now = Date.now,
) => {
  const entries = new Map<
    string,
    { expiresAt: number; value: Promise<unknown> }
  >();
  return <T>(key: string, load: () => Promise<T>): Promise<T> => {
    if (ttlMs <= 0) return load();
    const existing = entries.get(key);
    if (existing && existing.expiresAt > now()) {
      entries.delete(key);
      entries.set(key, existing);
      return existing.value as Promise<T>;
    }
    entries.delete(key);
    const entry = { expiresAt: Infinity, value: Promise.resolve().then(load) };
    entries.set(key, entry);
    if (entries.size > maxEntries) entries.delete(entries.keys().next().value!);
    void entry.value.then(
      () => {
        entry.expiresAt = now() + ttlMs;
      },
      () => {
        if (entries.get(key) === entry) entries.delete(key);
      },
    );
    return entry.value;
  };
};
