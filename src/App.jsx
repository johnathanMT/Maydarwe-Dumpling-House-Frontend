import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import AnnouncementBar from './components/ui/AnnouncementBar';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import CartToast from './components/ui/CartToast';
import ConstructionPopup from './components/ui/ConstructionPopup';
import { CartProvider } from './context/CartContext';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function PageFallback() {
  return <div className="min-h-[40vh] bg-white" aria-hidden="true" />;
}

function Layout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-dvh flex-col bg-white pb-[5.75rem] lg:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
      >
        {t('nav.skip')}
      </a>

      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <ConstructionPopup />

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
      <ScrollRestoration />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <Menu /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
