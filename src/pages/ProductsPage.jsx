import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/common/ProductCard';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const navigate          = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam          = searchParams.get('cat') ? Number(searchParams.get('cat')) : null;
  const searchParam       = searchParams.get('search') || '';

  const [sort, setSort]   = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [search, setSearch] = useState(searchParam);

  const activeCat = catParam;
  const cat       = CATEGORIES.find(c => c.id === activeCat);

  const filtered = useMemo(() => {
    return PRODUCTS
      .filter(p => !activeCat || p.category === activeCat)
      .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      .sort((a, b) => {
        if (sort === 'price-asc')  return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'rating')     return b.rating - a.rating;
        return b.reviews - a.reviews; // popular
      });
  }, [activeCat, search, sort, priceRange]);

  const setCategory = (id) => {
    const p = new URLSearchParams(searchParams);
    if (id === null) p.delete('cat');
    else p.set('cat', id);
    setSearchParams(p);
  };

  return (
    <main className={styles.main}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <span onClick={() => navigate('/')}>Home</span>
            <span className={styles.sep}>/</span>
            {activeCat ? (
              <>
                <span onClick={() => navigate('/categories')}>Categories</span>
                <span className={styles.sep}>/</span>
                <span className={styles.active}>{cat?.name}</span>
              </>
            ) : (
              <span className={styles.active}>All Products</span>
            )}
          </div>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.pageTitle}>
                {activeCat ? `${cat?.icon} ${cat?.name}` : 'All Products'}
              </h1>
              <p className={styles.pageSub}>{filtered.length} products found</p>
            </div>
            {/* Search + Sort */}
            <div className={styles.headerControls}>
              <div className={styles.searchWrap}>
                <span>🔍</span>
                <input
                  className={styles.searchInput}
                  placeholder="Search products…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>
                )}
              </div>
              <select
                className={styles.sortSelect}
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* ── SIDEBAR ── */}
          <aside className={styles.sidebar}>
            {/* Categories */}
            <div className={styles.filterCard}>
              <h4 className={styles.filterTitle}>Categories</h4>
              <div className={styles.catList}>
                <div
                  className={`${styles.catItem} ${activeCat === null ? styles.catItemActive : ''}`}
                  onClick={() => setCategory(null)}
                >
                  <span className={styles.catItemIcon}>🏪</span>
                  <span className={styles.catItemName}>All Products</span>
                  <span className={styles.catItemCount}>{PRODUCTS.length}</span>
                </div>
                {CATEGORIES.map(c => (
                  <div
                    key={c.id}
                    className={`${styles.catItem} ${activeCat === c.id ? styles.catItemActive : ''}`}
                    onClick={() => setCategory(c.id)}
                  >
                    <span className={styles.catItemIcon}>{c.icon}</span>
                    <span className={styles.catItemName}>{c.name}</span>
                    <span className={styles.catItemCount}>{c.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className={styles.filterCard}>
              <h4 className={styles.filterTitle}>Price Range</h4>
              <div className={styles.priceSlider}>
                <div className={styles.priceLabels}>
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  className={styles.rangeInput}
                  min={0}
                  max={500}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
              <div className={styles.priceQuickPicks}>
                {[[0,100],[0,200],[0,500]].map(([min,max]) => (
                  <button
                    key={`${min}-${max}`}
                    className={`${styles.pricePick} ${priceRange[0]===min && priceRange[1]===max ? styles.pricePickActive : ''}`}
                    onClick={() => setPriceRange([min, max])}
                  >
                    ₹{min}–₹{max}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges Filter */}
            <div className={styles.filterCard}>
              <h4 className={styles.filterTitle}>Offers & Deals</h4>
              {['BESTSELLER','FRESH','HOT','OFFER'].map(b => (
                <label key={b} className={styles.checkRow}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* ── PRODUCTS ── */}
          <div className={styles.productsArea}>
            {/* Active Filters */}
            {(activeCat || search) && (
              <div className={styles.activeFilters}>
                {activeCat && (
                  <span className={styles.filterChip}>
                    {cat?.icon} {cat?.name}
                    <button onClick={() => setCategory(null)}>✕</button>
                  </span>
                )}
                {search && (
                  <span className={styles.filterChip}>
                    "{search}"
                    <button onClick={() => setSearch('')}>✕</button>
                  </span>
                )}
                <button className={styles.clearAll} onClick={() => { setCategory(null); setSearch(''); }}>
                  Clear All
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🔍</span>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
                <button className="btn btn-primary" onClick={() => { setSearch(''); setCategory(null); }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={styles.productsGrid}>
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
