import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Toast.module.css';

function ToastItem({ toast }) {
  const { removeToast } = useCart();

  useEffect(() => {
    const t = setTimeout(() => removeToast(toast.id), 2800);
    return () => clearTimeout(t);
  }, [toast.id, removeToast]);

  return (
    <div className={`${styles.toast} ${styles[toast.variant || 'default']}`}>
      <span className={styles.icon}>{toast.icon || '✅'}</span>
      <span className={styles.message}>{toast.message}</span>
      <button className={styles.close} onClick={() => removeToast(toast.id)}>✕</button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useCart();
  if (!toasts.length) return null;

  return (
    <div className={styles.container}>
      {toasts.map(t => <ToastItem key={t.id} toast={t} />)}
    </div>
  );
}
