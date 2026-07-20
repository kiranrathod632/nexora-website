// pages/Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { user, balance, transactions, courses } = useApp();
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const holdings = [
    { sym: 'RELIANCE', name: 'Reliance Industries', qty: 10, avg: 2480, ltp: 2612, change: 5.32 },
    { sym: 'TCS', name: 'Tata Consultancy', qty: 5, avg: 3800, ltp: 4102, change: 7.95 },
    { sym: 'HDFCBANK', name: 'HDFC Bank', qty: 20, avg: 1560, ltp: 1624, change: 4.10 },
    { sym: 'INFY', name: 'Infosys', qty: 15, avg: 1420, ltp: 1508, change: 6.20 },
    { sym: 'WIPRO', name: 'Wipro Ltd', qty: 30, avg: 450, ltp: 482, change: 7.11 },
    { sym: 'ICICIBANK', name: 'ICICI Bank', qty: 25, avg: 940, ltp: 1012, change: 7.66 },
  ];

  const mktData = [
    { sym: 'NIFTY50', name: 'NIFTY 50', price: '24,198', chg: '+1.47%', up: true },
    { sym: 'SENSEX', name: 'BSE SENSEX', price: '79,408', chg: '+1.52%', up: true },
    { sym: 'BANKNIFTY', name: 'Bank Nifty', price: '52,480', chg: '-0.23%', up: false },
    { sym: 'BTC/INR', name: 'Bitcoin', price: '₹68,12,400', chg: '+3.14%', up: true },
    { sym: 'GOLD', name: 'Gold', price: '₹72,840', chg: '+0.82%', up: true },
  ];

  useEffect(() => {
    // Build chart
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const data = [320000, 328000, 322000, 335000, 341000, 338000, 352000, 361000, 355000, 372000, 368000, 381000, 395000, 388000, 402000, 411000, 408000, 420000, 415000, 428000, 436000, 430000, 445000, 452000, 448000, 461000, 468000, 462000, 476000, 482350];
      const labels = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

      const w = chartRef.current.width;
      const h = chartRef.current.height;
      const p = { top: 20, bottom: 30, left: 10, right: 10 };
      const chartW = w - p.left - p.right;
      const chartH = h - p.top - p.bottom;
      const min = Math.min(...data) * 0.95;
      const max = Math.max(...data) * 1.02;

      ctx.clearRect(0, 0, w, h);

      // Draw area
      ctx.beginPath();
      data.forEach((val, i) => {
        const x = p.left + (i / (data.length - 1)) * chartW;
        const y = p.top + chartH - ((val - min) / (max - min)) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      const lastX = p.left + chartW;
      ctx.lineTo(lastX, h - p.bottom);
      ctx.lineTo(p.left, h - p.bottom);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, 'rgba(0,157,255,0.35)');
      grad.addColorStop(1, 'rgba(0,157,255,0)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      ctx.strokeStyle = '#009DFF';
      ctx.lineWidth = 2;
      data.forEach((val, i) => {
        const x = p.left + (i / (data.length - 1)) * chartW;
        const y = p.top + chartH - ((val - min) / (max - min)) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
  }, []);

  return (
    <div style={{ background: 'var(--bg2)', minHeight: 'calc(100vh - 62px)', padding: '24px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 700, textTransform: 'uppercase' }}>
              Hello, <span style={{ color: 'var(--blue)' }}>{user.name || 'Trader'}</span> 👋
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/transactions')}>📋 Transactions</button>
            <button className="btn btn-success btn-sm" onClick={() => navigate('/add-funds')}>+ Add Funds</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/invest')}>📈 Invest</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div className="glass-card" style={{
            padding: '20px',
            borderLeft: '3px solid var(--green)'
          }}>
            <div style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Portfolio Value</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700 }}>₹4,82,350</div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-cond)', marginTop: '4px', color: 'var(--green)' }}>▲ +₹24,180 Today</div>
          </div>
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Available Balance</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700 }}>₹{balance.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-cond)', marginTop: '4px', color: 'var(--text-muted)' }}>Ready to deploy</div>
          </div>
          <div className="glass-card" style={{
            padding: '20px',
            borderLeft: '3px solid var(--green)'
          }}>
            <div style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Monthly P&L</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700, color: 'var(--green)' }}>+₹58,240</div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-cond)', marginTop: '4px', color: 'var(--green)' }}>▲ +12.47%</div>
          </div>
          <div className="glass-card" style={{
            padding: '20px',
            borderLeft: '3px solid var(--gold)'
          }}>
            <div style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Win Rate</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700 }}>68.4%</div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-cond)', marginTop: '4px', color: 'var(--text-muted)' }}>Last 90 trades</div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <div>
            {/* Chart */}
            <div className="glass-card" style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: 'var(--font-head)',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                Portfolio Performance
                <div style={{
                  display: 'flex',
                  gap: '2px',
                  background: 'var(--bg3)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '3px',
                  padding: '4px'
                }}>
                  {['1W', '1M', '3M', '1Y'].map(p => (
                    <button key={p} className="btn btn-ghost btn-sm" style={{ padding: '4px 12px', fontSize: '10px', border: p === '1M' ? '1px solid var(--blue)' : 'none', background: p === '1M' ? 'var(--blue)' : 'transparent', color: p === '1M' ? '#fff' : 'var(--silver)' }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ height: '240px' }}>
                <canvas ref={chartRef} width={600} height={240} style={{ width: '100%', height: '100%' }} />
              </div>
            </div>

            {/* Holdings */}
            <div className="glass-card">
              <div style={{
                fontFamily: 'var(--font-head)',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                Holdings <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>6 Stocks</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,.05)' }}>Stock</th>
                    <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,.05)' }}>Qty</th>
                    <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,.05)' }}>Avg</th>
                    <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,.05)' }}>LTP</th>
                    <th style={{ fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,.05)' }}>P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h, i) => {
                    const pnl = (h.ltp - h.avg) * h.qty;
                    const pct = ((h.ltp - h.avg) / h.avg * 100).toFixed(2);
                    return (
                      <tr key={i}>
                        <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px' }}>
                          <div style={{ fontFamily: 'var(--font-head)', fontSize: '14px', fontWeight: 700 }}>{h.sym}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{h.name}</div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px' }}>{h.qty}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px' }}>₹{h.avg.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px' }}>₹{h.ltp.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,.03)', fontSize: '13px', color: pnl >= 0 ? 'var(--green)' : 'var(--red)' }}>
                          ₹{Math.round(pnl).toLocaleString('en-IN')} ({pnl >= 0 ? '+' : ''}{pct}%)
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Wallet */}
            <div className="glass-card">
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '16px' }}>Wallet</div>
              <div style={{
                background: 'linear-gradient(135deg,rgba(0,157,255,.1),rgba(0,191,255,.05))',
                border: '1px solid var(--blue)',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                <div style={{ fontFamily: 'var(--font-cond)', fontSize: '12px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--silver)', marginBottom: '8px' }}>Available Balance</div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '32px', fontWeight: 700, color: 'var(--blue)' }}>₹{balance.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>Last funded: Today, 09:14 AM</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => navigate('/add-funds')}>+ Add Funds</button>
                <button className="btn btn-ghost btn-sm" style={{ width: '100%' }} onClick={() => navigate('/transactions')}>History</button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card">
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '16px' }}>Quick Actions</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { icon: '📈', label: 'Invest', path: '/invest' },
                  { icon: '🎓', label: 'Academy', path: '/academy' },
                  { icon: '📋', label: 'Transactions', path: '/transactions' },
                  { icon: '👤', label: 'Profile', path: '/profile' }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(0,157,255,.08)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '4px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all .2s',
                    textAlign: 'center',
                    color: '#fff',
                    fontFamily: 'var(--font-cond)',
                    fontSize: '12px',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase'
                  }} onClick={() => navigate(item.path)}>
                    <span style={{ fontSize: '22px', marginBottom: '8px', display: 'block' }}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Movers */}
            <div className="glass-card">
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '16px' }}>Top Movers</div>
              {mktData.map((m, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: i < mktData.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none'
                }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700 }}>{m.sym}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.name}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-cond)', fontSize: '13px' }}>{m.price}</div>
                    <div style={{ fontSize: '11px', color: m.up ? 'var(--green)' : 'var(--red)' }}>{m.chg}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;