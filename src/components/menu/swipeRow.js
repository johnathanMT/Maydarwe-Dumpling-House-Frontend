/**
 * Classes for a sideways-scrolling row that feels native on every device:
 * - touch-manipulation: horizontal and vertical panning and pinch-zoom all
 *   stay available (pan-y alone would block the sideways swipe itself).
 * - overscroll-x-contain: reaching the end of the row doesn't trigger the
 *   browser's back/forward swipe or scroll the page sideways.
 * - data-lenis-prevent-horizontal (on the element): Lenis leaves sideways
 *   trackpad gestures to the browser but still smooths vertical scrolling
 *   over the row. (Lenis otherwise claims a sideways swipe whenever it has
 *   any vertical wobble, which blocks the row from scrolling.)
 */
export const SWIPE_ROW = 'touch-manipulation overscroll-x-contain';
