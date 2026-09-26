/**
 * After a new deploy, a visitor with the old page open may request a
 * route chunk that no longer exists. One automatic reload fetches the new
 * build; the timestamp guard stops a reload loop if something else is wrong.
 */
const KEY = 'maydarwe-chunk-reload-at';
const WINDOW_MS = 30_000;

const CHUNK_ERROR =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS/i;

/**
 * @param {unknown} error
 * @returns {boolean}
 */
export function isChunkLoadError(error) {
  const message = error instanceof Error ? error.message : error;
  return CHUNK_ERROR.test(String(message ?? ''));
}

/** Reloads once per 30 s. Returns true if a reload was triggered. */
export function reloadOnce() {
  try {
    const last = Number(window.sessionStorage.getItem(KEY) ?? 0);
    if (Date.now() - last < WINDOW_MS) return false;
    window.sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}
