import js from '@eslint/js';
import globals from 'globals';
import security from 'eslint-plugin-security';
import reactHooks from 'eslint-plugin-react-hooks';

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
    selector: "AssignmentExpression > MemberExpression.left[property.name=/^(innerHTML|outerHTML)$/]",
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

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**'],
  },
  js.configs.recommended,

  // Browser code (the site itself)
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      security,
      'react-hooks': reactHooks,
    },
    rules: {
      ...security.configs.recommended.rules,
      // Rules of Hooks + exhaustive dependencies (catches stale-closure bugs in effects).
      ...reactHooks.configs.recommended.rules,
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-restricted-syntax': ['error', ...XSS_SINKS],
      'no-console': ['warn', { allow: ['error'] }],
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-fs-filename': 'off',
    },
  },

  // Files that run in Node at build time
  {
    files: ['*.config.js', 'scripts/**/*.{js,mjs}', 'src/lib/securityHeaders.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: globals.node,
    },
  },
];
