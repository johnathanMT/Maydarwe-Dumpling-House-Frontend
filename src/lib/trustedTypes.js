/**
 * Trusted Types "default" policy (see require-trusted-types-for in
 * src/lib/securityHeaders.js).
 *
 * With Trusted Types on, the browser passes every string headed for a
 * dangerous DOM sink through this policy first:
 *   - HTML (innerHTML, outerHTML, insertAdjacentHTML, document.write): refused.
 *     The site never builds markup from strings; React creates elements directly.
 *   - Script text (eval-like sinks): refused.
 *   - Script URLs (new Worker(url), script.src): allowed only for this site's own
 *     origin, including blob: URLs it created itself (the 3D model's Draco
 *     decoder runs in a worker loaded that way).
 *
 * Must be imported before anything else in src/main.jsx.
 */

/**
 * The part of the Trusted Types API used here (TypeScript's DOM types do not include it yet).
 * @typedef {object} TrustedTypePolicyOptions
 * @property {(input: string) => string} [createHTML]
 * @property {(input: string) => string} [createScript]
 * @property {(input: string) => string} [createScriptURL]
 */
/**
 * @typedef {object} TrustedTypePolicyFactory
 * @property {(name: string, options: TrustedTypePolicyOptions) => unknown} createPolicy
 */
/** @typedef {Window & { trustedTypes?: TrustedTypePolicyFactory }} TrustedTypesWindow */

/**
 * A policy callback that always throws.
 * @param {string} kind What was refused, for the error message.
 * @returns {() => never}
 */
const refuse = (kind) => () => {
  throw new TypeError(`Blocked by Trusted Types policy: ${kind} from a string is not allowed.`);
};

/**
 * Lets a script URL through only if it belongs to this site's origin.
 * @param {string} value
 * @returns {string}
 */
function sameOriginScriptUrl(value) {
  const url = new URL(value, window.location.href);
  // For blob: URLs, URL.origin is the origin that created the blob.
  if (url.origin === window.location.origin) return value;
  throw new TypeError(`Blocked by Trusted Types policy: script URL ${url.origin} is not this site.`);
}

const trustedTypes =
  typeof window !== 'undefined' ? /** @type {TrustedTypesWindow} */ (window).trustedTypes : undefined;

if (trustedTypes?.createPolicy) {
  try {
    trustedTypes.createPolicy('default', {
      createHTML: refuse('HTML'),
      createScript: refuse('script'),
      createScriptURL: sameOriginScriptUrl,
    });
  } catch {
    // A policy named "default" already exists (e.g. hot reload in development).
  }
}
