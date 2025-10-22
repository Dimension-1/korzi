import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import JournalPage from './pages/JournalPage'
import JournalDetailPage from './pages/JournalDetailPage'
import ComingSoonPage from './pages/ComingSoonPage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/LoginPage'
import CustomerActivationPage from './pages/CustomerActivationPage'
import ShopifyActivationRedirect from './pages/ShopifyActivationRedirect'
import CheckoutPage from './components/CheckoutPage'
import OrderConfirmationPage from './components/OrderConfirmationPage'
import OrdersPage from './components/OrdersPage'
import TestOrderCreation from './components/TestOrderCreation'
import DebugCheckout from './components/DebugCheckout'

function App() {
  return (    
      <Routes>
  <Route path="/" element={<ComingSoonPage />} />

  <Route element={<AppLayout />}>
    <Route path="/logs" element={<JournalPage />} />
    <Route path="/logs/:slug" element={<JournalDetailPage />} />
    <Route path="/shop" element={<ShopPage />} />
    <Route path="/more" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
    <Route path="/orders" element={<OrdersPage />} />
    <Route path="/test-order" element={<TestOrderCreation />} />
    <Route path="/debug-checkout" element={<DebugCheckout />} />
  </Route>

  <Route path="/signin" element={<LoginPage />} />
  <Route path="/activate" element={<CustomerActivationPage />} />
  <Route path="/account/activate/:customerId/:activationToken" element={<ShopifyActivationRedirect />} />
  <Route path="/account/activate/:customerId/:activationToken/*" element={<ShopifyActivationRedirect />} />
</Routes>
  )
}

export default App
