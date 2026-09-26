const MY_DIGITS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

/** Latin digits → Burmese digits ("2021" → "၂၀၂၁"). Plain JS: also used at build time. */
export function toMyanmarDigits(value) {
  return String(value).replace(/\d/g, (d) => MY_DIGITS[Number(d)]);
}
