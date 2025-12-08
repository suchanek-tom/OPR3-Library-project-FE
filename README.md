# 📚 Library System - Frontend

**Author:** Tomáš Suchanek | **Subject:** 7OPR3 | **Framework:** React 19 + TypeScript + Vite | 2025

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:8080`

### Installation & Run

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
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

- **React 19.1** - Modern UI library with improved hooks
- **TypeScript** - Type safety
- **Vite 7** - Fast build tool & dev server
- **React Router 6** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **React Hook Form 7** - Efficient form state management
- **React Icons 5** - Icon library
- **JWT** - JWT-based authentication

---

## 🔒 Security Features

- ✅ JWT token storage in localStorage
- ✅ Protected routes requiring authentication
- ✅ Role-based access control (User/Admin roles)
- ✅ Client-side form validation
- ✅ Backend validation with error responses
- ✅ Password confirmation on registration
- ✅ Secure token-based API requests
- ✅ Automatic error boundary handling

---

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop, tablet, mobile
- **Loading States** - User feedback during API calls
- **Error Messages** - Clear validation error display
- **Toast Notifications** - Success/error notifications
- **Modal Dialogs** - Confirmation for destructive actions
- **Availability Badges** - Visual book status indicators
- **Search & Filters** - Find books by availability
- **Accessible Forms** - Proper labels and input validation
- **Dark-Friendly UI** - Clean gray/blue color palette
- **Icon Support** - React Icons for better UX

---

## 📝 API Integration

All API calls connect to `http://localhost:8080/api/`

### Endpoints

- **Users**: `/users` - Login, Register, Profile, User Management
- **Books**: `/books` - List, Search, Details, Create, Update, Delete
- **Loans**: `/loans` - Borrow, Return, View History, Admin Overview

### Authentication

- JWT token auto-attached to all requests via `getAuthHeaders()`
- Token stored in localStorage
- Token refreshed on each successful login
- Protected endpoints require valid token

---

## 🧪 Form Validation

- **Registration Form**: Name, Email, Password, Address, City
- **Login Form**: Email, Password
- **Book Form**: Title, Author, ISBN, Publication Year
- **Profile Form**: Name, Surname, Email, Address, City

Real-time validation with user-friendly error messages.

---

## 📊 Pages & Routes

| Route          | Access        | Purpose             |
| -------------- | ------------- | ------------------- |
| `/`            | Public        | Home - Browse Books |
| `/login`       | Public        | User Login          |
| `/register`    | Public        | User Registration   |
| `/book/:id`    | Authenticated | Book Details        |
| `/add-book`    | Admin Only    | Create Book         |
| `/profile`     | Authenticated | User Profile        |
| `/my-loans`    | Authenticated | View Active Loans   |
| `/admin/users` | Admin Only    | Manage Users        |

---

## 🔐 User Roles

### Regular User

- View all books
- Search books by availability
- Borrow/return books
- View own loan history
- Edit profile

### Admin

- All user permissions
- Add/Edit/Delete books
- Bulk book creation
- Manage all users
- View all loans
