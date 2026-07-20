// components/AddFundsModal.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const AddFundsModal = ({ isOpen, onClose }) => {
  const { balance, addFunds, showToast } = useApp();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('upi');

  if (!isOpen) return null;

  const handleAddFunds = () => {
    const amt = Number(amount);
    if (!amt || amt < 100) {
      showToast('Enter a valid amount (min ₹100)', 'error');
      return;
    }
    addFunds(amt, method);
    setAmount('');
    onClose();
  };

  const quickAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Add Funds</h2>
        <p className="modal-sub">Instantly add money to your NEXORA wallet</p>
        <div style={{
          background: 'linear-gradient(135deg,rgba(0,157,255,.1),rgba(0,191,255,.05))',
          border: '1px solid var(--blue)',
          borderRadius: '8px',
          padding: '18px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ fontFamily: 'var(--font-cond)', fontSize: '12px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--silver)', marginBottom: '8px' }}>
            Available Balance
          </div>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: '34px', fontWeight: 700, color: 'var(--blue)' }}>
            ₹{balance.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="form-grp">
          <label>Amount (₹)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
            {quickAmounts.map((amt) => (
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
            placeholder="Or enter custom amount"
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
        <div className="form-grp">
          <label>Payment Method</label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '8px'
          }}>
            {['upi', 'netbanking', 'card', 'neft'].map((m) => (
              <button
                key={m}
                className="btn btn-ghost btn-sm"
                style={{
                  padding: '14px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-cond)',
                  fontSize: '12px',
                  letterSpacing: '.07em',
                  background: method === m ? 'rgba(0,157,255,.1)' : 'rgba(255,255,255,.04)',
                  border: method === m ? '1px solid var(--blue)' : '1px solid var(--glass-border)',
                  color: method === m ? '#fff' : 'var(--silver)'
                }}
                onClick={() => setMethod(m)}
              >
                <span style={{ fontSize: '22px', display: 'block', marginBottom: '6px' }}>
                  {m === 'upi' ? '📱' : m === 'netbanking' ? '🏦' : m === 'card' ? '💳' : '🔁'}
                </span>
                {m === 'netbanking' ? 'Net Banking' : m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAddFunds}>
          Add Funds
        </button>
      </div>
    </div>
  );
};

export default AddFundsModal;