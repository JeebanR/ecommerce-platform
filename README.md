# 🛒 Bodegaa E-Commerce Platform

A market-standard React e-commerce application inspired by bodegaa.in — built with React 18, React Router v6, Context API, and CSS Modules.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── ProductCard.jsx       # Reusable product card with cart/wishlist
│   │   ├── ProductCard.module.css
│   │   ├── StarRating.jsx        # Reusable star rating component
│   │   ├── StarRating.module.css
│   │   ├── Toast.jsx             # Global toast notifications
│   │   └── Toast.module.css
│   └── layout/
│       ├── Navbar.jsx            # Sticky navbar with search, cart, auth
│       ├── Navbar.module.css
│       ├── Footer.jsx            # Full footer with links, social, app download
│       └── Footer.module.css
├── context/
│   └── CartContext.jsx           # Global state: cart, wishlist, user, toasts
├── data/
│   └── index.js                  # Products, categories, admin mock data
├── pages/
│   ├── HomePage.jsx              # Hero, categories, trending, banners, app CTA
│   ├── HomePage.module.css
│   ├── LoginPage.jsx             # Two-panel login with validation
│   ├── OtpPage.jsx               # 6-digit OTP with countdown timer
│   ├── AuthPages.module.css      # Shared auth styles
│   ├── CategoriesPage.jsx        # Category cards with product preview
│   ├── CategoriesPage.module.css
│   ├── ProductsPage.jsx          # Filter sidebar, search, sort, product grid
│   ├── ProductsPage.module.css
│   ├── ProductDetailPage.jsx     # Full product detail with tabs, related products
│   ├── ProductDetailPage.module.css
│   ├── CartPage.jsx              # Cart items, qty control, order summary
│   ├── CartPage.module.css
│   ├── AdminDashboard.jsx        # Admin: sidebar, stats, orders, products tables
│   └── AdminDashboard.module.css
├── styles/
│   └── global.css                # CSS variables, reset, utility classes
├── App.jsx                       # React Router setup, route guards
└── index.js                      # React DOM entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ and npm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open in browser
http://localhost:3000
```

---

## 🖥️ Screens & Routes

| Screen               | Route              | Description                                           |
|---------------------|--------------------|-------------------------------------------------------|
| Home                | `/`                | Hero, categories, trending, promos, app banner        |
| Login               | `/login`           | Split-panel login with form validation                |
| OTP Verification    | `/otp`             | 6-digit OTP with countdown and paste support          |
| Categories          | `/categories`      | All category cards with product previews              |
| Product Listing     | `/products`        | Sidebar filters, search, sort, paginated grid         |
| Product Detail      | `/product/:id`     | Full detail, tabs, related products                   |
| Cart                | `/cart`            | Line items, qty control, order summary, free delivery |
| Admin Dashboard     | `/admin`           | Stats, orders table, products table (admin only)      |

---

## 🔑 Demo Credentials

| Role          | Email                      | Password  |
|---------------|----------------------------|-----------|
| Admin User    | `admin@bodegaa.com`        | any 6+    |
| Regular User  | `user@example.com`         | any 6+    |

> After login, enter any 6 digits on the OTP screen.  
> Admin panel visible only to emails containing `admin` or `manager`.

---

## 🏗️ Architecture

### State Management
- **CartContext** — `useReducer` + `createContext` for global state
  - Cart items (add, remove, update qty, clear)
  - Wishlist (toggle)
  - User auth (set/logout)
  - Toast notifications queue

### Routing
- **React Router v6** — declarative routes with `<Routes>` and `<Route>`
- Protected `/admin` route with redirect to login if not authenticated
- URL-based category filtering via `useSearchParams`

### Styling
- **CSS Modules** — scoped styles per component
- **CSS Custom Properties** — design tokens in `:root`
- **Google Fonts** — Syne (display) + Plus Jakarta Sans (body)

---

## 🔌 API Integration Guide

Replace the mock data in `src/data/index.js` with real API calls:

```js
// Example: Replace static PRODUCTS with API
export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const res = await fetch(`/api/products?${params}`);
  return res.json();
};

// API endpoints to implement:
// GET  /api/products           → Product listing
// GET  /api/products/:id       → Product detail
// GET  /api/categories         → Category list
// POST /api/auth/login         → Login
// POST /api/auth/otp/verify    → OTP verification
// GET  /api/cart               → Fetch cart
// POST /api/cart               → Add to cart
// PUT  /api/cart/:id           → Update qty
// DEL  /api/cart/:id           → Remove item
// GET  /api/admin/stats        → Dashboard stats
// GET  /api/admin/orders       → Order management
```

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.22.0",
  "react-scripts": "5.0.1"
}
```

---

© 2025 Bodegaa Supermarkets Pvt. Ltd. | Assignment Build
