import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartPage.module.css';

function CartItem({ item }) {
  const { removeFromCart, updateQty } = useCart();
  const disc = item.mrp > item.price
    ? Math.round((item.mrp - item.price) / item.mrp * 100) : 0;

  return (
    <div className={styles.cartItem}>
      <img src={item.img} alt={item.name} className={styles.itemImg} />
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{item.name}</h3>
        <p className={styles.itemUnit}>{item.unit}</p>
        <div className={styles.itemPrices}>
          <span className={styles.itemPrice}>₹{item.price}</span>
          {disc > 0 && (
            <>
              <span className={styles.itemMrp}>₹{item.mrp}</span>
              <span className={styles.itemDisc}>{disc}% off</span>
            </>
          )}
        </div>
      </div>
      <div className={styles.itemActions}>
        <div className={styles.qtyControl}>
          <button
            className={styles.qtyBtn}
            onClick={() => {
              if (item.qty === 1) removeFromCart(item.id);
              else updateQty(item.id, item.qty - 1);
            }}
          >
            {item.qty === 1 ? '🗑' : '−'}
          </button>
          <span className={styles.qty}>{item.qty}</span>
          <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
        </div>
        <div className={styles.itemTotal}>₹{(item.price * item.qty).toFixed(0)}</div>
        <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)} title="Remove">✕</button>
      </div>
    </div>
  );
}

function OrderSummary({ subtotal, delivery, total, savings, itemCount }) {
  const navigate = useNavigate();
  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>Order Summary</h3>

      {savings > 0 && (
        <div className={styles.savingsBanner}>
          🎉 You're saving <strong>₹{savings}</strong> on this order!
        </div>
      )}

      <div className={styles.summaryRows}>
        <div className={styles.summaryRow}>
          <span>Subtotal ({itemCount} items)</span>
          <span>₹{subtotal}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Delivery Charges</span>
          <span className={delivery === 0 ? styles.free : ''}>
            {delivery === 0 ? 'FREE' : `₹${delivery}`}
          </span>
        </div>
        {savings > 0 && (
          <div className={`${styles.summaryRow} ${styles.savingsRow}`}>
            <span>Total Savings</span>
            <span>−₹{savings}</span>
          </div>
        )}
      </div>

      {subtotal < 499 && subtotal > 0 && (
        <div className={styles.freeDeliveryBanner}>
          Add <strong>₹{499 - subtotal}</strong> more for free delivery!
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(subtotal / 499) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className={styles.summaryTotal}>
        <span>Total Amount</span>
        <span className={styles.totalVal}>₹{total}</span>
      </div>

      <button
        className={`btn btn-primary btn-block ${styles.checkoutBtn}`}
        onClick={() => navigate('/')}
      >
        Proceed to Checkout →
      </button>

      <button
        className={`btn btn-ghost btn-block`}
        onClick={() => navigate('/products')}
        style={{ marginTop: 10 }}
      >
        Continue Shopping
      </button>

      {/* Assurances */}
      <div className={styles.assurances}>
        {['🔒 Secure Checkout', '↩️ Easy Returns', '✅ 100% Fresh'].map(a => (
          <span key={a} className={styles.assurance}>{a}</span>
        ))}
      </div>
    </div>
  );
}

export default function CartPage() {
  const navigate = useNavigate();
  const { items, cartSubtotal, cartDelivery, cartTotal, cartSavings, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className={styles.main}>
        <div className="container">
          <div className={styles.emptyCart}>
            <span className={styles.emptyIcon}>🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>
              Start Shopping →
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className="container">
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Shopping Cart</h1>
            <p className={styles.pageSub}>{items.length} item{items.length > 1 ? 's' : ''} in your cart</p>
          </div>
          <button className={styles.clearCartBtn} onClick={clearCart}>
            🗑 Clear Cart
          </button>
        </div>

        {/* Cart Layout */}
        <div className={styles.cartLayout}>
          {/* Items List */}
          <div className={styles.itemsList}>
            {items.map(item => <CartItem key={item.id} item={item} />)}
          </div>

          {/* Order Summary */}
          <div className={styles.summaryWrap}>
            <OrderSummary
              subtotal={cartSubtotal}
              delivery={cartDelivery}
              total={cartTotal}
              savings={cartSavings}
              itemCount={items.reduce((s, i) => s + i.qty, 0)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
