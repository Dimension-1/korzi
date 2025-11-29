import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import JournalPage from './pages/JournalPage'
import JournalDetailPage from './pages/JournalDetailPage'
import ComingSoonPage from './pages/ComingSoonPage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import SupportPage from './pages/SupportPage'
import LoginPage from './pages/LoginPage'
import CustomerActivationPage from './pages/CustomerActivationPage'
import ShopifyActivationRedirect from './pages/ShopifyActivationRedirect'
import CheckoutPage from './components/CheckoutPage'
import OrderConfirmationPage from './components/OrderConfirmationPage'
import OrdersPage from './components/OrdersPage'
import ThankYouPage from './pages/ThankYouPage'
import ErrorPage from './pages/ErrorPage'
import { useCartStore } from './stores/cartStore'
import { useAuthStore } from './stores/authStore'

function App() {
  const { initializeCart, refreshCartCount } = useCartStore();
  const { restoreFromPersistence } = useAuthStore();

  // Initialize app state when it loads
  useEffect(() => {
    // Initialize cart from Shopify (this will also update cart count)
    initializeCart();
    
    // Restore auth state from minimal persisted data
    restoreFromPersistence();
  }, [initializeCart, restoreFromPersistence]);

  // Refresh cart count when app becomes visible (user switches back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('App became visible, refreshing cart count...');
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
      console.log('Periodic cart count refresh...');
      refreshCartCount();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [refreshCartCount]);

  return (    
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
  )
}

export default App
