// pages/AddFunds.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AddFunds = () => {
  const navigate = useNavigate();
  const { balance, addFunds, transactions, showToast } = useApp();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('upi');
  const [selectedChip, setSelectedChip] = useState(null);

  const quickAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

  const handleAddFunds = () => {
    const amt = Number(amount);
    if (!amt || amt < 100) {
      showToast('Enter a valid amount (min ₹100)', 'error');
      return;
    }
    addFunds(amt, method);
    setAmount('');
    setSelectedChip(null);
    showToast(`₹${amt.toLocaleString('en-IN')} added to your wallet! ✅`, 'success');
  };

  const recentDeposits = transactions.filter(t => t.type === 'credit').slice(0, 4);

  return (
    <div className="page">
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px 20px' }}>
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: '20px' }} onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
          Add Funds
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Add money to your NEXORA wallet securely
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '28px',
          alignItems: 'start'
        }}>
          <div>
            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '24px', color: 'var(--blue)' }}>
                Enter Amount
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginBottom: '12px'
              }}>
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    className={`btn btn-ghost btn-sm`}
                    style={{
                      padding: '9px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-cond)',
                      fontSize: '13px',
                      fontWeight: 600,
                      background: selectedChip === amt ? 'rgba(0,157,255,.2)' : 'rgba(0,157,255,.07)',
                      border: selectedChip === amt ? '1px solid var(--blue)' : '1px solid var(--glass-border)',
                      color: selectedChip === amt ? 'var(--blue)' : '#fff'
                    }}
                    onClick={() => {
                      setSelectedChip(amt);
                      setAmount(amt.toString());
                    }}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              <div className="form-grp" style={{ marginTop: '14px' }}>
                <label>Custom Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedChip(null);
                  }}
                  placeholder="Enter amount"
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
              {method === 'upi' && (
                <div className="form-grp">
                  <label>UPI ID</label>
                  <input type="text" placeholder="yourname@upi" />
                </div>
              )}
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAddFunds}>
                Add Funds Securely
              </button>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
                🔒 Secured by RazorPay · 256-bit encryption · SEBI Compliant
              </div>
            </div>
          </div>

          <div>
            <div style={{
              background: 'linear-gradient(135deg,rgba(0,157,255,.1),rgba(0,191,255,.05))',
              border: '1px solid var(--blue)',
              borderRadius: '8px',
              padding: '28px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <div style={{ fontFamily: 'var(--font-cond)', fontSize: '12px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--silver)', marginBottom: '8px' }}>
                Current Balance
              </div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '48px', fontWeight: 700, color: 'var(--blue)' }}>
                ₹{balance.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>Updated just now</div>
            </div>

            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '24px', color: 'var(--blue)' }}>
                Recent Deposits
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                {recentDeposits.map((d, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: i < recentDeposits.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none'
                  }}>
                    <div>
                      <div style={{ fontSize: '13px' }}>{d.desc}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{d.date}</div>
                    </div>
                    <div style={{ color: 'var(--green)', fontFamily: 'var(--font-cond)', fontSize: '13px', fontWeight: 600 }}>
                      +₹{d.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px', marginTop: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '24px', color: 'var(--blue)' }}>
                Why Add Funds?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>⚡</span>
                  <div style={{ fontSize: '13px', color: 'var(--silver)' }}>
                    <b>Instant</b> credit — funds available within seconds via UPI
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>🔒</span>
                  <div style={{ fontSize: '13px', color: 'var(--silver)' }}>
                    <b>Secure</b> — bank-grade encryption and SEBI-segregated funds
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>💸</span>
                  <div style={{ fontSize: '13px', color: 'var(--silver)' }}>
                    <b>Zero fees</b> — no charges on deposits or withdrawals
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;