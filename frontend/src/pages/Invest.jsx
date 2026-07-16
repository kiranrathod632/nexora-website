// pages/Invest.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Invest = () => {
  const navigate = useNavigate();
  const { invest, showToast } = useApp();
  const [filter, setFilter] = useState('all');
  const [selectedOption, setSelectedOption] = useState(null);
  const [investAmount, setInvestAmount] = useState('');

  const investOptions = [
    { id: 'i1', name: 'NIFTY 50 Index Fund', type: 'mf', cat: 'mf', risk: 'Low', returnPct: '12-15% p.a.', icon: '📊', minInvest: 500 },
    { id: 'i2', name: 'Reliance Industries', type: 'equity', cat: 'equity', risk: 'Medium', returnPct: '15-20% p.a.', icon: '💼', minInvest: 2500 },
    { id: 'i3', name: 'Flexi Cap Mutual Fund', type: 'mf', cat: 'mf', risk: 'Medium', returnPct: '16-18% p.a.', icon: '🏦', minInvest: 1000 },
    { id: 'i4', name: 'Bitcoin (BTC)', type: 'crypto', cat: 'crypto', risk: 'High', returnPct: 'Variable', icon: '₿', minInvest: 100 },
    { id: 'i5', name: 'HDFC Small Cap Fund', type: 'mf', cat: 'mf', risk: 'High', returnPct: '18-22% p.a.', icon: '📈', minInvest: 1000 },
    { id: 'i6', name: 'Fixed Deposit (5 Yr)', type: 'fd', cat: 'fd', risk: 'Very Low', returnPct: '7.25% p.a.', icon: '🔒', minInvest: 10000 },
    { id: 'i7', name: 'TCS — Large Cap', type: 'equity', cat: 'equity', risk: 'Low-Med', returnPct: '12-16% p.a.', icon: '🖥️', minInvest: 3800 },
    { id: 'i8', name: 'Ethereum (ETH)', type: 'crypto', cat: 'crypto', risk: 'High', returnPct: 'Variable', icon: '⟠', minInvest: 500 },
    { id: 'i9', name: 'RBI Bonds', type: 'fd', cat: 'fd', risk: 'Very Low', returnPct: '7.75% p.a.', icon: '🏛️', minInvest: 1000 },
    { id: 'i10', name: 'Mid Cap Growth Fund', type: 'mf', cat: 'mf', risk: 'Med-High', returnPct: '17-21% p.a.', icon: '🚀', minInvest: 500 },
  ];

  const filtered = filter === 'all' ? investOptions : investOptions.filter(o => o.cat === filter);

  const getRiskColor = (risk) => {
    if (risk === 'Low' || risk === 'Very Low') return 'var(--green)';
    if (risk === 'High') return 'var(--red)';
    return '#ff9800';
  };

  const handleInvest = (option) => {
    const amt = Number(investAmount);
    if (!amt || amt < option.minInvest) {
      showToast(`Minimum investment is ₹${option.minInvest.toLocaleString('en-IN')}`, 'error');
      return;
    }
    if (invest(amt, option)) {
      setSelectedOption(null);
      setInvestAmount('');
    }
  };

  return (
    <div className="page">
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px 20px' }}>
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: '20px' }} onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
          Invest Money
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Choose from curated investment options for every risk appetite
        </p>

        <div style={{
          display: 'flex',
          gap: '2px',
          background: 'var(--bg3)',
          border: '1px solid var(--glass-border)',
          borderRadius: '3px',
          padding: '4px',
          width: 'fit-content',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {['all', 'equity', 'mf', 'crypto', 'fd'].map((f) => (
            <button
              key={f}
              className="btn btn-ghost btn-sm"
              style={{
                padding: '8px 20px',
                fontFamily: 'var(--font-cond)',
                fontSize: '12px',
                letterSpacing: '.09em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all .2s',
                background: filter === f ? 'var(--blue)' : 'transparent',
                border: 'none',
                color: filter === f ? '#fff' : 'var(--silver)'
              }}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'mf' ? 'Mutual Funds' : f === 'fd' ? 'Fixed Deposits' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '28px'
        }}>
          {filtered.map((option) => (
            <div
              key={option.id}
              style={{
                background: 'var(--bg3)',
                border: selectedOption?.id === option.id ? '1px solid var(--blue)' : '1px solid var(--glass-border)',
                borderRadius: '6px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all .25s',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
              onClick={() => setSelectedOption(option)}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(0,157,255,.1)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0
              }}>
                {option.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                  {option.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {option.type.toUpperCase()} · Min ₹{option.minInvest.toLocaleString('en-IN')}
                </div>
                <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  Risk: <span style={{ color: getRiskColor(option.risk) }}>{option.risk}</span>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, color: 'var(--green)', marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                {option.returnPct}
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>Expected</span>
              </div>
            </div>
          ))}
        </div>

        {/* Investment Modal */}
        {selectedOption && (
          <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setSelectedOption(null); }}>
            <div className="modal-box">
              <button className="modal-close" onClick={() => setSelectedOption(null)}>✕</button>
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
                  {selectedOption.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--green)' }}>Expected Return: {selectedOption.returnPct}</div>
              </div>
              <div className="form-grp">
                <label>Investment Amount (₹)</label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  {[5000, 10000, 25000, 50000, 100000, 500000].map((amt) => (
                    <button
                      key={amt}
                      className="btn btn-ghost btn-sm"
                      style={{
                        padding: '9px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-cond)',
                        fontSize: '13px',
                        fontWeight: 600,
                        background: Number(investAmount) === amt ? 'rgba(0,157,255,.2)' : 'rgba(0,157,255,.07)',
                        border: Number(investAmount) === amt ? '1px solid var(--blue)' : '1px solid var(--glass-border)',
                        color: Number(investAmount) === amt ? 'var(--blue)' : '#fff'
                      }}
                      onClick={() => setInvestAmount(amt.toString())}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
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
                ₹{Number(investAmount).toLocaleString('en-IN') || '0'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '20px' }}>
                Est. Annual Return: <span style={{ color: 'var(--green)', fontWeight: 600 }}>
                  ₹{Math.round(Number(investAmount) * (parseFloat(selectedOption.returnPct) || 14) / 100).toLocaleString('en-IN')}
                </span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleInvest(selectedOption)}>
                Confirm Investment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invest;