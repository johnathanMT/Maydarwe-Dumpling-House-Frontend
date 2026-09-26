import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easeOutBack } from './easing';

/** @typedef {'scallion' | 'chili' | 'sesame'} GarnishKind */

/**
 * @typedef {object} GarnishSpec
 * @property {number} id
 * @property {GarnishKind} kind
 * @property {[number, number, number]} target Final position around the dumpling.
 * @property {number} delay Seconds before it pops out.
 * @property {number} spin Spin speed (sign = direction).
 * @property {number} tilt Starting tilt in radians.
 */

/** @type {GarnishKind[]} */
const KINDS = ['scallion', 'chili', 'sesame'];

/**
 * A ring of garnishes laid out deterministically (no randomness, so the
 * scene looks the same on every visit).
 * @param {number} count
 * @returns {GarnishSpec[]}
 */
function layoutGarnishes(count) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 + (index % 5) * 0.19;
    const radius = 0.72 + (index % 6) * 0.22;
    const height = 1.05 + (index % 5) * 0.28;
    return {
      id: index,
      kind: KINDS[index % 3],
      target: [Math.cos(angle) * radius, height, Math.sin(angle) * radius],
      delay: 0.28 + index * 0.038,
      spin: (index % 2 === 0 ? 1 : -1) * (1.3 + (index % 4) * 0.35),
      tilt: 0.35 + (index % 7) * 0.18,
    };
  });
}

function ScallionSlice() {
  return (
    <group>
      <mesh castShadow>
        <torusGeometry args={[0.075, 0.02, 14, 28, Math.PI * 1.55]} />
        <meshStandardMaterial color="#3F8F3A" roughness={0.34} metalness={0.08} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.075, 0.01, 12, 24, Math.PI * 1.55]} />
        <meshStandardMaterial color="#F4F7E6" roughness={0.48} metalness={0.02} />
      </mesh>
    </group>
  );
}

function ChiliFlake() {
  return (
    <group>
      <mesh castShadow rotation={[0.2, 0.4, 0.15]}>
        <boxGeometry args={[0.16, 0.01, 0.07]} />
        <meshStandardMaterial color="#C8102E" roughness={0.62} metalness={0.04} />
      </mesh>
      <mesh rotation={[-0.25, -0.3, 0.4]} position={[0.02, 0.012, 0.01]}>
        <boxGeometry args={[0.1, 0.008, 0.045]} />
        <meshStandardMaterial color="#8B0A1A" roughness={0.7} metalness={0.03} />
      </mesh>
    </group>
  );
}

/** @param {{ toasted: boolean }} props */
function SesameSeed({ toasted }) {
  return (
    <mesh castShadow scale={[1, 0.52, 0.72]}>
      <capsuleGeometry args={[0.022, 0.02, 6, 10]} />
      <meshStandardMaterial color={toasted ? '#C9A04A' : '#F3E2B8'} roughness={0.46} metalness={0.12} />
    </mesh>
  );
}

/** @param {GarnishSpec & { reduce: boolean }} props */
function Garnish({ kind, target, delay, spin, tilt, reduce }) {
  /** @type {import('react').RefObject<import('three').Group | null>} */
  const group = useRef(null);
  const elapsed = useRef(-delay);

  useFrame((_, delta) => {
    const node = group.current;
    if (!node) return;
    elapsed.current += delta;
    const progress = reduce ? 1 : Math.max(0, Math.min(1, elapsed.current / 0.95));
    const lift = easeOutBack(progress);
    const settled = progress >= 1 && !reduce;
    const bob = settled ? Math.sin(elapsed.current * 1.6 + spin) * 0.035 : 0;

    node.position.set(target[0] * lift, target[1] * lift + bob, target[2] * lift);
    node.scale.setScalar(0.14 + 0.86 * lift);
    node.rotation.x = tilt + progress * spin + (settled ? elapsed.current * 0.55 : 0);
    node.rotation.y = progress * spin * 0.7 + (settled ? elapsed.current * 0.4 : 0);
    node.rotation.z = progress * spin * 0.45;
  });

  return (
    <group ref={group}>
      {kind === 'scallion' ? <ScallionSlice /> : null}
      {kind === 'chili' ? <ChiliFlake /> : null}
      {kind === 'sesame' ? <SesameSeed toasted={spin > 0} /> : null}
    </group>
  );
}

/**
 * Scallion rings, chili flakes and sesame seeds that pop out around the
 * dumpling, then drift gently. Reduced motion: they appear in place, still.
 * @param {{ count?: number, reduce: boolean }} props
 */
export default function Garnishes({ count = 24, reduce }) {
  const garnishes = useMemo(() => layoutGarnishes(count), [count]);
  return garnishes.map((item) => <Garnish key={item.id} {...item} reduce={reduce} />);
}
