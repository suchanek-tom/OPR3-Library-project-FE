import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookList from './components/book/BookList'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AddBook from './pages/AddBook'
import Profile from './pages/Profile'
import MyLoans from './pages/MyLoans'
import AdminUsers from './pages/AdminUsers'
import ProtectedRoute from './components/auth/ProtectedRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
          <Route path="books/add" element={<AddBook />} />
          <Route path="profile" element={<Profile />} />
          <Route path="loans" element={<MyLoans />} />
          <Route path="admin/users" element={<AdminUsers />} />
        </Route>
        <Route path="*" element={<div className="text-center py-8">Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
