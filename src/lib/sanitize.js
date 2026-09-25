const BIDI_AND_INVISIBLE = /[\u00AD\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;
const SCRIPT_BLOCK = /<script\b[^>]{0,200}>[\s\S]{0,4000}<\/script>/gi;
const HTML_TAG = /<\/?[a-zA-Z][^>]{0,200}>/g;
const JS_PROTOCOL = /javascript\s*:/gi;
const EVENT_HANDLER = /\son[a-z]{2,32}\s*=/gi;
const SQL_KEYWORDS = /\b(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|EXEC|TRUNCATE)\b/gi;
const SQL_COMMENTS = /--|\/\*|\*\//g;
const SAFE_ID = /^[a-z0-9-]{1,64}$/;
const SUPPORTED_LANGUAGES = new Set(['en', 'my']);

function isUnsafeControlChar(code) {
  return code <= 8 || code === 11 || code === 12 || (code >= 14 && code <= 31) || code === 127;
}

export function stripInvisibleDirectionChars(value) {
  return Array.from(String(value ?? ''))
    .filter((char) => !isUnsafeControlChar(char.codePointAt(0) ?? 0))
    .join('')
    .replace(BIDI_AND_INVISIBLE, '');
}

export function stripXss(value) {
  return stripInvisibleDirectionChars(value)
    .replace(SCRIPT_BLOCK, '')
    .replace(EVENT_HANDLER, ' ')
    .replace(JS_PROTOCOL, '')
    .replace(HTML_TAG, '');
}

export function stripSqlMeta(value) {
  return stripXss(value)
    .replace(SQL_COMMENTS, '')
    .replace(SQL_KEYWORDS, '')
    .replace(/['"`;\\]/g, '');
}

export function sanitizeText(value, maxLength = 240) {
  return stripSqlMeta(value).replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

export function sanitizeId(value) {
  const id = stripInvisibleDirectionChars(value).trim().toLowerCase();
  return SAFE_ID.test(id) ? id : '';
}

export function sanitizeInteger(value, { min = 0, max = 20 } = {}) {
  const numeric = Number.parseInt(String(value), 10);
  if (!Number.isFinite(numeric)) return min;
  return Math.min(max, Math.max(min, numeric));
}

export function sanitizeLanguage(value) {
  const language = stripInvisibleDirectionChars(value).trim().toLowerCase();
  return SUPPORTED_LANGUAGES.has(language) ? language : 'my';
}

export function sanitizeHref(value) {
  const href = stripInvisibleDirectionChars(value).trim();
  if (/^(https:\/\/|tel:|mailto:|\/)/i.test(href) && !JS_PROTOCOL.test(href)) {
    return href;
  }
  return '';
}
