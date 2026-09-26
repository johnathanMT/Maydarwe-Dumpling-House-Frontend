import { DRACOLoader, GLTFLoader } from 'three-stdlib';

/*
 * Model loading, kept inside our own CSP:
 * - Draco: if the model is Draco-compressed, decode it with the self-hosted
 *   pure-JS decoder in /public/draco (no Google CDN, no WebAssembly).
 *   The decoder is only downloaded if the model actually needs it.
 * - Meshopt: off. Its decoder compiles WebAssembly, which script-src 'self' blocks.
 *
 * Loaded as a plain promise rather than through a suspending hook: a failed
 * download is then an ordinary rejection the scene handles, instead of an
 * error thrown during render that React Three Fiber reports as uncaught.
 */

export const DUMPLING_MODEL_URL =
  'https://res.cloudinary.com/dhlhzmmtt/image/upload/v1790346466/Big_dumplings_3d_model_fopwnk.glb';

/** @type {Promise<import('three').Object3D> | null} */
let modelPromise = null;

/**
 * Downloads and decodes the dumpling once; later calls share the same promise.
 * A failed load is forgotten, so a later call tries again.
 * @returns {Promise<import('three').Object3D>}
 */
export function loadDumplingModel() {
  if (modelPromise) return modelPromise;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  dracoLoader.setDecoderConfig({ type: 'js' });
  // One decoding worker is plenty for a single model.
  dracoLoader.setWorkerLimit(1);
  const loader = new GLTFLoader().setDRACOLoader(dracoLoader);

  modelPromise = loader
    .loadAsync(DUMPLING_MODEL_URL)
    .then((gltf) => gltf.scene)
    .catch((error) => {
      modelPromise = null;
      throw error;
    })
    .finally(() => {
      // Decoded (or failed): the decoder's background worker is no longer needed.
      dracoLoader.dispose();
    });
  return modelPromise;
}
