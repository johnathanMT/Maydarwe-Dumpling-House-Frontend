/** Overshoots slightly, then settles: used for garnishes popping into place. */
export function easeOutBack(/** @type {number} */ t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

/** Fast start, gentle stop: used for the dumpling's spin. */
export function easeOutCubic(/** @type {number} */ t) {
  return 1 - (1 - t) ** 3;
}
