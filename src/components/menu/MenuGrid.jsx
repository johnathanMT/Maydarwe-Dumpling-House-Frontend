import { m } from 'framer-motion';
import DishCard from './DishCard';
import { REVEAL_VIEWPORT, fadeUp, stagger } from '../../lib/motion';
import { SWIPE_ROW } from './swipeRow';

/** @import { Language, MenuItem } from '../../types' */

/**
 * Sideways swipe on a phone; a grid from the md breakpoint up.
 * @param {object} props
 * @param {MenuItem[]} props.items
 * @param {Language} props.language
 * @param {string | null} props.addedId Dish whose button shows "Added" right now.
 * @param {(item: MenuItem) => void} props.onAdd
 */
export default function MenuGrid({ items, language, addedId, onAdd }) {
  return (
    <m.ul
      data-lenis-prevent-horizontal
      className={`no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-6 ${SWIPE_ROW} md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3 lg:gap-8`}
      variants={stagger(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
    >
      {items.map((item) => (
        <m.li
          key={item.id}
          variants={fadeUp(14)}
          className="w-[85vw] shrink-0 snap-center sm:w-[70vw] md:w-auto md:shrink"
        >
          <DishCard item={item} language={language} added={addedId === item.id} onAdd={onAdd} />
        </m.li>
      ))}
    </m.ul>
  );
}
