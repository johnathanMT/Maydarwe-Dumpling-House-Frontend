// Type declarations for imports that TypeScript cannot see on its own.
// Used only by `npm run typecheck`; Vite ignores this file.

/// <reference types="vite/client" />

/** vite-imagetools: `import photo from './x.jpg?w=…&format=…&as=picture'` */
declare module '*&as=picture' {
  const picture: import('./types').Picture;
  export default picture;
}
