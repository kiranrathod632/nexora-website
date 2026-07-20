// components/TickerBar.jsx
import React, { useState, useEffect } from 'react';

const mktData = [
  { sym: 'NIFTY50', name: 'NIFTY 50', price: '24,198', chg: '+1.47%', up: true },
  { sym: 'SENSEX', name: 'BSE SENSEX', price: '79,408', chg: '+1.52%', up: true },
  { sym: 'BANKNIFTY', name: 'Bank Nifty', price: '52,480', chg: '-0.23%', up: false },
  { sym: 'BTC/INR', name: 'Bitcoin', price: '₹68,12,400', chg: '+3.14%', up: true },
  { sym: 'GOLD', name: 'Gold', price: '₹72,840', chg: '+0.82%', up: true },
  { sym: 'USD/INR', name: 'US Dollar', price: '₹83.42', chg: '-0.05%', up: false },
  { sym: 'CRUDEOIL', name: 'Crude Oil', price: '₹6,820', chg: '-1.10%', up: false },
  { sym: 'SILVER', name: 'Silver', price: '₹88,240', chg: '+1.23%', up: true },
];

const TickerBar = () => {
  const [items, setItems] = useState(mktData);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => prev.map(item => {
        const delta = (Math.random() - 0.5) * 0.2;
        const numChg = parseFloat(item.chg.replace('%', '').replace('+', ''));
        const newChg = (numChg + delta);
        const newPrice = parseFloat(item.price.replace(/,/g, '').replace('₹', '')) * (1 + delta / 100);
        return {
          ...item,
          chg: (newChg > 0 ? '+' : '') + newChg.toFixed(2) + '%',
          up: newChg > 0,
          price: '₹' + Math.round(newPrice).toLocaleString('en-IN')
        };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: '#040410',
      borderBottom: '1px solid var(--glass-border)',
      padding: '7px 0',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 100
    }}>
      <div style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'scroll 50s linear infinite'
      }}>
        {[...items, ...items].map((item, idx) => (
          <span key={idx} className="ticker-item">
            <span style={{ color: '#fff', fontWeight: 700 }}>{item.sym}</span>
            <span style={{ color: 'var(--silver)' }}>{item.price}</span>
            <span style={{ color: item.up ? 'var(--green)' : 'var(--red)' }}>{item.chg}</span>
          </span>
        ))}
      </div>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default TickerBar;