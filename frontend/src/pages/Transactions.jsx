// pages/Transactions.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Transactions = () => {
  const navigate = useNavigate();
  const { transactions } = useApp();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  const getBadgeClass = (type) => {
    const classes = {
      credit: 'badge-credit',
      debit: 'badge-debit',
      invest: 'badge-invest',
      course: 'badge-course'
    };
    return classes[type] || 'badge-credit';
  };

  const getStatusClass = (status) => {
    return status === 'success' ? 'badge-credit' : 'badge-pending';
  };

  return (
    <div className="page">
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <button className="btn btn-ghost btn-sm" style={{ marginBottom: '10px' }} onClick={() => navigate('/dashboard')}>
              ← Back to Dashboard
            </button>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 700, textTransform: 'uppercase' }}>
              Transaction History
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              All your trades, fund transfers and purchases
            </p>
          </div>
          <button className="btn btn-success btn-sm" onClick={() => navigate('/add-funds')}>+ Add Funds</button>
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}>
          {['all', 'credit', 'debit', 'invest', 'course'].map((f) => (
            <button
              key={f}
              className={`btn btn-ghost btn-sm`}
              style={{
                padding: '7px 16px',
                fontFamily: 'var(--font-cond)',
                fontSize: '12px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all .2s',
                background: filter === f ? 'var(--blue)' : 'var(--bg3)',
                border: filter === f ? '1px solid var(--blue)' : '1px solid var(--glass-border)',
                color: filter === f ? '#fff' : 'var(--silver)'
              }}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
            </button>
          ))}
        </div>

        <div className="glass-card table-scroll" style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr>
                <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '10px 16px', borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>#</th>
                <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '10px 16px', borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>Date & Time</th>
                <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '10px 16px', borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>Description</th>
                <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '10px 16px', borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>Type</th>
                <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '10px 16px', borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>Amount</th>
                <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '10px 16px', borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id}>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)', fontSize: '11px' }}>{t.id}</td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px', fontSize: '12px', color: 'var(--text-muted)' }}>{t.date}</td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px' }}>{t.desc}</td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-cond)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                      background: t.type === 'credit' ? 'rgba(0,230,118,.12)' : 
                                 t.type === 'debit' ? 'rgba(255,82,82,.12)' :
                                 t.type === 'invest' ? 'rgba(0,157,255,.12)' :
                                 'rgba(255,215,0,.1)',
                      color: t.type === 'credit' ? 'var(--green)' :
                             t.type === 'debit' ? 'var(--red)' :
                             t.type === 'invest' ? 'var(--blue)' :
                             'var(--gold)',
                      border: t.type === 'credit' ? '1px solid rgba(0,230,118,.25)' :
                              t.type === 'debit' ? '1px solid rgba(255,82,82,.25)' :
                              t.type === 'invest' ? '1px solid rgba(0,157,255,.25)' :
                              '1px solid rgba(255,215,0,.2)'
                    }}>
                      {t.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px', color: t.amount > 0 ? 'var(--green)' : 'var(--red)', fontFamily: 'var(--font-cond)', fontWeight: 600 }}>
                    {t.amount > 0 ? '+' : ''} ₹{Math.abs(t.amount).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-cond)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                      background: t.status === 'success' ? 'rgba(0,230,118,.12)' : 'rgba(255,152,0,.12)',
                      color: t.status === 'success' ? 'var(--green)' : '#ff9800',
                      border: t.status === 'success' ? '1px solid rgba(0,230,118,.25)' : '1px solid rgba(255,152,0,.25)'
                    }}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;