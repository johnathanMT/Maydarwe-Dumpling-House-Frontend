/**
 * Menu data. Plain JavaScript only (no JSX, no image imports) so the build
 * can read it too: vite.config.js turns it into the Restaurant JSON-LD.
 * Photos are looked up by `photo` key in src/assets/photos/index.js;
 * category icons live in src/components/menu/categoryIcons.js.
 * `meatType` ('prawn' | 'pork' | 'chicken' | null) shows a badge on the dish photo;
 * leave it null when a dish has no single main meat.
 */
import { toMyanmarDigits } from '../lib/digits.js';

export const MENU_ITEMS = [
  {
    id: 'chicken-pan-fried',
    category: 'dumplings',
    meatType: 'chicken',
    price: 18000,
    inStock: true,
    featured: true,
    photo: 'chickenPanFried',
    name: { en: 'Chicken Pan-Fried Dumpling', my: 'ကြက်သားဖက်ထုပ်အိုးကပ်' },
    blurb: { en: 'Light chicken filling, pan-crisped.', my: 'ပေါ့ပါးသော ကြက်သားဖြည့်စွက်၊ အကြော်။' },
  },
  {
    id: 'pork-pan-fried',
    category: 'dumplings',
    meatType: 'pork',
    price: 20000,
    inStock: true,
    featured: true,
    photo: 'porkPanFried',
    name: { en: 'Pork Pan-Fried Dumpling', my: 'ဝက်သားဖက်ထုပ်အိုးကပ်' },
    blurb: { en: 'Classic pork, seared until golden.', my: 'ရွှေရောင်ကြွပ်သည်အထိ ကြော်ထားသော ဝက်သားဖက်ထုပ်။' },
  },
  {
    id: 'hot-sour-dumpling-soup',
    category: 'dumplings',
    meatType: null,
    price: 3500,
    inStock: true,
    photo: 'hotSourDumpling',
    name: { en: 'Hot & Sour Dumpling Soup', my: 'ဖက်ထုပ်ပြုတ်ချဥ်စပ်' },
    blurb: { en: 'Boiled dumplings in a hot-and-sour broth.', my: 'ချဥ်စပ်ဟင်းရည်နှင့် ဖက်ထုပ်ပြုတ်။' },
  },
  {
    id: 'dumpling-garlic-oil',
    category: 'dumplings',
    meatType: null,
    price: 3500,
    inStock: true,
    name: { en: 'Dumpling with Garlic Oil', my: 'ဖက်ထုပ်ဆီချက်' },
    blurb: { en: 'Dumplings tossed in toasted garlic oil.', my: 'ကြက်သွန်ဖြူဆီနှင့် ချက်ထားသော ဖက်ထုပ်။' },
  },
  {
    id: 'mala-boiled-dumpling',
    category: 'dumplings',
    meatType: null,
    price: 3500,
    inStock: true,
    photo: 'malaBoiledDumpling',
    name: { en: 'Mala Boiled Dumpling', my: 'မာလာဖက်ထုပ်ပြုတ်' },
    blurb: { en: 'Dumplings boiled in mala broth.', my: 'မာလာဟင်းရည်တွင် ပြုတ်ထားသော ဖက်ထုပ်။' },
  },
  {
    id: 'spicy-noodle-salad',
    category: 'mala',
    meatType: null,
    price: 9000,
    inStock: true,
    photo: 'spicyNoodleSalad',
    name: { en: 'Mala Noodle Salad / Mala Skewer Salad', my: 'မာလာခေါက်ဆွဲသုပ်၊ မာလာအကင်သုပ်' },
    blurb: { en: 'Mala-dressed noodles or grilled skewers.', my: 'မာလာခေါက်ဆွဲသုပ် သို့မဟုတ် မာလာအကင်သုပ်။' },
  },
  {
    id: 'black-chicken-mala',
    category: 'mala',
    meatType: 'chicken',
    price: 15000,
    inStock: true,
    featured: true,
    photo: 'blackChickenMala',
    name: { en: 'Mala Curry / Black Chicken Mala', my: 'မာလာဟင်း၊ ကြက်မဲမာလာ' },
    blurb: { en: 'Mala curry, also as black chicken mala.', my: 'မာလာဟင်း၊ သို့မဟုတ် ကြက်မဲမာလာ။' },
  },
  {
    id: 'mala-chicken-feet',
    category: 'mala',
    meatType: 'chicken',
    price: 9000,
    inStock: true,
    photo: 'malaChickenFeet',
    name: { en: 'Mala Chicken Feet', my: 'ကြက်ခြေထောက်မာလာ' },
    blurb: { en: 'Slow-braised, fragrant chili oil.', my: 'ကြာရှည်ပြုတ်ပြီး မွှေးသော ငရုတ်ဆီ။' },
  },
  {
    id: 'mala-xiang-guo',
    category: 'mala',
    meatType: null,
    price: 15000,
    inStock: true,
    photo: 'malaXiangGuo',
    name: { en: 'Mala Xiang Guo - Chicken, Black Chicken, Pork', my: 'မာလာရှမ်းကော(ကြက်၊ ကြက်မဲ၊ ဝက်)' },
    blurb: { en: 'Dry pot — choose chicken, black chicken or pork.', my: 'ကြက်၊ ကြက်မဲ သို့မဟုတ် ဝက်သား ရွေးချယ်နိုင်သည်။' },
  },
  {
    id: 'kway-teow',
    category: 'noodles',
    meatType: null,
    price: 3500,
    inStock: true,
    name: { en: 'Kway Teow - Salad / Soup', my: 'ကွေ့တီယို (သုပ် / ရည်)' },
    blurb: { en: 'Rice noodles, as salad or in soup.', my: 'သုပ် သို့မဟုတ် ဟင်းရည်။' },
  },
  {
    id: 'claypot-noodle',
    category: 'noodles',
    meatType: null,
    price: 9500,
    inStock: true,
    photo: 'claypotNoodle',
    name: { en: 'Claypot Mee Shay', my: 'မြေအိုးမြီးရှည်' },
    blurb: { en: 'Rice vermicelli cooked in a clay pot.', my: 'မြေအိုးတွင် ချက်သော မြီးရှည်။' },
  },
  {
    id: 'shan-noodles',
    category: 'noodles',
    meatType: null,
    price: 5000,
    inStock: true,
    photo: 'shanNoodles',
    name: { en: 'Shan Noodle / Mee Shay Salad', my: 'ရှမ်းခေါက်ဆွဲ၊ မြီးရှည်သုပ်' },
    blurb: { en: 'Shan noodles or mee shay salad.', my: 'ရှမ်းခေါက်ဆွဲ သို့မဟုတ် မြီးရှည်သုပ်။' },
  },
  {
    id: 'garlic-oil-noodles',
    category: 'noodles',
    meatType: null,
    price: 5000,
    inStock: true,
    photo: 'garlicOilNoodles',
    name: { en: 'Si Chet Noodle / Vermicelli Si Chet', my: 'ဆီချက်ခေါက်ဆွဲ၊ ကြာဇံဆီချက်' },
    blurb: { en: 'Garlic-oil noodles or vermicelli si chet.', my: 'ဆီချက်ခေါက်ဆွဲ သို့မဟုတ် ကြာဇံဆီချက်။' },
  },
];

export const CATEGORIES = [
  {
    id: 'dumplings',
    title: { en: 'Delicious and most popular main dumplings', my: 'အရသာရှိ၍ လူကြိုက်အများဆုံး အဓိက ဖက်ထုပ်များ' },
    caption: { en: 'Pan-fried and boiled dumplings.', my: 'ဖက်ထုပ်အိုးကပ်နှင့် ဖက်ထုပ်ပြုတ်များ' },
  },
  {
    id: 'mala',
    title: { en: 'Mala & Spicy', my: 'မာလာနှင့် အစပ်' },
    caption: { en: 'Heat, fragrance, Sichuan spice.', my: 'အစပ်၊ ရနံ့နှင့် စီချွမ်အရသာ။' },
  },
  {
    id: 'noodles',
    title: { en: 'Noodles & Soups', my: 'ခေါက်ဆွဲနှင့် ဟင်းချို' },
    caption: { en: 'Comfort bowls, cooked fresh.', my: 'လတ်ဆတ်စွာချက်သော ခေါက်ဆွဲများ။' },
  },
];

export const FEATURED_ITEMS = MENU_ITEMS.filter((item) => item.featured);

/** 25000 → "Ks 25,000" (en) or "၂၅,၀၀၀ ကျပ်" (my). */
export function formatPrice(amount, language = 'en') {
  const grouped = new Intl.NumberFormat('en-US').format(amount);
  if (language === 'my') return `${toMyanmarDigits(grouped)} ကျပ်`;
  return `Ks ${grouped}`;
}

export function pickLocale(value, language) {
  return language === 'my' ? value.my : value.en;
}
