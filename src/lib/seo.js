import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PRIMARY_PHONE, SITE_URL } from '../constants/site';
import { useBusinessCopy } from './businessHours';

function upsertHeadTag(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

/**
 * Per-route <title>, meta description and canonical URL.
 *
 * index.html ships site-wide defaults (for crawlers that do not run JS);
 * this hook replaces them for the current route. Google renders JS and
 * reads the updated tags, so /menu is indexed as /menu, not as a copy of /.
 *
 * @param {string} pageKey   key under `meta.*` in the translation files
 * @param {object} options
 * @param {string} [options.path]  canonical path, e.g. '/menu'. Omit to skip canonical.
 * @param {boolean} [options.noindex]  mark the page as not indexable (404)
 */
export function usePageMeta(pageKey, { path, noindex = false } = {}) {
  const { t, i18n } = useTranslation();
  const copy = useBusinessCopy();
  const values = { ...copy, phone: PRIMARY_PHONE.display };
  const title = t(`meta.${pageKey}.title`, values);
  const description = t(`meta.${pageKey}.description`, values);
  const lang = i18n.resolvedLanguage;

  useEffect(() => {
    document.title = title;

    const meta = upsertHeadTag('meta[name="description"]', () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'description');
      return el;
    });
    meta.setAttribute('content', description);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (path) {
      const link =
        canonical ??
        upsertHeadTag('link[rel="canonical"]', () => {
          const el = document.createElement('link');
          el.setAttribute('rel', 'canonical');
          return el;
        });
      link.setAttribute('href', `${SITE_URL}${path}`);
    } else if (canonical) {
      canonical.remove();
    }

    let robots = null;
    if (noindex) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      robots.setAttribute('content', 'noindex');
      robots.dataset.route = 'true';
      document.head.appendChild(robots);
    }
    return () => {
      robots?.remove();
    };
  }, [title, description, path, noindex, lang]);
}
