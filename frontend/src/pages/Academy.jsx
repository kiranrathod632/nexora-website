// pages/Academy.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Academy = () => {
  const navigate = useNavigate();
  const { courses: enrolledCourses, buyCourse, showToast } = useApp();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const allCourses = [
    { id: 'c1', title: 'Trading Foundations', level: 'beginner', emoji: '📚', desc: 'Master the basics of stock markets, order types, and fundamental analysis', lessons: 12, hours: 8, price: 1999, origPrice: 4999, cat: 'fundamentals' },
    { id: 'c2', title: 'Technical Analysis Pro', level: 'intermediate', emoji: '📈', desc: 'Chart patterns, indicators, Fibonacci, Elliot Wave, and live trade setups', lessons: 18, hours: 14, price: 4999, origPrice: 9999, cat: 'technical' },
    { id: 'c3', title: 'Options Strategies', level: 'advanced', emoji: '🎯', desc: 'Iron condors, straddles, spreads & advanced F&O strategies with risk management', lessons: 24, hours: 20, price: 7999, origPrice: 14999, cat: 'derivatives' },
    { id: 'c4', title: 'Swing Trading Masterclass', level: 'intermediate', emoji: '⚡', desc: 'Find high-probability swing setups using price action and volume analysis', lessons: 15, hours: 12, price: 2999, origPrice: 5999, cat: 'trading' },
    { id: 'c5', title: 'Crypto & Web3 Trading', level: 'beginner', emoji: '🪙', desc: 'Bitcoin, Ethereum, DeFi, NFTs — everything you need to trade crypto safely', lessons: 10, hours: 7, price: 1499, origPrice: 2999, cat: 'crypto' },
    { id: 'c6', title: 'Algo Trading with Python', level: 'advanced', emoji: '🤖', desc: 'Build automated trading bots, backtesting frameworks, and live execution systems', lessons: 30, hours: 25, price: 9999, origPrice: 19999, cat: 'algo' },
  ];

  const handleBuyCourse = (course) => {
    buyCourse(course);
    setSelectedCourse(null);
  };

  return (
    <div className="page">
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px 20px' }}>
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: '20px' }} onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
          NEXORA Academy
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Buy and access premium trading courses
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '22px'
        }}>
          {allCourses.map((c) => {
            const owned = enrolledCourses.includes(c.id);
            return (
              <div key={c.id} className="course-card" style={{
                background: 'var(--bg2)',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px',
                overflow: 'hidden',
                transition: 'all .3s'
              }}>
                <div style={{
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '46px',
                  borderBottom: '1px solid var(--glass-border)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {c.emoji}
                  {owned && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'var(--green)',
                      color: '#000',
                      fontFamily: 'var(--font-cond)',
                      fontSize: '10px',
                      padding: '3px 8px',
                      borderRadius: '2px',
                      fontWeight: 700
                    }}>
                      OWNED
                    </div>
                  )}
                </div>
                <div style={{ padding: '18px' }}>
                  <div style={{
                    fontFamily: 'var(--font-cond)',
                    fontSize: '11px',
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    marginBottom: '7px',
                    color: c.level === 'beginner' ? 'var(--green)' : c.level === 'intermediate' ? 'var(--blue)' : '#ff9800'
                  }}>
                    ● {c.level.charAt(0).toUpperCase() + c.level.slice(1)}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '7px' }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.6 }}>
                    {c.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)' }}>
                    <span>📖 {c.lessons} Lessons</span>
                    <span>⏱ {c.hours}h</span>
                    <span>🎓 Certificate</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '14px'
                  }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, color: 'var(--blue)' }}>
                      {owned ? (
                        <span style={{ color: 'var(--green)', fontSize: '16px' }}>✓ Enrolled</span>
                      ) : (
                        <>
                          ₹{c.price.toLocaleString('en-IN')}
                          <span style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '6px' }}>
                            ₹{c.origPrice.toLocaleString('en-IN')}
                          </span>
                        </>
                      )}
                    </div>
                    {owned ? (
                      <button className="btn btn-ghost btn-sm" onClick={() => showToast('Opening course...', 'info')}>
                        Start Learning →
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => setSelectedCourse(c)}>
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Course Modal */}
        {selectedCourse && (
          <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setSelectedCourse(null); }}>
            <div className="modal-box">
              <button className="modal-close" onClick={() => setSelectedCourse(null)}>✕</button>
              <h2>Enroll Now</h2>
              <p className="modal-sub">Complete your enrollment</p>
              <div style={{
                background: 'rgba(0,157,255,.07)',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, textTransform: 'uppercase' }}>
                    {selectedCourse.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {selectedCourse.lessons} lessons · {selectedCourse.hours} hours · Certificate
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700, color: 'var(--blue)' }}>
                  ₹{selectedCourse.price.toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.7 }}>
                Payment will be deducted from your wallet. Make sure you have sufficient balance.
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-cond)',
                fontSize: '12px',
                color: 'var(--silver)',
                marginBottom: '6px'
              }}>
                <span>Wallet Balance</span>
                <span>₹{(useApp().balance).toLocaleString('en-IN')}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-cond)',
                fontSize: '12px',
                color: 'var(--silver)',
                marginBottom: '18px'
              }}>
                <span>Course Fee</span>
                <span style={{ color: 'var(--red)' }}>-₹{selectedCourse.price.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,.06)', marginBottom: '18px' }} />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-head)',
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '22px'
              }}>
                <span>After Purchase</span>
                <span style={{ color: 'var(--green)' }}>
                  ₹{(useApp().balance - selectedCourse.price).toLocaleString('en-IN')}
                </span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleBuyCourse(selectedCourse)}>
                Confirm Purchase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Academy;