import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import CartDrawer from '../cart/CartDrawer';
import OrderSheet from '../order/OrderSheet';
import AnnouncementBar from '../ui/AnnouncementBar';
import ScrollProgress from '../ui/ScrollProgress';
import BackToTop from '../ui/BackToTop';
import CartToast from '../cart/CartToast';

function PageFallback() {
  return <div className="min-h-[60vh] bg-white" aria-hidden="true" />;
}

/** App shell shared by every route. Pages render into <Outlet />. */
export default function Layout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-dvh flex-col bg-ivory pb-[5.75rem] md:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
      >
        {t('nav.skip')}
      </a>

      {/* Desktop only: on phones it competed with the header and bottom nav. */}
      <div className="hidden lg:block">
        <ScrollProgress />
      </div>
      <AnnouncementBar />
      <Navbar />

      <main id="main" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <BottomNav />
      <BackToTop />
      <CartToast />
      <CartDrawer />
      <OrderSheet />
      <ScrollRestoration />
    </div>
  );
}
