// components/InvestModal.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const InvestModal = ({ isOpen, onClose }) => {
  const { balance, invest, pendingInvest, showToast } = useApp();
  const [amount, setAmount] = useState('');

  if (!isOpen || !pendingInvest) return null;

  const handleInvest = () => {
    const amt = Number(amount);
    if (!amt || amt < pendingInvest.minInvest) {
      showToast(`Minimum investment is ₹${pendingInvest.minInvest.toLocaleString('en-IN')}`, 'error');
      return;
    }
    invest(amt, pendingInvest);
    setAmount('');
    onClose();
  };

  const quickAmts = [5000, 10000, 25000, 50000, 100000, 500000];

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Invest Now</h2>
        <p className="modal-sub">Confirm your investment</p>
        <div style={{
          background: 'rgba(0,157,255,.07)',
          border: '1px solid var(--blue)',
          borderRadius: '6px',
          padding: '16px 20px',
          marginBottom: '20px'
        }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: '17px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
            {pendingInvest.name}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--green)' }}>Expected Return: {pendingInvest.returnPct}</div>
        </div>
        <div className="form-grp">
          <label>Investment Amount (₹)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
            {quickAmts.map((amt) => (
              <button
                key={amt}
                className="btn btn-ghost btn-sm"
                style={{
                  padding: '9px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-cond)',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: Number(amount) === amt ? 'rgba(0,157,255,.2)' : 'rgba(0,157,255,.07)',
                  border: Number(amount) === amt ? '1px solid var(--blue)' : '1px solid var(--glass-border)',
                  color: Number(amount) === amt ? 'var(--blue)' : '#fff'
                }}
                onClick={() => setAmount(amt.toString())}
              >
                ₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Custom amount"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,.04)',
              border: '1px solid var(--glass-border)',
              borderRadius: '3px',
              padding: '12px 14px',
              color: '#fff',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              transition: 'border-color .2s',
              outline: 'none'
            }}
          />
        </div>
        <div style={{
          fontFamily: 'var(--font-head)',
          fontSize: '40px',
          fontWeight: 700,
          color: 'var(--blue)',
          textAlign: 'center',
          margin: '16px 0 8px'
        }}>
          ₹{Number(amount).toLocaleString('en-IN') || '0'}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '20px' }}>
          Est. Annual Return: <span style={{ color: 'var(--green)', fontWeight: 600 }}>
            ₹{Math.round(Number(amount) * (parseFloat(pendingInvest.returnPct) || 14) / 100).toLocaleString('en-IN')}
          </span>
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleInvest}>
          Confirm Investment
        </button>
      </div>
    </div>
  );
};

export default InvestModal;