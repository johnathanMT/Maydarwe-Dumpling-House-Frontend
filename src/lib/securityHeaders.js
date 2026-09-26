/** Keep this CSP in sync with vercel.json. */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "frame-src https://www.google.com",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://upload.wikimedia.org",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "connect-src 'self' https://res.cloudinary.com https://dl.polyhaven.org https://cdn.jsdelivr.net",
  'upgrade-insecure-requests',
].join('; ');

export const SECURITY_HEADERS = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  'X-DNS-Prefetch-Control': 'off',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

/** Vite HMR needs eval/inline scripts and websocket connect. Production uses CONTENT_SECURITY_POLICY. */
export const DEV_SECURITY_HEADERS = {
  ...SECURITY_HEADERS,
  'Content-Security-Policy': [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "frame-src https://www.google.com",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https://upload.wikimedia.org",
    "worker-src 'self' blob:",
    "connect-src 'self' ws: wss: http: https: https://res.cloudinary.com https://dl.polyhaven.org https://cdn.jsdelivr.net",
  ].join('; '),
};
