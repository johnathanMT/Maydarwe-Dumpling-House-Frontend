import { motion, useReducedMotion } from 'framer-motion';

function SteamWisp({ delay, x }) {
  const reduce = useReducedMotion();

  return (
    <motion.path
      d={`M${x} 62 C ${x - 7} 48, ${x + 7} 40, ${x} 26`}
      fill="none"
      stroke="#E8A006"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ opacity: 0.15, pathLength: 0.4 }}
      animate={
        reduce
          ? { opacity: 0.35 }
          : { opacity: [0.1, 0.7, 0.1], y: [8, -10, -18], pathLength: [0.35, 1, 0.4] }
      }
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

function RedBlackPlate() {
  return (
    <g aria-hidden="true">
      <ellipse cx="120" cy="258" rx="98" ry="12" fill="#141110" opacity="0.2" />
      <ellipse cx="120" cy="244" rx="108" ry="26" fill="#6B0C1C" />
      <ellipse cx="120" cy="241" rx="104" ry="23" fill="#C8102E" />
      <ellipse cx="120" cy="239" rx="94" ry="20" fill="#8A1024" />
      <ellipse cx="120" cy="238" rx="86" ry="17" fill="#1A1412" />
      <ellipse cx="120" cy="236" rx="74" ry="14" fill="#0D0B0A" />
      <ellipse cx="120" cy="235" rx="58" ry="10" fill="#221E1B" />
      <ellipse cx="120" cy="234" rx="42" ry="6.5" fill="#2C2420" />
      <ellipse cx="96" cy="230" rx="28" ry="5" fill="#ffffff" opacity="0.14" />
      <ellipse cx="120" cy="250" rx="86" ry="8" fill="#C8102E" opacity="0.45" />
      <ellipse cx="148" cy="246" rx="18" ry="3.5" fill="#E8A006" opacity="0.18" />
    </g>
  );
}

export default function CuteDumpling() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-[min(100%,20rem)] sm:w-[24rem] lg:w-[26rem]">
      <motion.div
        aria-hidden="true"
        className="absolute left-6 top-8 h-16 w-16 rounded-full bg-primary-600/15 blur-2xl"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-10 right-4 h-20 w-20 rounded-full bg-ink-950/10 blur-2xl"
        animate={reduce ? undefined : { scale: [1.05, 0.95, 1.05], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <svg viewBox="0 0 240 280" className="relative mx-auto h-auto w-full" role="img">
        <title>Cute dumpling hovering over a red and black plate</title>

        <RedBlackPlate />

        <SteamWisp delay={0} x={102} />
        <SteamWisp delay={0.4} x={120} />
        <SteamWisp delay={0.8} x={138} />

        <motion.g
          style={{ transformOrigin: '120px 128px' }}
          animate={
            reduce
              ? undefined
              : { y: [0, -12, 0], rotate: [-2.4, 2.4, -2.4] }
          }
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.ellipse
            cx="120"
            cy="208"
            rx="42"
            ry="7"
            fill="#141110"
            animate={reduce ? { opacity: 0.12 } : { opacity: [0.1, 0.22, 0.1], rx: [36, 46, 36] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path
            d="M50 128c8-48 42-74 70-74s62 26 70 74c3 19-8 36-29 42-13 4-28 6-41 6s-28-2-41-6c-21-6-32-23-29-42z"
            fill="#fff4d4"
            stroke="#c77a02"
            strokeWidth="3"
          />
          <path
            d="M62 114c16-30 38-42 58-42s42 12 58 42"
            fill="none"
            stroke="#e8a006"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M86 82c8 17 15 30 15 45" fill="none" stroke="#c77a02" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M120 74v55" fill="none" stroke="#c77a02" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M154 82c-8 17-15 30-15 45" fill="none" stroke="#c77a02" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M78 124c13 11 26 17 42 17s29-6 42-17"
            fill="#ffe588"
            stroke="#e8a006"
            strokeWidth="2"
          />
          <circle cx="96" cy="124" r="9" fill="#f6a3a4" opacity="0.7" />
          <circle cx="144" cy="124" r="9" fill="#f6a3a4" opacity="0.7" />
          <motion.g
            animate={reduce ? undefined : { scaleY: [1, 1, 0.12, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.86, 0.9, 1] }}
            style={{ originY: '120px' }}
          >
            <ellipse cx="100" cy="120" rx="6" ry="7.5" fill="#221e1b" />
            <ellipse cx="140" cy="120" rx="6" ry="7.5" fill="#221e1b" />
            <circle cx="102" cy="118" r="1.8" fill="#fff" />
            <circle cx="142" cy="118" r="1.8" fill="#fff" />
          </motion.g>
          <path
            d="M110 140c4 5 16 5 20 0"
            fill="none"
            stroke="#c8102e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  );
}
