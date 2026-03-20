import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './AuthPages.module.css';

const OTP_LENGTH = 6;

export default function OtpPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email || 'your registered email';

  const [otp, setOtp]         = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer]     = useState(30);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const refs = Array.from({ length: OTP_LENGTH }, () => useRef(null));

  // Countdown
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  // Auto-focus first box on mount
  useEffect(() => { refs[0]?.current?.focus(); }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setError('');
    if (value && index < OTP_LENGTH - 1) refs[index + 1].current.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs[index - 1].current.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) refs[index - 1].current.focus();
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) refs[index + 1].current.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    const next = [...otp];
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    refs[focusIdx].current.focus();
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) { setError('Please enter all 6 digits'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      setTimeout(() => navigate('/'), 1800);
    }, 1200);
  };

  const allFilled = otp.every(d => d !== '');

  return (
    <div className={styles.page}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.leftLogo} onClick={() => navigate('/')}>🛒 jeevan</div>
          <h2 className={styles.leftTitle}>One step away from great deals!</h2>
          <p className={styles.leftSub}>We take your account security seriously. A quick OTP verification keeps your account safe.</p>
          <div className={styles.leftFeatures}>
            {[
              { icon: '🔒', text: 'Your data is fully encrypted' },
              { icon: '📱', text: 'OTP sent to your registered contact' },
              { icon: '⏱️', text: 'OTP expires in 10 minutes' },
              { icon: '✅', text: 'Verify once, stay logged in' },
            ].map(f => (
              <div key={f.text} className={styles.leftFeature}>
                <span className={styles.leftFeatureIcon}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.leftDecor}>🔐</div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          {verified ? (
            <div className={styles.successBox}>
              <span className={styles.successIcon}>✅</span>
              <h2 className={styles.successTitle}>Verified!</h2>
              <p className={styles.successSub}>You're all set. Redirecting to home…</p>
            </div>
          ) : (
            <>
              <div className={styles.formHeader}>
                <h1 className={styles.formTitle}>OTP Verification</h1>
                <p className={styles.otpSubTitle}>We sent a 6-digit code to</p>
                <p className={styles.otpEmail}>📧 {email}</p>
              </div>

              <div className={styles.otpRow} onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={refs[i]}
                    className={`${styles.otpBox} ${digit ? styles.otpBoxFilled : ''}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              {error && (
                <p style={{ textAlign: 'center', color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{error}</p>
              )}

              <button
                className={`btn btn-primary btn-block ${styles.submitBtn}`}
                onClick={handleVerify}
                disabled={!allFilled || loading}
              >
                {loading ? <span className={styles.spinner} /> : null}
                {loading ? 'Verifying…' : 'Verify OTP ✓'}
              </button>

              <p className={styles.otpTimer}>
                {timer > 0 ? (
                  <>Resend OTP in <strong>00:{String(timer).padStart(2, '0')}</strong></>
                ) : (
                  <button className={styles.otpResend} onClick={() => setTimer(30)}>
                    Resend OTP
                  </button>
                )}
              </p>

              <p className={styles.demoHint}>💡 Demo: enter any 6 digits to verify</p>

              <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13 }}>
                <button
                  className={styles.linkBtn}
                  onClick={() => navigate('/login')}
                >
                  ← Back to Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
