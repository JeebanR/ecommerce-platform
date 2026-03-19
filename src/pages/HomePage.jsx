import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data';
import ProductCard from '../components/common/ProductCard';
import styles from './HomePage.module.css';

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <div className={styles.heroPill}>
            <span className={styles.heroPillDot} />
            Now delivering in 10 minutes!
          </div>
          <h1 className={styles.heroTitle}>
            Fresh Groceries,<br />
            <span className={styles.heroHighlight}>Delivered Fast</span>
          </h1>
          <p className={styles.heroSub}>
            Shop from 1000+ products across 20+ categories. Farm fresh, quality
            guaranteed, delivered straight to your doorstep.
          </p>
          <div className={styles.heroCtas}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>
              Shop Now →
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('/categories')}>
              Browse Categories
            </button>
          </div>
          <div className={styles.heroStats}>
            {[['1000+','Products'],['10 min','Delivery'],['50k+','Happy Customers']].map(([v,l]) => (
              <div key={l} className={styles.heroStat}>
                <span className={styles.heroStatVal}>{v}</span>
                <span className={styles.heroStatLabel}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroEmoji}>🛒</div>
          <div className={styles.heroFloat1}>🥦</div>
          <div className={styles.heroFloat2}>🍎</div>
          <div className={styles.heroFloat3}>🥛</div>
          <div className={styles.heroBubble1}>
            <span className={styles.bubbleIcon}>🚚</span>
            <span>Free Delivery</span>
          </div>
          <div className={styles.heroBubble2}>
            <span className={styles.bubbleIcon}>⭐</span>
            <span>4.8 Rated</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: '🚚', title: 'Fast Delivery',     sub: 'In 10–30 minutes' },
    { icon: '✅', title: 'Fresh Guaranteed',  sub: 'Farm to doorstep' },
    { icon: '↩️', title: 'Easy Returns',      sub: '7-day return policy' },
    { icon: '🔒', title: 'Secure Payments',   sub: 'UPI, Card, Wallet' },
    { icon: '💰', title: 'Best Prices',        sub: 'Price match guarantee' },
  ];
  return (
    <div className={styles.trustBar}>
      <div className={styles.trustBarInner}>
        {items.map(i => (
          <div key={i.title} className={styles.trustItem}>
            <span className={styles.trustIcon}>{i.icon}</span>
            <div>
              <span className={styles.trustTitle}>{i.title}</span>
              <span className={styles.trustSub}>{i.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, sub, link, onLink }) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {sub && <p className={styles.sectionSub}>{sub}</p>}
      </div>
      {link && (
        <button className={styles.seeAll} onClick={onLink}>{link} →</button>
      )}
    </div>
  );
}

export default function HomePage() {
  const navigate  = useNavigate();
  const trending  = PRODUCTS.filter(p => p.badge);
  const bestsellers = PRODUCTS.filter(p => p.badge === 'BESTSELLER');

  return (
    <main className={styles.main}>
      <HeroSection />
      <TrustBar />

      {/* Categories */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="Shop by Category"
            sub="Explore our wide range of fresh products"
            link="View All"
            onLink={() => navigate('/categories')}
          />
          <div className="grid-cat">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                className={styles.catCard}
                style={{ '--cat-color': cat.color, '--cat-text': cat.textColor, animationDelay: `${i * 0.06}s` }}
                onClick={() => navigate(`/products?cat=${cat.id}`)}
              >
                <div className={styles.catIcon}>{cat.icon}</div>
                <span className={styles.catName}>{cat.name}</span>
                <span className={styles.catCount}>{cat.count} items</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className={styles.promoSection}>
        <div className="container">
          <div className={styles.promoBanners}>
            <div className={styles.promoBig} onClick={() => navigate('/products')}>
              <div className={styles.promoText}>
                <span className={styles.promoTag}>NEW USERS</span>
                <h3>Get 10% off on your first order</h3>
                <p>Use code: <strong>FIRST10</strong></p>
                <button className={`btn btn-primary btn-sm ${styles.promoBtn}`}>Claim Now →</button>
              </div>
              <div className={styles.promoEmoji}>🎉</div>
            </div>
            <div className={styles.promoStack}>
              <div className={`${styles.promoSmall} ${styles.promoSmall2}`} onClick={() => navigate('/products')}>
                <div>
                  <div className={styles.promoTag2}>FREE DELIVERY</div>
                  <h4>Orders above ₹499</h4>
                  <p>Shop now & save on delivery</p>
                </div>
                <span>🚚</span>
              </div>
              <div className={`${styles.promoSmall} ${styles.promoSmall3}`} onClick={() => navigate('/products?cat=1')}>
                <div>
                  <div className={styles.promoTag2}>FRESH TODAY</div>
                  <h4>Farm Fresh Vegetables</h4>
                  <p>Picked this morning, delivered now</p>
                </div>
                <span>🥦</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader
            title="🔥 Trending Now"
            sub="Most loved products this week"
            link="View All"
            onLink={() => navigate('/products')}
          />
          <div className="grid-auto">
            {trending.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="⭐ Bestsellers"
            sub="Top picks loved by our customers"
            link="View All"
            onLink={() => navigate('/products')}
          />
          <div className="grid-auto">
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* App CTA */}
      <section className={styles.appCta}>
        <div className="container">
          <div className={styles.appCtaInner}>
            <div className={styles.appCtaContent}>
              <h2 className={styles.appCtaTitle}>Shop Faster with the Bodegaa App</h2>
              <p className={styles.appCtaSub}>Get exclusive app-only deals, track orders in real-time, and reorder with a single tap.</p>
              <div className={styles.appCtaBtns}>
                {['App Store', 'Google Play'].map(s => (
                  <div key={s} className={styles.appStoreBtn}>
                    <span>{s === 'App Store' ? '🍎' : '▶'}</span>
                    <div>
                      <div style={{ fontSize: 10, opacity: .7 }}>Download on</div>
                      <div style={{ fontWeight: 700 }}>{s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.appCtaPhone}>📱</div>
          </div>
        </div>
      </section>
    </main>
  );
}
