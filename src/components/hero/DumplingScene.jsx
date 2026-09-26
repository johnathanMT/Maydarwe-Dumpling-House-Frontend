import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DumplingModel from './scene/DumplingModel';
import Garnishes from './scene/Garnishes';
import Lighting from './scene/Lighting';
import StageBackdrop from './scene/StageBackdrop';
import { loadDumplingModel } from './scene/modelLoader';
import { useFrameloop } from './scene/useFrameloop';

const STAGE_GRADIENT =
  'radial-gradient(ellipse 60% 45% at 50% 55%, #FFFFFF 0%, rgb(254 210 113 / 0.35) 55%, transparent 75%), #FFF4D6';

/**
 * Interactive 3D dumpling. Loaded lazily by <HeroShowcase> (its own chunk
 * with three.js), never on first paint. If the model can't be downloaded,
 * onError is called so the caller keeps the photo in place; render errors
 * (WebGL) still propagate to the caller's error boundary.
 * Tap / Enter / Space spins it once more.
 * @param {{ onReady?: () => void, onError?: (error: unknown) => void }} props
 */
export default function DumplingScene({ onReady, onError }) {
  const { t } = useTranslation();
  const reduce = Boolean(useReducedMotion());
  /** @type {import('react').RefObject<() => void>} */
  const spinApiRef = useRef(() => {});
  /** @type {import('react').RefObject<HTMLDivElement | null>} */
  const wrapperRef = useRef(null);
  const frameloop = useFrameloop(wrapperRef);
  const [scene, setScene] = useState(/** @type {import('three').Object3D | null} */ (null));

  useEffect(() => {
    let active = true;
    loadDumplingModel().then(
      (loaded) => active && setScene(loaded),
      (error) => active && onError?.(error)
    );
    return () => {
      active = false;
    };
  }, [onError]);

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
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: STAGE_GRADIENT }} />
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.5, 6.2], fov: 36 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.35, powerPreference: 'low-power' }}
      >
        <Lighting />
        <StageBackdrop />
        {scene ? (
          <>
            <DumplingModel scene={scene} reduce={reduce} spinApiRef={spinApiRef} onReady={onReady} />
            {/* Baked once after the model loads instead of re-rendering a depth pass every frame. */}
            <ContactShadows position={[0, -1.55, 0]} opacity={0.2} scale={10} blur={3.2} far={2.8} frames={1} />
          </>
        ) : null}
        <Garnishes reduce={reduce} />
      </Canvas>
    </div>
  );
}

// Safe here: this module only loads when the visitor asks for 3D (or on an idle desktop).
// Starts the download while the scene mounts; the scene handles any failure.
loadDumplingModel().catch(() => {});
