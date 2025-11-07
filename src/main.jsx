import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookList from './components/BookList'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="books" element={<BookList />} />
          <Route path="books/:id" element={<BookDetail />} />
        </Route>
        <Route path="*" element={<div className="text-center py-8">Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
