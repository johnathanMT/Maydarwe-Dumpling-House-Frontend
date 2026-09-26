import { useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three-stdlib';

/*
 * Model loading, kept inside our own CSP:
 * - Draco: if the model is Draco-compressed, decode it with the self-hosted
 *   pure-JS decoder in /public/draco (no Google CDN, no WebAssembly).
 *   The decoder is only downloaded if the model actually needs it.
 * - Meshopt: off. Its decoder compiles WebAssembly, which script-src 'self' blocks.
 */

export const DUMPLING_MODEL_URL =
  'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790346466/Big_dumplings_3d_model_fopwnk.glb';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });
// One decoding worker is plenty for a single model.
dracoLoader.setWorkerLimit(1);

/** Passed to useGLTF: plugs our self-hosted Draco decoder into the GLTF loader. */
export const withLocalDraco = (/** @type {import('three-stdlib').GLTFLoader} */ loader) => {
  loader.setDRACOLoader(dracoLoader);
};

let decoderReleased = false;

/**
 * Once the model is decoded it lives in useGLTF's cache, so the decoder's
 * background worker (and the decoder code it holds in memory) is no longer
 * needed. Terminate it instead of keeping it alive for the whole visit.
 */
export function releaseDecoder() {
  if (decoderReleased) return;
  decoderReleased = true;
  dracoLoader.dispose();
}

/** Start downloading the model as soon as the 3D chunk loads. */
export function preloadDumplingModel() {
  useGLTF.preload(DUMPLING_MODEL_URL, false, false, withLocalDraco);
}
