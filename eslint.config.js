import js from '@eslint/js';
import globals from 'globals';
import security from 'eslint-plugin-security';
import reactHooks from 'eslint-plugin-react-hooks';

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
