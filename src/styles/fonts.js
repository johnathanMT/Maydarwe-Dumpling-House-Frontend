/**
 * Self-hosted fonts (bundled by Vite, served from our own domain).
 *
 * Variable fonts cover every weight, so bold and extra-bold are real
 * weights instead of browser-faked ones. Each file carries a
 * unicode-range, so browsers download only the scripts a page uses:
 * an English page never fetches the Burmese files, and vice versa.
 */
import '@fontsource-variable/figtree';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/noto-sans-myanmar';
// Noto Serif Myanmar has no variable build on npm: load only the weights the headings use.
import '@fontsource/noto-serif-myanmar/myanmar-600.css';
import '@fontsource/noto-serif-myanmar/myanmar-700.css';
import '@fontsource/noto-serif-myanmar/myanmar-800.css';
