import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import StarRating from './StarRating';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, isInCart, updateQty, getCartItem } = useCart();

  const disc      = product.mrp > product.price
    ? Math.round((product.mrp - product.price) / product.mrp * 100) : 0;
  const inWL      = isInWishlist(product.id);
  const inCart    = isInCart(product.id);
  const cartItem  = getCartItem(product.id);

  return (
    <div className={styles.card}>
      {/* Wishlist */}
      <button
        className={`${styles.wishlistBtn} ${inWL ? styles.wished : ''}`}
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        aria-label="Toggle wishlist"
      >
        {inWL ? '♥' : '♡'}
      </button>

      {/* Badge */}
      {product.badge && (
        <div className={styles.badge}>{product.badge}</div>
      )}

      {/* Image */}
      <div className={styles.imageWrap} onClick={() => navigate(`/product/${product.id}`)}>
        <img src={product.img} alt={product.name} className={styles.image} loading="lazy" />
        {disc > 0 && <div className={styles.discBadge}>{disc}% OFF</div>}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <StarRating rating={product.rating} count={product.reviews} />

        <h3 className={styles.name} onClick={() => navigate(`/product/${product.id}`)}>
          {product.name}
        </h3>

        <p className={styles.unit}>{product.unit}</p>

        <div className={styles.priceRow}>
          <div className={styles.prices}>
            <span className={styles.price}>₹{product.price}</span>
            {disc > 0 && (
              <span className={styles.mrp}>₹{product.mrp}</span>
            )}
          </div>

          {inCart ? (
            <div className={styles.qtyControl}>
              <button
                className={styles.qtyBtn}
                onClick={() => updateQty(product.id, cartItem.qty - 1)}
              >−</button>
              <span className={styles.qty}>{cartItem.qty}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => updateQty(product.id, cartItem.qty + 1)}
              >+</button>
            </div>
          ) : (
            <button
              className={styles.addBtn}
              onClick={() => addToCart(product)}
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
