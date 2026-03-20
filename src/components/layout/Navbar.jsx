import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { cartCount, wishlist, user, logout } = useCart();
  const [search, setSearch]   = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  const isAdmin = user && (user.includes('admin') || user.includes('manager'));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <span>🚚 Free delivery on orders above ₹499</span>
          <span>📞 +91 8249829625 &nbsp;|&nbsp; Mon–Sat 9AM–6PM</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className={styles.nav}>
        <div className={styles.navInner}>
          {/* Logo */}
          <div className={styles.logo} onClick={() => navigate('/')}>
            <span className={styles.logoIcon}>🛒</span>
            <span className={styles.logoText}>jeevan</span>
          </div>

          {/* Location Pill */}
          <div className={styles.locationPill}>
            <span className={styles.locationPin}>📍</span>
            <div className={styles.locationText}>
              <span className={styles.locationLabel}>Deliver to</span>
              <span className={styles.locationValue}>Hyderabad, 500049</span>
            </div>
          </div>

          {/* Search Bar */}
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              placeholder="Search for groceries, vegetables, fruits…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn}>Search</button>
          </form>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={() => navigate('/products')}
            >
              <span className={styles.iconBtnIcon}>🏪</span>
              <span className={styles.iconBtnLabel}>Shop</span>
            </button>

            <button className={`${styles.iconBtn} ${styles.wishlistBtn}`} onClick={() => navigate('/products')}>
              <span className={styles.iconBtnIcon}>♡</span>
              <span className={styles.iconBtnLabel}>Wishlist</span>
              {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
            </button>

            <button
              className={`${styles.iconBtn} ${styles.cartBtn}`}
              onClick={() => navigate('/cart')}
            >
              <span className={styles.iconBtnIcon}>🛒</span>
              <span className={styles.iconBtnLabel}>Cart</span>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>

            {user ? (
              <div className={styles.userMenu}>
                <div className={styles.avatarBtn} onClick={() => setMenuOpen(o => !o)}>
                  <div className={styles.avatar}>{user[0].toUpperCase()}</div>
                  <span className={styles.iconBtnLabel}>{user.split('@')[0]}</span>
                </div>
                {menuOpen && (
                  <div className={styles.dropdown}>
                    {isAdmin && (
                      <button className={styles.dropItem} onClick={() => { navigate('/admin'); setMenuOpen(false); }}>
                        ⚙️ Admin Panel
                      </button>
                    )}
                    <button className={styles.dropItem} onClick={() => { navigate('/'); setMenuOpen(false); }}>
                      👤 My Profile
                    </button>
                    <button className={styles.dropItem} onClick={() => { navigate('/'); setMenuOpen(false); }}>
                      📦 My Orders
                    </button>
                    <hr className={styles.dropDivider} />
                    <button className={`${styles.dropItem} ${styles.dropLogout}`} onClick={() => { logout(); setMenuOpen(false); }}>
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className={styles.loginBtn} onClick={() => navigate('/login')}>
                Login / Register
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Nav */}
      <div className={styles.catNav}>
        <div className={styles.catNavInner}>
          {[
            { label: 'All Categories', path: '/categories' },
            { label: '🥦 Vegetables', path: '/products?cat=1' },
            { label: '🥛 Dairy', path: '/products?cat=2' },
            { label: '🍪 Snacks', path: '/products?cat=3' },
            { label: '🌾 Staples', path: '/products?cat=7' },
            { label: '🧴 Personal Care', path: '/products?cat=6' },
            { label: '🧊 Frozen', path: '/products?cat=8' },
            { label: '🍞 Bakery', path: '/products?cat=4' },
          ].map((item) => (
            <button
              key={item.label}
              className={`${styles.catNavItem} ${location.pathname + location.search === item.path ? styles.catNavActive : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
