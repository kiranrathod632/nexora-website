// components/CourseModal.jsx
import React from 'react';
import { useApp } from '../context/AppContext';

const CourseModal = ({ isOpen, onClose }) => {
  const { balance, buyCourse, pendingCourse, showToast } = useApp();

  if (!isOpen || !pendingCourse) return null;

  const handleBuy = () => {
    buyCourse(pendingCourse);
    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
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
              {pendingCourse.title}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {pendingCourse.lessons} lessons · {pendingCourse.hours} hours · Certificate
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700, color: 'var(--blue)' }}>
            ₹{pendingCourse.price.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.7 }}>
          Payment will be deducted from your wallet. Make sure you have sufficient balance.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-cond)', fontSize: '12px', color: 'var(--silver)', marginBottom: '6px' }}>
          <span>Wallet Balance</span>
          <span>₹{balance.toLocaleString('en-IN')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-cond)', fontSize: '12px', color: 'var(--silver)', marginBottom: '18px' }}>
          <span>Course Fee</span>
          <span style={{ color: 'var(--red)' }}>-₹{pendingCourse.price.toLocaleString('en-IN')}</span>
        </div>
        <div style={{ height: '1px', background: 'rgba(255,255,255,.06)', marginBottom: '18px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, marginBottom: '22px' }}>
          <span>After Purchase</span>
          <span style={{ color: 'var(--green)' }}>₹{(balance - pendingCourse.price).toLocaleString('en-IN')}</span>
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleBuy}>
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default CourseModal;