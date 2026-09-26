import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { Box3, Color, Vector3 } from 'three';
import { easeOutCubic } from './easing';

/** Longest side of the model after scaling, in scene units. */
const TARGET_SIZE = 2.15;
/** Seconds for one full celebratory spin. */
const SPIN_SECONDS = 2.15;

/**
 * @typedef {object} DumplingModelProps
 * @property {import('three').Object3D} scene The loaded .glb scene (see loadDumplingModel).
 * @property {boolean} reduce Reduced motion: no intro spin.
 * @property {import('react').RefObject<() => void>} spinApiRef Set to a function that starts a spin.
 * @property {() => void} [onReady] Called once the model is on screen.
 */

/**
 * The dumpling .glb: scaled to a fixed size, given a soft "steamed" material
 * finish, and spun once on arrival (and again on tap, via spinApiRef).
 * @param {DumplingModelProps} props
 */
export default function DumplingModel({ scene, reduce, spinApiRef, onReady }) {
  /** @type {import('react').RefObject<import('three').Group | null>} */
  const group = useRef(null);
  const clone = useMemo(() => scene.clone(true), [scene]);
  const yaw = useRef(reduce ? 0.35 : 0);
  const spin = useRef({ from: reduce ? 0.35 : 0, progress: reduce ? 1 : 0 });

  const scale = useMemo(() => {
    const size = new Box3().setFromObject(clone).getSize(new Vector3());
    return TARGET_SIZE / (Math.max(size.x, size.y, size.z) || 1);
  }, [clone]);

  useLayoutEffect(() => {
    clone.traverse((child) => {
      if (!(/** @type {import('three').Mesh} */ (child).isMesh)) return;
      const mesh = /** @type {import('three').Mesh} */ (child);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of /** @type {import('three').MeshStandardMaterial[]} */ (materials)) {
        if (!material) continue;
        material.roughness = Math.min(material.roughness ?? 0.55, 0.5);
        material.metalness = Math.min(material.metalness ?? 0, 0.04);
        if ('envMapIntensity' in material) material.envMapIntensity = 1.2;
        if (material.emissive) {
          material.emissive = new Color('#4a3214');
          material.emissiveIntensity = 0.07;
        }
        material.needsUpdate = true;
      }
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
    const node = group.current;
    if (!node || spin.current.progress >= 1) return;
    spin.current.progress = Math.min(1, spin.current.progress + delta / SPIN_SECONDS);
    yaw.current = spin.current.from + easeOutCubic(spin.current.progress) * Math.PI * 2;
    node.rotation.y = yaw.current;
  });

  return (
    <group ref={group} scale={scale} position={[0, -0.05, 0]}>
      <Center>
        <primitive object={clone} />
      </Center>
    </group>
  );
}
