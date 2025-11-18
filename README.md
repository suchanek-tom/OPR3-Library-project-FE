# 📚 Library System - Frontend

**Author:** Tomáš Suchanek | **Subject:** 7OPR3 | **Framework:** React 18 + TypeScript + Vite

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:8080`

### Installation & Run

```bash
npm install
npm run dev
# App runs on http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📖 Features

### Authentication

- ✅ User registration with validation
- ✅ JWT-based login
- ✅ Protected routes
- ✅ Role-based access (User/Admin)
- ✅ Password encryption

### Book Management

- ✅ Browse all books
- ✅ Search and filter by availability
- ✅ View book details
- ✅ Add/Edit/Delete books (Admin only)
- ✅ Real-time availability status

### Loan System

- ✅ Borrow books
- ✅ Return books
- ✅ View loan history
- ✅ Track active loans
- ✅ Admin loan overview

### User Management

- ✅ User profile editing
- ✅ Admin user management
- ✅ View user loan statistics

---

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── book/           # Book-related components
│   ├── form/           # Form components
│   └── loan/           # Loan components
├── pages/              # Page components
│   ├── auth/           # Login & Register
│   ├── Home.tsx
│   ├── BookDetail.tsx
│   ├── AddBook.tsx
│   ├── Profile.tsx
│   ├── MyLoans.tsx
│   └── AdminUsers.tsx
├── types/              # TypeScript interfaces
├── utils/              # API utilities & helpers
│   ├── authHeaders.ts  # JWT token management
│   ├── bookApi.ts      # Book API calls
│   ├── loanApi.ts      # Loan API calls
│   ├── userApi.ts      # User API calls
│   └── validation.ts   # Form validation
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

---

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **JWT** - Authentication

---

## 🔒 Security Features

- JWT token storage in localStorage
- Protected routes with authentication
- Role-based access control
- Password validation
- Input sanitization
- Error handling

---

## 🎨 UI Components

- Responsive design
- Loading states
- Error messages
- Success notifications
- Modal dialogs
- Toast notifications
- Availability badges
- Search & filters

---

## 📝 API Integration

All API calls connect to `http://localhost:8080/api/`

- `/users` - User management
- `/books` - Book operations
- `/loans` - Loan operations

Auth headers automatically attached via `getAuthHeaders()` utility.

---

**Status:** ✅ Complete | **Date:** November 18, 2025
