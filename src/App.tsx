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
  </Route>

  <Route path="/signin" element={<LoginPage />} />
  <Route path="/activate" element={<CustomerActivationPage />} />
  <Route path="/account/activate/:customerId/:activationToken" element={<ShopifyActivationRedirect />} />
  <Route path="/account/activate/:customerId/:activationToken/*" element={<ShopifyActivationRedirect />} />
</Routes>
  )
}

export default App
