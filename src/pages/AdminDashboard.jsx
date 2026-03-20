import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_STATS, RECENT_ORDERS, PRODUCTS, CATEGORIES } from '../data';
import { useCart } from '../context/CartContext';
import styles from './AdminDashboard.module.css';

const STATUS_COLORS = {
  Delivered:  { bg: '#dcfce7', text: '#16a34a' },
  Processing: { bg: '#fef3c7', text: '#d97706' },
  Shipped:    { bg: '#dbeafe', text: '#2563eb' },
  Cancelled:  { bg: '#fee2e2', text: '#dc2626' },
};

const SIDEBAR_ITEMS = [
  { key: 'overview',   icon: '📊', label: 'Overview'   },
  { key: 'orders',     icon: '📦', label: 'Orders'     },
  { key: 'products',   icon: '🛒', label: 'Products'   },
  { key: 'customers',  icon: '👤', label: 'Customers'  },
  { key: 'analytics',  icon: '📈', label: 'Analytics'  },
  { key: 'settings',   icon: '⚙️', label: 'Settings'   },
];

export default function AdminDashboard() {
  const navigate     = useNavigate();
  const { user, logout } = useCart();
  const [active, setActive] = useState('overview');

  return (
    <div className={styles.layout}>
      {/* ── SIDEBAR ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo} onClick={() => navigate('/')}>
          <span>🛒</span>
          <div>
            <div className={styles.sidebarLogoName}>Jeevan</div>
            <div className={styles.sidebarLogoSub}>Admin Panel</div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {SIDEBAR_ITEMS.map(item => (
            <button
              key={item.key}
              className={`${styles.navItem} ${active === item.key ? styles.navItemActive : ''}`}
              onClick={() => setActive(item.key)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.adminUser}>
            <div className={styles.adminAvatar}>{user?.[0]?.toUpperCase() || 'A'}</div>
            <div>
              <div className={styles.adminName}>{user?.split('@')[0] || 'Admin'}</div>
              <div className={styles.adminRole}>Administrator</div>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/'); }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className={styles.content}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>
              {SIDEBAR_ITEMS.find(i => i.key === active)?.icon}{' '}
              {SIDEBAR_ITEMS.find(i => i.key === active)?.label}
            </h1>
            <p className={styles.pageSub}>
              {active === 'overview' ? `Welcome back! Here's what's happening today.` : `Manage your ${active}`}
            </p>
          </div>
          <div className={styles.topBarActions}>
            <button className="btn btn-ghost btn-sm">📅 Mar 2025</button>
            <button className="btn btn-primary btn-sm">+ New Order</button>
          </div>
        </div>

        {/* OVERVIEW / ANALYTICS: Stats Cards */}
        {(active === 'overview' || active === 'analytics') && (
          <div className={styles.statsGrid}>
            {ADMIN_STATS.map((stat, i) => (
              <div key={stat.label} className={styles.statCard} style={{ '--stat-color': stat.color, animationDelay: `${i * 0.08}s` }}>
                <div className={styles.statHeader}>
                  <div>
                    <div className={styles.statVal}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                  <div className={styles.statIcon}>{stat.icon}</div>
                </div>
                <div className={`${styles.statChange} ${stat.trend === 'up' ? styles.up : styles.down}`}>
                  {stat.trend === 'up' ? '↑' : '↓'} {stat.change} vs last month
                </div>
              </div>
            ))}
          </div>
        )}

        {/* OVERVIEW / ORDERS: Recent Orders Table */}
        {(active === 'overview' || active === 'orders') && (
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>
                {active === 'overview' ? 'Recent Orders' : 'All Orders'}
              </h3>
              {active === 'overview' && (
                <button className="btn btn-ghost btn-sm" onClick={() => setActive('orders')}>
                  View All →
                </button>
              )}
              {active === 'orders' && (
                <div className={styles.tableControls}>
                  <input className={styles.tableSearch} placeholder="Search orders…" />
                  <select className={styles.tableFilter}>
                    <option>All Status</option>
                    <option>Delivered</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              )}
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {['Order ID', 'Customer', 'Date', 'Items', 'Amount', 'Status', 'Action'].map(h => (
                      <th key={h} className={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map(order => {
                    const sc = STATUS_COLORS[order.status] || {};
                    return (
                      <tr key={order.id} className={styles.tr}>
                        <td className={`${styles.td} ${styles.orderId}`}>{order.id}</td>
                        <td className={styles.td}>
                          <div className={styles.customerCell}>
                            <div className={styles.customerAvatar}>{order.avatar}</div>
                            <span>{order.customer}</span>
                          </div>
                        </td>
                        <td className={`${styles.td} ${styles.muted}`}>{order.date}</td>
                        <td className={styles.td}>{order.items} items</td>
                        <td className={`${styles.td} ${styles.bold}`}>{order.amount}</td>
                        <td className={styles.td}>
                          <span
                            className={styles.statusBadge}
                            style={{ background: sc.bg, color: sc.text }}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className={styles.td}>
                          <button className={styles.actionBtn}>View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {active === 'products' && (
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <h3 className={styles.tableTitle}>Products ({PRODUCTS.length})</h3>
              <div className={styles.tableControls}>
                <input className={styles.tableSearch} placeholder="Search products…" />
                <button className="btn btn-primary btn-sm">+ Add Product</button>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {['Product', 'Category', 'Price', 'MRP', 'Discount', 'Rating', 'Status', ''].map(h => (
                      <th key={h} className={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map(p => {
                    const cat = CATEGORIES.find(c => c.id === p.category);
                    const disc = p.mrp > p.price ? Math.round((p.mrp - p.price) / p.mrp * 100) : 0;
                    return (
                      <tr key={p.id} className={styles.tr}>
                        <td className={styles.td}>
                          <div className={styles.productCell}>
                            <img src={p.img} alt={p.name} className={styles.productThumb} />
                            <div>
                              <div className={styles.productCellName}>{p.name}</div>
                              <div className={styles.productCellUnit}>{p.unit}</div>
                            </div>
                          </div>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.catChip}>{cat?.icon} {cat?.name}</span>
                        </td>
                        <td className={`${styles.td} ${styles.bold}`}>₹{p.price}</td>
                        <td className={`${styles.td} ${styles.muted} ${styles.strikethrough}`}>₹{p.mrp}</td>
                        <td className={styles.td}>
                          {disc > 0 ? (
                            <span className={styles.discBadge}>{disc}%</span>
                          ) : '—'}
                        </td>
                        <td className={styles.td}>
                          <span className={styles.ratingCell}>⭐ {p.rating}</span>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.statusBadge} style={{ background: '#dcfce7', color: '#16a34a' }}>
                            Active
                          </span>
                        </td>
                        <td className={styles.td}>
                          <div className={styles.rowActions}>
                            <button className={styles.actionBtn}>Edit</button>
                            <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}>Del</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PLACEHOLDER TABS */}
        {(active === 'customers' || active === 'settings') && (
          <div className={styles.comingSoon}>
            <span className={styles.comingSoonIcon}>🚧</span>
            <h3>{SIDEBAR_ITEMS.find(i => i.key === active)?.label} module coming soon</h3>
            <p>This section is currently under development.</p>
          </div>
        )}
      </main>
    </div>
  );
}
