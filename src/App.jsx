import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ToastContainer from './components/common/Toast';

// Pages
import HomePage          from './pages/HomePage';
import LoginPage         from './pages/LoginPage';
import OtpPage           from './pages/OtpPage';
import CategoriesPage    from './pages/CategoriesPage';
import ProductsPage      from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage          from './pages/CartPage';
import AdminDashboard    from './pages/AdminDashboard';

import './styles/global.css';

// ── Protected Admin Route
function AdminRoute({ children }) {
  const { user } = useCart();
  const isAdmin = user && (user.includes('admin') || user.includes('manager'));
  return isAdmin ? children : <Navigate to="/login" replace />;
}

// ── Layout wrapper (with Navbar + Footer)
function WithLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

// ── Auth layout (no Navbar/Footer)
function AuthLayout({ children }) {
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public routes with layout */}
        <Route path="/"            element={<WithLayout><HomePage /></WithLayout>} />
        <Route path="/categories"  element={<WithLayout><CategoriesPage /></WithLayout>} />
        <Route path="/products"    element={<WithLayout><ProductsPage /></WithLayout>} />
        <Route path="/product/:id" element={<WithLayout><ProductDetailPage /></WithLayout>} />
        <Route path="/cart"        element={<WithLayout><CartPage /></WithLayout>} />

        {/* Auth routes (no layout) */}
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/otp"   element={<AuthLayout><OtpPage /></AuthLayout>} />

        {/* Admin (no Navbar/Footer, full-screen layout) */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        {/* 404 */}
        <Route path="*" element={
          <WithLayout>
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <div style={{ fontSize: 72, marginBottom: 16 }}>🔍</div>
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Page Not Found</h2>
              <p style={{ color: 'var(--text-2)', marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
            </div>
          </WithLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}
