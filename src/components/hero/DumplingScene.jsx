import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, ContactShadows, useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three-stdlib';
import { Box3, Color, Vector3 } from 'three';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/*
 * Model loading, kept inside our own CSP:
 * - Draco: if the model is Draco-compressed, decode it with the self-hosted
 *   pure-JS decoder in /public/draco (no Google CDN, no WebAssembly).
 *   The decoder is only downloaded if the model actually needs it.
 * - Meshopt: off. Its decoder compiles WebAssembly, which script-src 'self' blocks.
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });

const withLocalDraco = (loader) => {
  loader.setDRACOLoader(dracoLoader);
};

export const DUMPLING_MODEL_URL =
  'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790346466/Big_dumplings_3d_model_fopwnk.glb';

function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function useGarnishes(count = 24) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const kinds = ['scallion', 'chili', 'sesame'];
        const kind = kinds[index % 3];
        const angle = (index / count) * Math.PI * 2 + (index % 5) * 0.19;
        const radius = 0.72 + (index % 6) * 0.22;
        const height = 1.05 + (index % 5) * 0.28;
        return {
          id: index,
          kind,
          target: [Math.cos(angle) * radius, height, Math.sin(angle) * radius],
          delay: 0.28 + index * 0.038,
          spin: (index % 2 === 0 ? 1 : -1) * (1.3 + (index % 4) * 0.35),
          tilt: 0.35 + (index % 7) * 0.18,
        };
      }),
    [count]
  );
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

function SesameSeed({ toasted }) {
  return (
    <mesh castShadow scale={[1, 0.52, 0.72]}>
      <capsuleGeometry args={[0.022, 0.02, 6, 10]} />
      <meshStandardMaterial
        color={toasted ? '#C9A04A' : '#F3E2B8'}
        roughness={0.46}
        metalness={0.12}
      />
    </mesh>
  );
}

function Garnish({ kind, target, delay, spin, tilt, reduce }) {
  const mesh = useRef();
  const elapsed = useRef(-delay);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    elapsed.current += delta;
    const progress = reduce ? 1 : Math.max(0, Math.min(1, elapsed.current / 0.95));
    const lift = easeOutBack(progress);
    const bob = reduce || progress < 1 ? 0 : Math.sin(elapsed.current * 1.6 + spin) * 0.035;

    mesh.current.position.set(target[0] * lift, target[1] * lift + bob, target[2] * lift);
    mesh.current.scale.setScalar(0.14 + 0.86 * lift);
    mesh.current.rotation.x = tilt + progress * spin + (progress >= 1 && !reduce ? elapsed.current * 0.55 : 0);
    mesh.current.rotation.y = progress * spin * 0.7 + (progress >= 1 && !reduce ? elapsed.current * 0.4 : 0);
    mesh.current.rotation.z = progress * spin * 0.45;
  });

  return (
    <group ref={mesh}>
      {kind === 'scallion' ? <ScallionSlice /> : null}
      {kind === 'chili' ? <ChiliFlake /> : null}
      {kind === 'sesame' ? <SesameSeed toasted={spin > 0} /> : null}
    </group>
  );
}

function DumplingModel({ reduce, spinApiRef, onReady }) {
  const group = useRef();
  const { scene } = useGLTF(DUMPLING_MODEL_URL, false, false, withLocalDraco);
  const clone = useMemo(() => scene.clone(true), [scene]);
  const yaw = useRef(reduce ? 0.35 : 0);
  const spin = useRef({ from: reduce ? 0.35 : 0, progress: reduce ? 1 : 0 });
  const scale = useMemo(() => {
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const max = Math.max(size.x, size.y, size.z) || 1;
    return 2.15 / max;
  }, [clone]);

  useLayoutEffect(() => {
    clone.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (!material) return;
        material.roughness = Math.min(material.roughness ?? 0.55, 0.5);
        material.metalness = Math.min(material.metalness ?? 0, 0.04);
        if ('envMapIntensity' in material) material.envMapIntensity = 1.2;
        if (material.emissive) {
          material.emissive = new Color('#4a3214');
          material.emissiveIntensity = 0.07;
        }
        material.needsUpdate = true;
      });
    });
  }, [clone]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useLayoutEffect(() => {
    spinApiRef.current = () => {
      spin.current.from = yaw.current;
      spin.current.progress = 0;
    };
    return () => {
      spinApiRef.current = () => {};
    };
  }, [spinApiRef]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (spin.current.progress < 1) {
      spin.current.progress = Math.min(1, spin.current.progress + delta / 2.15);
      yaw.current = spin.current.from + easeOutCubic(spin.current.progress) * Math.PI * 2;
      group.current.rotation.y = yaw.current;
    }
  });

  return (
    <group ref={group} scale={scale} position={[0, -0.05, 0]}>
      <Center>
        <primitive object={clone} />
      </Center>
    </group>
  );
}

/** Warm cream stage with a soft butter-yellow halo behind the dumpling (matches the hero). */
function LacquerBackdrop() {
  return (
    <group>
      <mesh position={[0, 0.45, -3.6]}>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#FFE3A0" roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[0, 0.32, -2.75]}>
        <circleGeometry args={[3.7, 64]} />
        <meshBasicMaterial color="#FED271" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 0.3, -2.4]}>
        <circleGeometry args={[2.7, 64]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function SceneContent({ reduce, spinApiRef, onReady }) {
  const garnishes = useGarnishes(24);

  return (
    <>
      <hemisphereLight args={['#fffaf0', '#d5dbe3', 0.95]} />
      <ambientLight intensity={0.95} color="#fff8ee" />
      <directionalLight position={[2.4, 6.2, 5.2]} intensity={2.05} color="#ffffff" />
      <directionalLight position={[-3.8, 3.4, 2.2]} intensity={0.95} color="#FFE9B0" />
      <spotLight position={[0, 7.2, 3.6]} angle={0.55} penumbra={0.7} intensity={1.15} color="#FFF6E0" />

      <directionalLight position={[0.2, 2.6, -6.4]} intensity={2.85} color="#F2F6FB" />
      <directionalLight position={[-3.2, 3.8, -4.8]} intensity={1.45} color="#C5D0DC" />
      <directionalLight position={[3.4, 2.9, -4.4]} intensity={1.25} color="#D7E0EA" />
      <spotLight position={[0, 4.2, -6.2]} angle={0.42} penumbra={0.78} intensity={2.8} color="#FFFFFF" />
      <pointLight position={[0, 1.2, -3.2]} intensity={1.55} color="#E4EAF2" distance={9} decay={2} />

      <LacquerBackdrop />

      <Suspense fallback={null}>
        <DumplingModel reduce={reduce} spinApiRef={spinApiRef} onReady={onReady} />
        {/* Baked once after the model loads instead of re-rendering a depth pass every frame. */}
        <ContactShadows position={[0, -1.55, 0]} opacity={0.2} scale={10} blur={3.2} far={2.8} frames={1} />
      </Suspense>

      {garnishes.map((item) => (
        <Garnish key={item.id} {...item} reduce={reduce} />
      ))}

    </>
  );
}

/** Render only while the scene is on screen and the tab is visible. */
function useFrameloop(ref) {
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(() => document.visibilityState !== 'hidden');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return inView && visible ? 'always' : 'never';
}

/**
 * Interactive 3D dumpling. Loaded lazily by <HeroShowcase> (its own chunk
 * with three.js), never on first paint. Errors propagate to the caller's
 * error boundary so the photo simply stays in place.
 */
export default function DumplingScene({ onReady }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const spinApiRef = useRef(() => {});
  const wrapperRef = useRef(null);
  const frameloop = useFrameloop(wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className="relative h-full w-full cursor-pointer"
      onClick={() => spinApiRef.current()}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          spinApiRef.current();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={t('pages.home.tapSpin')}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 55%, #FFFFFF 0%, rgb(254 210 113 / 0.35) 55%, transparent 75%), #FFF4D6',
        }}
      />
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.5, 6.2], fov: 36 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.35, powerPreference: 'low-power' }}
      >
        <SceneContent reduce={Boolean(reduce)} spinApiRef={spinApiRef} onReady={onReady} />
      </Canvas>
    </div>
  );
}

// Safe here: this module only loads when the visitor asks for 3D (or on an idle desktop).
useGLTF.preload(DUMPLING_MODEL_URL, false, false, withLocalDraco);
