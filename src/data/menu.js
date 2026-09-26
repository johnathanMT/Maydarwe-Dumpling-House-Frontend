/**
 * Menu data. Plain JavaScript only (no JSX, no image imports) so the build
 * can read it too: vite.config.js turns it into the Restaurant JSON-LD.
 * Photos are looked up by `photo` key in src/assets/photos/index.js;
 * category icons live in src/components/menu/categoryIcons.js.
 */
import { toMyanmarDigits } from '../lib/digits.js';

export const MENU_ITEMS = [
  {
    id: 'prawn-pan-fried',
    category: 'dumplings',
    price: 25000,
    inStock: true,
    featured: true,
    photo: 'prawnPanFried',
    name: { en: 'Prawn Pan-Fried Dumplings', my: 'ပုဇွန်အကြော်ဖက်ထုပ်' },
    blurb: { en: 'Crisp bottoms, juicy prawn filling.', my: 'အောက်ခံကြွပ်ပြီး ပုဇွန်အသားဖြည့်စွက်ထားသည်။' },
  },
  {
    id: 'pork-pan-fried',
    category: 'dumplings',
    price: 20000,
    inStock: true,
    featured: true,
    photo: 'porkPanFried',
    name: { en: 'Pork Pan-Fried Dumplings', my: 'ဝက်သားအကြော်ဖက်ထုပ်' },
    blurb: { en: 'Classic pork, seared until golden.', my: 'ရွှေရောင်ကြွပ်သည်အထိ ကြော်ထားသော ဝက်သားဖက်ထုပ်။' },
  },
  {
    id: 'chicken-pan-fried',
    category: 'dumplings',
    price: 18000,
    inStock: true,
    featured: true,
    photo: 'chickenPanFried',
    name: { en: 'Chicken Pan-Fried Dumplings', my: 'ကြက်သားအကြော်ဖက်ထုပ်' },
    blurb: { en: 'Light chicken filling, pan-crisped.', my: 'ပေါ့ပါးသော ကြက်သားဖြည့်စွက်၊ အကြော်။' },
  },
  {
    id: 'dumpling-soup',
    category: 'dumplings',
    price: 5500,
    inStock: true,
    name: { en: 'Dumpling Soup', my: 'ဖက်ထုပ်ဟင်းချို' },
    blurb: { en: 'Clear broth with handmade dumplings.', my: 'လက်လုပ်ဖက်ထုပ်များနှင့် ကြည်လင်သော ဟင်းရည်။' },
  },
  {
    id: 'mala-xiang-guo',
    category: 'mala',
    price: 15000,
    inStock: false,
    photo: 'malaXiangGuo',
    name: { en: 'Mala Xiang Guo', my: 'မာလာရှန်ကော' },
    blurb: { en: 'Numbing-spicy dry pot, cooked to order.', my: 'မှာယူသည့်အချိန်ချက်သော စပ်ပြီးထုံသော အခြောက်အိုး။' },
  },
  {
    id: 'mala-chicken-feet',
    category: 'mala',
    price: 9000,
    inStock: true,
    photo: 'malaChickenFeet',
    name: { en: 'Mala Chicken Feet', my: 'မာလာကြက်ခြေ' },
    blurb: { en: 'Slow-braised, fragrant chili oil.', my: 'ကြာရှည်ပြုတ်ပြီး မွှေးသော ငရုတ်ဆီ။' },
  },
  {
    id: 'spicy-noodle-salad',
    category: 'mala',
    price: 9000,
    inStock: true,
    photo: 'spicyNoodleSalad',
    name: { en: 'Spicy Noodle Salad', my: 'အစပ်ခေါက်ဆွဲသုပ်' },
    blurb: { en: 'Cold noodles, chili, herbs, crunch.', my: 'အေးသောခေါက်ဆွဲ၊ ငရုတ်သီး၊ ဟင်းသီးဟင်းရွက်။' },
  },
  {
    id: 'claypot-noodle',
    category: 'noodles',
    price: 9500,
    inStock: true,
    photo: 'claypotNoodle',
    name: { en: 'Claypot Noodle', my: 'ရွှံ့အိုးခေါက်ဆွဲ' },
    blurb: { en: 'Served bubbling in a clay pot.', my: 'ရွှံ့အိုးထဲတွင် ပူပူနွေးနွေး တည်ခင်းသည်။' },
  },
  {
    id: 'shan-noodles',
    category: 'noodles',
    price: 5000,
    inStock: true,
    name: { en: 'Shan Noodles', my: 'ရှမ်းခေါက်ဆွဲ' },
    blurb: { en: 'Tomato sauce, crushed peanuts, herbs.', my: 'ခရမ်းချဉ်ဆော့စ်၊ မြေပဲမှုန့်နှင့် ဟင်းသီးဟင်းရွက်။' },
  },
  {
    id: 'garlic-oil-noodles',
    category: 'noodles',
    price: 5000,
    inStock: true,
    name: { en: 'Garlic Oil Noodles', my: 'ကြက်သွန်ဖြူဆီခေါက်ဆွဲ' },
    blurb: { en: 'Wok-tossed noodles, toasted garlic.', my: 'မီးဖိုပေါ်တွင် လှော်ထားသော ကြက်သွန်ဖြူဆီခေါက်ဆွဲ။' },
  },
];

export const CATEGORIES = [
  {
    id: 'dumplings',
    title: { en: 'Signature Dumplings', my: 'အထူးဖက်ထုပ်များ' },
    caption: { en: 'Pan-fried and in broth.', my: 'အကြော်နှင့် ဟင်းရည်။' },
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
