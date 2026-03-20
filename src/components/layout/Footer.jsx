import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.inner}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo} onClick={() => navigate('/')}>🛒 jeevan</div>
            <p className={styles.tagline}>
              Your one-stop supermarket for fresh groceries, household essentials,
              and daily needs — delivered fast to your doorstep.
            </p>
            <div className={styles.contact}>
              <span>📍 Matrusri Nagar, Miyapur, Hyderabad, 500049</span>
              <span>📞 +91 8249829625</span>
              <span>✉️ supermarketsjeevan@gmail.com</span>
              <span>🕐 Mon–Sat, 9:00 AM – 6:00 PM</span>
            </div>
            <div className={styles.social}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>f</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>in</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>𝕏</a>
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Account', links: ['My Profile', 'My Orders', 'Wishlist', 'Cart', 'Track Order', 'Shipping Details'] },
            { title: 'Company',  links: ['About Us', 'Contact Us', 'Careers', 'Press', 'Blog'] },
            { title: 'Support',  links: ['Help Center', 'Return Policy', 'Refund Policy', 'FAQs', 'Terms & Conditions', 'Privacy Policy'] },
          ].map((col) => (
            <div key={col.title} className={styles.col}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              {col.links.map((link) => (
                <span key={link} className={styles.link}>{link}</span>
              ))}
            </div>
          ))}

          {/* App Download */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Download App</h4>
            <p className={styles.appText}>Shop faster with the Jeevan App. Available on iOS & Android.</p>
            {['App Store', 'Google Play'].map((a) => (
              <div key={a} className={styles.appBtn}>
                <span>{a === 'App Store' ? '🍎' : '▶'}</span>
                <div>
                  <span className={styles.appBtnSub}>Download on</span>
                  <span className={styles.appBtnMain}>{a}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>© 2025 Jeevan Supermarkets Pvt. Ltd. All rights reserved.</span>
          <div className={styles.payments}>
            {['VISA', 'MC', 'UPI', 'GPAY', 'PAYTM'].map(p => (
              <span key={p} className={styles.payBadge}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
