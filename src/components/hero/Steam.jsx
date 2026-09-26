const WISPS = [
  { x: 38, delay: '0s' },
  { x: 50, delay: '1.1s' },
  { x: 62, delay: '2.2s' },
];

/**
 * Three soft wisps of steam rising off the pan. CSS animation only; hidden
 * for reduced-motion visitors, and paused by a parent `.loop-paused` when the
 * hero is off screen.
 */
export default function Steam() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[6%] h-1/3 w-full motion-reduce:hidden"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
    >
      {WISPS.map(({ x, delay }) => (
        // The <g> positions the wisp; the path itself animates (a CSS transform would override an SVG one).
        <g key={x} transform={`translate(${x} 0)`}>
          <path
            d="M0 40 C -4 30, 4 24, 0 16 C -4 8, 4 4, 0 0"
            fill="none"
            stroke="rgb(253 250 246 / 0.55)"
            strokeWidth="1.4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="animate-steam opacity-0 [transform-box:fill-box] [transform-origin:bottom]"
            style={{ animationDelay: delay, filter: 'blur(1.5px)' }}
          />
        </g>
      ))}
    </svg>
  );
}
