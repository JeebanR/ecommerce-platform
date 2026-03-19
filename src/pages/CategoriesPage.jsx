import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data';
import styles from './CategoriesPage.module.css';

export default function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <span onClick={() => navigate('/')}>Home</span>
            <span className={styles.sep}>/</span>
            <span className={styles.active}>All Categories</span>
          </div>
          <h1 className={styles.pageTitle}>Shop by Category</h1>
          <p className={styles.pageSub}>Browse through all our product categories</p>
        </div>
      </div>

      {/* All Categories Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.catGrid}>
            {CATEGORIES.map((cat, i) => {
              const catProducts = PRODUCTS.filter(p => p.category === cat.id);
              const featured    = catProducts.slice(0, 3);
              return (
                <div
                  key={cat.id}
                  className={styles.catCard}
                  style={{ animationDelay: `${i * 0.07}s` }}
                  onClick={() => navigate(`/products?cat=${cat.id}`)}
                >
                  {/* Card Header */}
                  <div
                    className={styles.catHeader}
                    style={{ background: cat.color }}
                  >
                    <span className={styles.catIcon}>{cat.icon}</span>
                    <div className={styles.catBadge} style={{ color: cat.textColor, background: 'rgba(255,255,255,0.75)' }}>
                      {cat.count} items
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className={styles.catBody}>
                    <h3 className={styles.catName}>{cat.name}</h3>
                    {/* Mini product preview */}
                    <div className={styles.catPreview}>
                      {featured.map(p => (
                        <img
                          key={p.id}
                          src={p.img}
                          alt={p.name}
                          className={styles.previewImg}
                        />
                      ))}
                    </div>
                    <button
                      className={styles.catCta}
                      style={{ color: cat.textColor }}
                    >
                      Explore →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className={styles.bottomBanner}>
        <div className="container">
          <div className={styles.bannerInner}>
            <div className={styles.bannerText}>
              <h2>Can't find what you're looking for?</h2>
              <p>Browse all our products or use the search to find specific items.</p>
            </div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/products')}
            >
              Browse All Products →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
