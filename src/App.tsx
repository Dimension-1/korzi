import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ErrorPage from './pages/ErrorPage'

// Lazy-loaded pages (not critical for initial load)
const JournalPage = lazy(() => import('./pages/JournalPage'))
const JournalDetailPage = lazy(() => import('./pages/JournalDetailPage'))
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const ReturnExchangePage = lazy(() => import('./pages/ReturnExchangePage'))
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'))
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'))
const SupportPage = lazy(() => import('./pages/SupportPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const CustomerActivationPage = lazy(() => import('./pages/CustomerActivationPage'))
const ShopifyActivationRedirect = lazy(() => import('./pages/ShopifyActivationRedirect'))
const CheckoutPage = lazy(() => import('./components/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('./components/OrderConfirmationPage'))
const OrdersPage = lazy(() => import('./components/OrdersPage'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'))
import { useCartStore } from './stores/cartStore'
import { useAuthStore } from './stores/authStore'
import { initMetaPixel } from './services/metaPixels'

function App() {
  const { initializeCart, refreshCartCount } = useCartStore();
  const { restoreFromPersistence } = useAuthStore();
  const location = useLocation();
  const navigationType = useNavigationType();

  // Scroll to top only for PUSH navigation (forward), not POP (back)
  useEffect(() => {
    if (navigationType === 'PUSH') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigationType]);

  // Initialize app state when it loads
  useEffect(() => {
    // Initialize cart from Shopify (this will also update cart count)
    initializeCart();

    // Initialize met pixels for analytics
    initMetaPixel();
    
    // Restore auth state from minimal persisted data
    restoreFromPersistence();
  }, [initializeCart, restoreFromPersistence]);

  // Refresh cart count when app becomes visible (user switches back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshCartCount();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshCartCount]);

  // Periodic cart count refresh (every 30 seconds) to keep count accurate
  useEffect(() => {
    const interval = setInterval(() => {
      refreshCartCount();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [refreshCartCount]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/more" element={<ComingSoonPage />} />
          <Route path="/logs" element={<JournalPage />} />
          <Route path="/logs/:slug" element={<JournalDetailPage />} />
          <Route path="/shop" element={<ProductDetailPage />} />
          <Route path="/oldshop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/return-exchange" element={<ReturnExchangePage />} />
          <Route path="/shipping" element={<ShippingPolicyPage />} />
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route path="/signin" element={<LoginPage />} />
        <Route path="/activate" element={<CustomerActivationPage />} />
        <Route path="/account/activate/:customerId/:activationToken" element={<ShopifyActivationRedirect />} />
        <Route path="/account/activate/:customerId/:activationToken/*" element={<ShopifyActivationRedirect />} />
      </Routes>
    </Suspense>
  )
}

export default App
