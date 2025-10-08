import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import JournalPage from './pages/JournalPage'
import JournalDetailPage from './pages/JournalDetailPage'
import ComingSoonPage from './pages/ComingSoonPage'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logs" element={<JournalPage />} />
        <Route path="/:slug" element={<JournalDetailPage />} />
        <Route path="/comming-soon" element={<ComingSoonPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App
