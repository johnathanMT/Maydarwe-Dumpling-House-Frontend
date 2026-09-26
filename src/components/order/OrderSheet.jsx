import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import Sheet, { SheetCloseButton } from '../ui/Sheet';
import OpenStatusBadge from '../ui/OpenStatusBadge';
import OrderRedirectActions from './OrderRedirectActions';
import { useLang } from '../../lib/businessHours';
import { useUiActions, useUiState } from '../../context/UiContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/menu';

/**
 * Header / hero "Order" sheet — same Messenger + Grab + foodpanda actions
 * as the cart drawer, so guests see one ordering pattern everywhere.
 */
export default function OrderSheet() {
  const { t } = useTranslation();
  const { isOrderOpen } = useUiState();
  const { closePanel } = useUiActions();
  const { count, subtotal } = useCart();
  const lang = useLang();
  const titleId = useId();

  return (
    <Sheet open={isOrderOpen} onClose={closePanel} labelledBy={titleId} variant="sheet">
      <div aria-hidden="true" className="h-1.5 shrink-0 bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500" />
      <div aria-hidden="true" className="mx-auto mt-2 h-1 w-10 rounded-full bg-ink-200 sm:hidden" />

      <div className="flex items-start justify-between gap-3 px-5 pb-2 pt-3 sm:px-6 sm:pt-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-700">{t('order.kicker')}</p>
          <h2 id={titleId} className="mt-1 font-display text-2xl font-semibold text-ink-900">
            {t('order.title')}
          </h2>
          <OpenStatusBadge className="mt-2" />
        </div>
        <SheetCloseButton onClick={closePanel} />
      </div>

      <div className="space-y-5 overflow-y-auto px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-6">
        {count > 0 ? (
          <p className="rounded-2xl bg-butter-50 px-4 py-3 text-sm text-ink-700 ring-1 ring-butter-400/60">
            {t('nav.cartCount', { count })} · <span className="font-semibold tabular-nums">{formatPrice(subtotal, lang)}</span>
          </p>
        ) : null}
        <OrderRedirectActions />
      </div>
    </Sheet>
  );
}
