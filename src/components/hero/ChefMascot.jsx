import { motion, useReducedMotion } from 'framer-motion';

function SteamWisp({ d, delay }) {
  const reduce = useReducedMotion();

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#E8A006"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ opacity: 0.2, pathLength: 0.35 }}
      animate={
        reduce
          ? { opacity: 0.4 }
          : { opacity: [0.15, 0.85, 0.15], y: [6, -12, -20], pathLength: [0.3, 1, 0.35] }
      }
      transition={{ duration: 2.2, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

export default function ChefMascot({ className = '' }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`relative mx-auto w-[min(100%,18rem)] sm:w-[22rem] lg:w-[24rem] ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.68, y: 44 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 14, mass: 0.8 }}
    >
      <motion.svg
        viewBox="0 0 400 450"
        className="relative mx-auto h-auto w-full"
        role="img"
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <title>Maydarwe chef holding a golden pan-fried dumpling</title>

        <motion.ellipse
          cx="176"
          cy="426"
          rx="92"
          ry="13"
          fill="#141110"
          animate={reduce ? { opacity: 0.12 } : { opacity: [0.08, 0.2, 0.08], rx: [78, 98, 78] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <g stroke="#141110" strokeWidth="6.5" strokeLinejoin="round" strokeLinecap="round">
          <path d="M108 248 C 64 268, 46 304, 58 348 L 96 348 C 90 308, 104 272, 130 252 Z" fill="#fff" />
          <ellipse cx="52" cy="352" rx="22" ry="16" fill="#141110" />
          <ellipse cx="38" cy="348" rx="8" ry="11" fill="#141110" />
          <ellipse cx="48" cy="338" rx="7" ry="10" fill="#141110" />
          <ellipse cx="60" cy="336" rx="7" ry="10" fill="#141110" />
          <ellipse cx="72" cy="340" rx="7" ry="10" fill="#141110" />
          <path d="M52 336 C 48 312, 50 292, 56 276" fill="none" stroke="#141110" strokeWidth="12" />
          <circle cx="56" cy="268" r="9" fill="#141110" stroke="none" />

          <path d="M118 236 C 86 254, 78 300, 88 368 L 264 368 C 274 300, 266 254, 234 236 C 206 218, 146 218, 118 236 Z" fill="#fff" />
          <path d="M176 232 L 158 276 L 176 304 L 194 276 Z" fill="#C8102E" />
          <circle cx="176" cy="326" r="6" fill="#E8A006" strokeWidth="4.5" />
          <circle cx="176" cy="346" r="6" fill="#E8A006" strokeWidth="4.5" />

          <path d="M240 246 C 276 226, 298 184, 308 146 L 276 136 C 268 176, 252 214, 228 232 Z" fill="#fff" />
          <ellipse cx="300" cy="128" rx="20" ry="16" fill="#141110" />
          <ellipse cx="286" cy="122" rx="8" ry="11" fill="#141110" />
          <ellipse cx="296" cy="114" rx="8" ry="11" fill="#141110" />
          <ellipse cx="308" cy="114" rx="8" ry="11" fill="#141110" />
          <path d="M304 118 l 42 -52" fill="none" stroke="#C8102E" strokeWidth="8" />
          <path d="M316 126 l 42 -52" fill="none" stroke="#C8102E" strokeWidth="8" />

          <path
            d="M318 96 C 304 96, 292 80, 304 66 C 316 50, 356 50, 370 70 C 382 88, 368 112, 340 114 C 326 116, 318 108, 318 96 Z"
            fill="#F5C14A"
          />
          <path d="M322 90 C 336 74, 358 76, 366 90" fill="none" stroke="#C77A02" strokeWidth="4.5" />
          <ellipse cx="330" cy="80" rx="10" ry="4" fill="#FFE588" stroke="none" />

          <ellipse cx="122" cy="176" rx="13" ry="16" fill="#FFD2A3" />
          <ellipse cx="230" cy="176" rx="13" ry="16" fill="#FFD2A3" />
          <circle cx="176" cy="176" r="58" fill="#FFD2A3" />
          <path d="M122 160 C 126 122, 148 108, 176 106 C 204 108, 226 122, 230 160 C 212 146, 194 140, 176 140 C 158 140, 140 146, 122 160 Z" fill="#141110" />
          <ellipse cx="154" cy="174" rx="7.5" ry="9" fill="#141110" stroke="none" />
          <ellipse cx="198" cy="174" rx="7.5" ry="9" fill="#141110" stroke="none" />
          <circle cx="156" cy="171" r="2.3" fill="#fff" stroke="none" />
          <circle cx="200" cy="171" r="2.3" fill="#fff" stroke="none" />
          <path d="M150 200 C 162 224, 190 224, 202 200 C 190 216, 162 216, 150 200 Z" fill="#141110" />
          <path d="M164 204 C 172 216, 180 216, 188 204 C 180 212, 172 212, 164 204 Z" fill="#fff" stroke="none" />

          <ellipse cx="176" cy="114" rx="70" ry="16" fill="#fff" />
          <path d="M118 112 C 112 48, 136 16, 176 8 C 216 16, 240 48, 234 112 Z" fill="#fff" />
          <ellipse cx="176" cy="10" rx="24" ry="18" fill="#fff" />
        </g>

        <SteamWisp delay={0} d="M328 52 C 318 36, 334 24, 324 6" />
        <SteamWisp delay={0.35} d="M346 46 C 336 30, 352 18, 342 0" />
        <SteamWisp delay={0.7} d="M364 52 C 354 36, 370 24, 360 6" />
      </motion.svg>
    </motion.div>
  );
}
