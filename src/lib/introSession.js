/**
 * The first-load curtain (LoadingScreen) is a brand moment for a guest's first
 * page of a visit, not something to sit through on every page or refresh.
 * sessionStorage remembers it for the life of the tab.
 */
const KEY = 'maydarwe-intro-seen';

/**
 * True if the curtain already played in this tab (or storage is blocked).
 * @returns {boolean}
 */
export function introAlreadySeen() {
  try {
    return window.sessionStorage.getItem(KEY) === '1';
  } catch {
    // Storage blocked (some private modes): we can't remember, so skip the curtain.
    return true;
  }
}

/** Remember for this tab that the curtain has played. */
export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(KEY, '1');
  } catch {
    // Nothing to do: the curtain simply may show again next load.
  }
}
