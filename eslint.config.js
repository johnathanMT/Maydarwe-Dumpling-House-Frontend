import js from '@eslint/js';
import globals from 'globals';
import security from 'eslint-plugin-security';
import noUnsanitized from 'eslint-plugin-no-unsanitized';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import prettier from 'eslint-config-prettier';

/**
 * Lint policy. Every rule is an error: `npm run lint` (and CI) fails on any
 * finding, and there are no warnings to get used to ignoring.
 * Formatting is Prettier's job; eslint-config-prettier (last) switches off
 * any rule that would disagree with it.
 */

/**
 * XSS guardrails. Each of these turns a string into live markup or script, so
 * they are banned outright; the site builds all UI with React elements.
 * (Trusted Types blocks them in the browser too; this catches them in review.)
 */
const XSS_SINKS = [
  {
    selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
    message: 'dangerouslySetInnerHTML is banned: render React elements instead.',
  },
  {
    selector: 'AssignmentExpression > MemberExpression.left[property.name=/^(innerHTML|outerHTML)$/]',
    message: 'innerHTML/outerHTML is banned: build DOM with React (or textContent for plain text).',
  },
  {
    selector: "CallExpression[callee.property.name='insertAdjacentHTML']",
    message: 'insertAdjacentHTML is banned: build DOM with React.',
  },
  {
    selector: "CallExpression[callee.object.name='document'][callee.property.name=/^(write|writeln)$/]",
    message: 'document.write is banned.',
  },
  {
    selector:
      "JSXOpeningElement:has(JSXAttribute[name.name='target'][value.value='_blank']):not(:has(JSXAttribute[name.name='rel']))",
    message: 'Links with target="_blank" need rel="noopener noreferrer".',
  },
];

/**
 * React correctness rules the hooks plugin doesn't cover: every element
 * returned from .map() needs a `key` (missing keys cause lost input state and
 * wrong animations when lists change).
 */
const MISSING_KEY = 'Elements returned from .map() need a stable `key` prop.';
const REACT_LISTS = [
  {
    selector:
      "CallExpression[callee.property.name=/^(map|flatMap)$/] > :function > JSXElement > JSXOpeningElement:not(:has(> JSXAttribute[name.name='key']))",
    message: MISSING_KEY,
  },
  {
    selector:
      "CallExpression[callee.property.name=/^(map|flatMap)$/] > :function > BlockStatement > ReturnStatement > JSXElement > JSXOpeningElement:not(:has(> JSXAttribute[name.name='key']))",
    message: MISSING_KEY,
  },
];

/** Plain-JavaScript correctness rules that ESLint's recommended set leaves off. */
const CORE_STRICT = {
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'no-var': 'error',
  'prefer-const': 'error',
  'object-shorthand': 'error',
  'no-implicit-coercion': ['error', { allow: ['!!'] }],
  'no-throw-literal': 'error',
  'no-return-assign': 'error',
  'no-self-compare': 'error',
  'no-template-curly-in-string': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unused-private-class-members': 'error',
  'no-useless-rename': 'error',
  'no-console': ['error', { allow: ['error'] }],
};

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**', 'playwright-report/**', 'test-results/**', '.lighthouseci/**'],
  },
  js.configs.recommended,

  // Browser code (the site itself)
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      security,
      'no-unsanitized': noUnsanitized,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y-x': jsxA11y,
    },
    rules: {
      ...CORE_STRICT,
      // Security: Node/regex footguns, and DOM XSS sinks (Mozilla's no-unsanitized).
      ...security.configs.recommended.rules,
      'security/detect-object-injection': 'off', // flags every obj[key]; pure noise in a UI codebase
      'security/detect-non-literal-fs-filename': 'off', // no filesystem in the browser
      ...noUnsanitized.configs.recommended.rules,
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-restricted-syntax': ['error', ...XSS_SINKS, ...REACT_LISTS],

      // React: Rules of Hooks plus the React Compiler checks (purity, refs,
      // setState in effects, immutability), with dependency arrays enforced.
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'error',
      // Hot reload stays reliable when a file exports only components.
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],

      // Accessibility (alt text, labels, keyboard access, valid ARIA).
      ...jsxA11y.configs.recommended.rules,
    },
  },

  // Files that run in Node: build config, scripts, end-to-end tests.
  {
    files: ['*.config.js', 'scripts/**/*.{js,mjs}', 'src/lib/securityHeaders.js', 'tests/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      ...CORE_STRICT,
      'no-console': 'off', // scripts report to the terminal
    },
  },

  // Playwright tests run in Node but pass callbacks into the page (page.evaluate).
  {
    files: ['tests/**/*.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },

  // Must stay last: turns off anything that would fight Prettier's formatting.
  prettier,
];
