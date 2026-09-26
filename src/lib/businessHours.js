import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BUSINESS, formatTimeEn } from '../constants/site';

const MY_DIGITS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

/** Latin digits → Burmese digits ("2021" → "၂၀၂၁"). */
export function toMyanmarDigits(value) {
  return String(value).replace(/\d/g, (d) => MY_DIGITS[Number(d)]);
}

function burmesePeriod(hour) {
  if (hour < 12) return 'မနက်';
  if (hour < 16) return 'နေ့လယ်';
  if (hour < 19) return 'ညနေ';
  return 'ည';
}

/** "20:00" → "8:00 PM" (en) or "ည ၈:၀၀ နာရီ" (my). */
export function formatTime(hhmm, lang) {
  if (lang !== 'my') return formatTimeEn(hhmm);
  const [h, m] = hhmm.split(':').map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${burmesePeriod(h)} ${toMyanmarDigits(`${hour12}:${String(m).padStart(2, '0')}`)} နာရီ`;
}

export function formatYear(year, lang) {
  return lang === 'my' ? toMyanmarDigits(year) : String(year);
}

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Minutes since midnight in the shop's own time zone, whatever the visitor's clock says. */
function shopMinutes(date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: BUSINESS.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get('hour') * 60 + get('minute');
}

export function isOpenAt(date = new Date()) {
  const now = shopMinutes(date);
  return now >= toMinutes(BUSINESS.hours.opens) && now < toMinutes(BUSINESS.hours.closes);
}

/** Re-renders every `intervalMs` so "Open now" flips at the right minute. */
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

/** Current UI language, normalised to 'en' | 'my'. */
export function useLang() {
  const { i18n } = useTranslation();
  return i18n.resolvedLanguage === 'my' ? 'my' : 'en';
}

/** Interpolation values for translation strings that mention hours or the founding year. */
export function useBusinessCopy() {
  const lang = useLang();
  return {
    open: formatTime(BUSINESS.hours.opens, lang),
    close: formatTime(BUSINESS.hours.closes, lang),
    year: formatYear(BUSINESS.established, lang),
    city: BUSINESS.address.city[lang],
  };
}

/** { isOpen, label } for badges like "Open now · until 8:00 PM". */
export function useOpenStatus() {
  const { t } = useTranslation();
  const now = useNow();
  const copy = useBusinessCopy();
  const open = isOpenAt(now);
  return {
    isOpen: open,
    label: open ? t('hours.openUntil', copy) : t('hours.closedOpensAt', copy),
  };
}
