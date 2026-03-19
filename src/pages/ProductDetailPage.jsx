import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';
import StarRating from '../components/common/StarRating';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const product    = PRODUCTS.find(p => p.id === Number(id));
  const { addToCart, toggleWishlist, isInWishlist, isInCart, updateQty, getCartItem } = useCart();

  const [qty, setQty]   = useState(1);
  const [tab, setTab]   = useState('description');

  if (!product) {
    return (
      <div className={styles.notFound}>
        <span>🔍</span>
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>Browse Products</button>
      </div>
    );
  }

  const cat       = CATEGORIES.find(c => c.id === product.category);
  const disc      = product.mrp > product.price
    ? Math.round((product.mrp - product.price) / product.mrp * 100) : 0;
  const related   = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inWL      = isInWishlist(product.id);
  const inCart    = isInCart(product.id);
  const cartItem  = getCartItem(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  return (
    <main className={styles.main}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <span onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span onClick={() => navigate(`/products?cat=${product.category}`)}>{cat?.name}</span>
            <span>/</span>
            <span className={styles.breadcrumbActive}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container">
        {/* ── MAIN PRODUCT SECTION ── */}
        <div className={styles.productGrid}>
          {/* Image Panel */}
          <div className={styles.imagePanel}>
            <div className={styles.mainImageWrap}>
              {product.badge && <div className={styles.imageBadge}>{product.badge}</div>}
              {disc > 0 && <div className={styles.discBadge}>{disc}% OFF</div>}
              <img src={product.img} alt={product.name} className={styles.mainImage} />
              <button
                className={`${styles.wishlistBtn} ${inWL ? styles.wished : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                {inWL ? '♥' : '♡'}
              </button>
            </div>
            {/* Highlights Chips */}
            <div className={styles.highlights}>
              {product.highlights?.map(h => (
                <span key={h} className={styles.highlight}>✓ {h}</span>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className={styles.infoPanel}>
            {/* Category Badge */}
            <div
              className={styles.catChip}
              onClick={() => navigate(`/products?cat=${product.category}`)}
            >
              {cat?.icon} {cat?.name}
            </div>

            <h1 className={styles.productTitle}>{product.name}</h1>

            <div className={styles.ratingRow}>
              <StarRating rating={product.rating} count={product.reviews} size="md" />
            </div>

            {/* Price Block */}
            <div className={styles.priceBlock}>
              <span className={styles.price}>₹{product.price}</span>
              {disc > 0 && (
                <>
                  <span className={styles.mrp}>₹{product.mrp}</span>
                  <span className={styles.discLabel}>{disc}% OFF</span>
                </>
              )}
            </div>

            {/* Unit + Stock */}
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Pack Size</span>
                <span className={styles.metaValue}>{product.unit}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Availability</span>
                <span className={`${styles.metaValue} ${styles.inStock}`}>✅ In Stock</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Delivery</span>
                <span className={styles.metaValue}>🚚 Today</span>
              </div>
            </div>

            <hr className="divider" />

            {/* Qty + Cart */}
            {inCart ? (
              <div className={styles.cartActions}>
                <div className={styles.inCartNote}>✅ Added to cart</div>
                <div className={styles.qtyRow}>
                  <div className={styles.qtyControl}>
                    <button className={styles.qtyBtn} onClick={() => updateQty(product.id, cartItem.qty - 1)}>−</button>
                    <span className={styles.qtyVal}>{cartItem.qty}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQty(product.id, cartItem.qty + 1)}>+</button>
                  </div>
                  <button
                    className="btn btn-outline"
                    onClick={() => navigate('/cart')}
                  >
                    Go to Cart →
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.addToCartSection}>
                <div className={styles.qtySelector}>
                  <span className={styles.qtySelectorLabel}>Qty:</span>
                  <div className={styles.qtyControl}>
                    <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <span className={styles.qtyVal}>{qty}</span>
                    <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
                  </div>
                </div>
                <div className={styles.ctaRow}>
                  <button className={`btn btn-primary btn-lg ${styles.addBtn}`} onClick={handleAddToCart}>
                    🛒 Add to Cart
                  </button>
                  <button
                    className={`btn btn-ghost btn-lg ${styles.wlBtn} ${inWL ? styles.wlActive : ''}`}
                    onClick={() => toggleWishlist(product)}
                  >
                    {inWL ? '♥' : '♡'}
                  </button>
                </div>
              </div>
            )}

            {/* Feature Icons */}
            <div className={styles.featureIcons}>
              {[
                { icon: '🚚', label: 'Free Delivery', sub: 'Above ₹499' },
                { icon: '↩️', label: 'Easy Returns',  sub: '7-day policy' },
                { icon: '✅', label: 'Fresh Guarantee', sub: '100% fresh' },
                { icon: '🔒', label: 'Secure Checkout', sub: 'Encrypted' },
              ].map(f => (
                <div key={f.label} className={styles.featureIcon}>
                  <span className={styles.featureIconEmoji}>{f.icon}</span>
                  <span className={styles.featureIconLabel}>{f.label}</span>
                  <span className={styles.featureIconSub}>{f.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className={styles.tabsSection}>
          <div className={styles.tabs}>
            {['description','highlights','delivery'].map(t => (
              <button
                key={t}
                className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
                onClick={() => setTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.tabContent}>
            {tab === 'description' && (
              <p className={styles.description}>{product.description}</p>
            )}
            {tab === 'highlights' && (
              <div className={styles.highlightsList}>
                {product.highlights?.map(h => (
                  <div key={h} className={styles.highlightRow}>
                    <span className={styles.hlCheck}>✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === 'delivery' && (
              <div className={styles.deliveryInfo}>
                {[
                  ['🚚', 'Standard Delivery', 'Free on orders above ₹499. ₹40 otherwise.'],
                  ['⚡', 'Express Delivery', 'Available in select areas. Delivered in 10–30 min.'],
                  ['↩️', 'Returns Policy', '7-day hassle-free return on eligible products.'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className={styles.deliveryRow}>
                    <span className={styles.deliveryIcon}>{icon}</span>
                    <div>
                      <div className={styles.deliveryTitle}>{title}</div>
                      <div className={styles.deliverySub}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>You might also like</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
