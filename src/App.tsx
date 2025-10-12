import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import JournalPage from './pages/JournalPage'
import JournalDetailPage from './pages/JournalDetailPage'
import ComingSoonPage from './pages/ComingSoonPage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<ComingSoonPage />} />
        <Route path="/logs" element={<JournalPage />} />
        <Route path="/logs/:slug" element={<JournalDetailPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/more" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App
