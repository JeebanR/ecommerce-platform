import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './AuthPages.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useCart();

  const [form, setForm]     = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email or mobile is required';
    else if (!/\S+@\S+/.test(form.email) && !/^\d{10}$/.test(form.email))
      e.email = 'Enter a valid email or 10-digit mobile';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6)
      e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser(form.email);
      navigate('/otp', { state: { email: form.email } });
    }, 1000);
  };

  const update = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }));
  };

  return (
    <div className={styles.page}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.leftLogo} onClick={() => navigate('/')}>🛒 jeevan</div>
          <h2 className={styles.leftTitle}>Fresh groceries, delivered in minutes</h2>
          <p className={styles.leftSub}>Join 50,000+ happy customers shopping smarter every day.</p>
          <div className={styles.leftFeatures}>
            {[
              { icon: '🚚', text: 'Delivery in under 30 minutes' },
              { icon: '🥦', text: 'Farm-fresh produce guaranteed' },
              { icon: '💰', text: 'Best prices, every single day' },
              { icon: '↩️', text: '7-day hassle-free returns' },
            ].map(f => (
              <div key={f.text} className={styles.leftFeature}>
                <span className={styles.leftFeatureIcon}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.leftDecor}>🛒</div>
      </div>

      {/* Right Panel – Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Welcome back!</h1>
            <p className={styles.formSub}>Sign in to continue to Jeevan</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Email Address / Mobile</label>
              <input
                className={`form-input ${errors.email ? styles.inputError : ''}`}
                type="text"
                placeholder="you@example.com or 9876543210"
                value={form.email}
                onChange={update('email')}
                autoComplete="email"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Password
                <span className={styles.forgotLink}>Forgot password?</span>
              </label>
              <input
                className={`form-input ${errors.password ? styles.inputError : ''}`}
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={update('password')}
                autoComplete="current-password"
              />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-block ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner} /> : null}
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <div className={styles.orDivider}>
            <span>or continue with</span>
          </div>

          <div className={styles.socialLogins}>
            {['Google', 'Facebook'].map(s => (
              <button key={s} className={`btn btn-ghost ${styles.socialBtn}`}>
                <span>{s === 'Google' ? '🌐' : '📘'}</span> {s}
              </button>
            ))}
          </div>

          <p className={styles.registerLink}>
            Don't have an account?{' '}
            <button className={styles.linkBtn} onClick={() => navigate('/login')}>
              Register for free
            </button>
          </p>

          <p className={styles.demoHint}>
            💡 Demo: enter any email + 6-char password → OTP screen
          </p>
        </div>
      </div>
    </div>
  );
}
