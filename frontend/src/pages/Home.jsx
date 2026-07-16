// pages/Home.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ onOpenModal }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Hero chart
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 170);
      gradient.addColorStop(0, 'rgba(0,157,255,0.4)');
      gradient.addColorStop(1, 'rgba(0,157,255,0)');

      // Simple chart drawing
      const data = [280000, 295000, 270000, 310000, 340000, 325000, 360000, 390000, 370000, 420000, 455000, 482350];
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      const padding = { top: 20, bottom: 30, left: 10, right: 10 };
      const chartW = width - padding.left - padding.right;
      const chartH = height - padding.top - padding.bottom;
      const min = Math.min(...data) * 0.95;
      const max = Math.max(...data) * 1.02;

      ctx.clearRect(0, 0, width, height);

      // Draw line
      ctx.beginPath();
      ctx.strokeStyle = '#009DFF';
      ctx.lineWidth = 2;
      data.forEach((val, i) => {
        const x = padding.left + (i / (data.length - 1)) * chartW;
        const y = padding.top + chartH - ((val - min) / (max - min)) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Fill gradient
      const lastX = padding.left + chartW;
      ctx.lineTo(lastX, height - padding.bottom);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, 'rgba(0,157,255,0.3)');
      grad.addColorStop(1, 'rgba(0,157,255,0)');
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }, []);

  const courses = [
    { id: 'c1', title: 'Trading Foundations', level: 'beginner', emoji: '📚', desc: 'Master the basics of stock markets, order types, and fundamental analysis', lessons: 12, hours: 8, price: 1999, origPrice: 4999 },
    { id: 'c2', title: 'Technical Analysis Pro', level: 'intermediate', emoji: '📈', desc: 'Chart patterns, indicators, Fibonacci, Elliot Wave, and live trade setups', lessons: 18, hours: 14, price: 4999, origPrice: 9999 },
    { id: 'c3', title: 'Options Strategies', level: 'advanced', emoji: '🎯', desc: 'Iron condors, straddles, spreads & advanced F&O strategies with risk management', lessons: 24, hours: 20, price: 7999, origPrice: 14999 },
    { id: 'c4', title: 'Swing Trading Masterclass', level: 'intermediate', emoji: '⚡', desc: 'Find high-probability swing setups using price action and volume analysis', lessons: 15, hours: 12, price: 2999, origPrice: 5999 },
    { id: 'c5', title: 'Crypto & Web3 Trading', level: 'beginner', emoji: '🪙', desc: 'Bitcoin, Ethereum, DeFi, NFTs — everything you need to trade crypto safely', lessons: 10, hours: 7, price: 1499, origPrice: 2999 },
    { id: 'c6', title: 'Algo Trading with Python', level: 'advanced', emoji: '🤖', desc: 'Build automated trading bots, backtesting frameworks, and live execution systems', lessons: 30, hours: 25, price: 9999, origPrice: 19999 },
  ];

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

  const plans = [
    { name: 'Starter', price: 'Free', period: 'Forever', badge: null, feats: ['Stocks & F&O Trading', 'Basic Charts', '5 Watchlists', 'Email Support', 'Standard Order Types'], no: ['AI Signals', 'Advanced Analytics', 'Priority Support', 'Unlimited Watchlists'] },
    { name: 'Pro', price: '₹999', period: 'Per Month', badge: 'Most Popular', feats: ['Everything in Starter', '100+ Chart Indicators', 'AI Trade Signals', 'Advanced Analytics', 'Priority Chat Support', 'Unlimited Watchlists', 'Options Strategy Builder'], no: [] },
    { name: 'Elite', price: '₹2,499', period: 'Per Month', badge: null, feats: ['Everything in Pro', 'Dedicated Relationship Manager', 'Institutional-grade Data', 'Custom Alerts & Automation', 'API Access', 'Free Academy Courses', '1-on-1 Expert Sessions'], no: [] },
  ];

  const features = [
    { icon: '📊', title: 'Advanced Charts', desc: 'TradingView-grade charts with 100+ indicators, multiple timeframes, and professional drawing tools for precise technical analysis.' },
    { icon: '⚡', title: 'Zero Brokerage', desc: 'Trade equity delivery absolutely free. Flat ₹20 per order for intraday, F&O, currency, and commodity trades. No hidden charges.' },
    { icon: '🤖', title: 'AI Insights', desc: 'Machine learning-powered trade signals, market sentiment analysis, and portfolio optimization recommendations in real-time.' },
    { icon: '🔐', title: 'Bank-Grade Security', desc: '256-bit encryption, 2-factor authentication, biometric login, and SEBI-regulated platform with segregated client funds.' },
    { icon: '📱', title: 'Multi-Device', desc: 'Seamless experience across web, iOS, and Android. Your positions, orders, and watchlists sync instantly across all devices.' },
    { icon: '🎯', title: 'Smart Orders', desc: 'Market, limit, SL, SL-M, GTT orders with OCO functionality. Advanced bracket orders for automated risk management.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: 'calc(100vh - 90px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 20px 60px'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 70% at 50% 30%, rgba(0,157,255,.07), transparent 70%)'
        }} />
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,157,255,.1)',
              border: '1px solid var(--glass-border)',
              borderRadius: '2px',
              padding: '6px 14px',
              fontFamily: 'var(--font-cond)',
              fontSize: '11px',
              letterSpacing: '.2em',
              color: 'var(--blue)',
              textTransform: 'uppercase',
              marginBottom: '22px'
            }}>
              <span style={{ width: '5px', height: '5px', background: 'var(--neon)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              India's Next-Gen Trading Platform
            </div>
            <h4 style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(44px,5.5vw,84px)',
              fontWeight: 700,
              lineHeight: '.95',
              letterSpacing: '.02em',
              textTransform: 'uppercase',
              marginBottom: '22px'
            }}>
              <span style={{ color: 'var(--blue)', display: 'block' }}>our path to financial growth</span>
            </h4>
            <p style={{
              fontSize: '16px',
              color: 'var(--silver)',
              lineHeight: 1.8,
              maxWidth: '480px',
              marginBottom: '36px'
            }}>
              Access stocks, crypto, commodities & derivatives on one powerful platform. Advanced charts, real-time data, and AI-powered insights.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button className="btn btn-primary" onClick={() => onOpenModal('register')}>Start Trading Free</button>
              <button className="btn btn-ghost">Explore Features</button>
            </div>
            <div style={{
              display: 'flex',
              gap: '36px',
              marginTop: '44px',
              paddingTop: '36px',
              borderTop: '1px solid rgba(255,255,255,.06)'
            }}>
              <div><span style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 700, display: 'block' }}>2.4M+</span><span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Active Traders</span></div>
              <div><span style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 700, display: 'block' }}>₹840Cr+</span><span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Daily Volume</span></div>
              <div><span style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 700, display: 'block' }}>99.97%</span><span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Uptime</span></div>
            </div>
          </div>
          <div>
            <div className="glass-card" style={{ animation: 'cardFloat 6s ease-in-out infinite' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px'
              }}>
                <span style={{ fontFamily: 'var(--font-cond)', fontSize: '12px', letterSpacing: '.12em', color: 'var(--silver)', textTransform: 'uppercase' }}>Portfolio Performance</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--green)', fontFamily: 'var(--font-cond)' }}>
                  <span style={{ width: '5px', height: '5px', background: 'var(--green)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
                  Live
                </span>
              </div>
              <div style={{ height: '170px' }}>
                <canvas ref={canvasRef} width={500} height={170} style={{ width: '100%', height: '100%' }} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,.05)'
              }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 700 }}>₹4,82,350</span>
                  <span style={{ fontSize: '12px', color: 'var(--green)', fontFamily: 'var(--font-cond)', marginLeft: '10px' }}>▲ +5.27%</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)' }}>Today +₹24,180</div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginTop: '10px'
              }}>
                <div style={{ background: 'rgba(0,157,255,.05)', border: '1px solid rgba(0,157,255,.12)', borderRadius: '4px', padding: '12px' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '17px', fontWeight: 600, color: 'var(--green)' }}>+₹58,240</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '.07em', textTransform: 'uppercase', marginTop: '2px' }}>Monthly P&L</div>
                </div>
                <div style={{ background: 'rgba(0,157,255,.05)', border: '1px solid rgba(0,157,255,.12)', borderRadius: '4px', padding: '12px' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '17px', fontWeight: 600 }}>68.4%</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '.07em', textTransform: 'uppercase', marginTop: '2px' }}>Win Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: .4; transform: scale(.7); }
            }
            @keyframes cardFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
          `}
        </style>
      </section>

      {/* Market Overview */}
      <section className="section" id="markets" style={{ paddingTop: '60px' }}>
        <div className="s-inner">
          <div className="s-head">
            <div className="s-tag">Live Markets</div>
            <h2 className="s-title">Market Overview</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            background: 'var(--glass-border)',
            border: '1px solid var(--glass-border)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '24px'
          }}>
            {mktData.map((m, i) => (
              <div key={i} style={{ background: 'var(--bg2)', padding: '18px 22px', cursor: 'pointer', transition: 'background .2s' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, letterSpacing: '.04em' }}>{m.sym}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 10px', fontFamily: 'var(--font-cond)' }}>{m.name}</div>
                <div style={{ fontFamily: 'var(--font-cond)', fontSize: '15px', fontWeight: 600 }}>{m.price}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-cond)', color: m.up ? 'var(--green)' : 'var(--red)' }}>{m.chg}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Features */}
      <section className="section" id="features">
        <div className="s-inner">
          <div className="s-head" style={{ textAlign: 'center' }}>
            <div className="s-tag" style={{ justifyContent: 'center', display: 'flex' }}>Why NEXORA</div>
            <h2 className="s-title" style={{ textAlign: 'center' }}>Everything You Need</h2>
            <p className="s-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Professional-grade tools for every type of trader, from beginner to institutional.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--glass-border)'
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: 'var(--bg)',
                padding: '38px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background .3s'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(0,157,255,.1)',
                  border: '1px solid rgba(0,157,255,.2)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '22px',
                  fontSize: '20px'
                }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '19px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Academy */}
      <section className="section" id="academy" style={{ background: 'var(--bg2)' }}>
        <div className="s-inner">
          <div className="s-head" style={{ textAlign: 'center' }}>
            <div className="s-tag" style={{ justifyContent: 'center', display: 'flex' }}>NEXORA Academy</div>
            <h2 className="s-title" style={{ textAlign: 'center' }}>Master The Markets</h2>
            <p className="s-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Structured courses from professional fund managers. Learn at your pace and earn certificates.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '22px'
          }}>
            {courses.slice(0, 3).map((c) => (
              <div key={c.id} style={{
                background: 'var(--bg2)',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px',
                overflow: 'hidden',
                transition: 'all .3s',
                cursor: 'pointer'
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
                </div>
                <div style={{ padding: '18px' }}>
                  <div style={{
                    fontFamily: 'var(--font-cond)',
                    fontSize: '11px',
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    marginBottom: '7px',
                    color: c.level === 'beginner' ? 'var(--green)' : c.level === 'intermediate' ? 'var(--blue)' : '#ff9800'
                  }}>● {c.level.charAt(0).toUpperCase() + c.level.slice(1)}</div>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '7px' }}>{c.title}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.6 }}>{c.desc}</p>
                  <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)' }}>
                    <span>📖 {c.lessons} Lessons</span>
                    <span>⏱ {c.hours}h</span>
                    <span>🎓 Certificate</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, color: 'var(--blue)', marginTop: '12px' }}>
                    ₹{c.price.toLocaleString('en-IN')}
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '6px' }}>₹{c.origPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Plans */}
      <section className="section" id="plans">
        <div className="s-inner">
          <div className="s-head" style={{ textAlign: 'center' }}>
            <div className="s-tag" style={{ justifyContent: 'center', display: 'flex' }}>Membership Plans</div>
            <h2 className="s-title" style={{ textAlign: 'center' }}>Choose Your Plan</h2>
            <p className="s-sub" style={{ margin: '0 auto', textAlign: 'center' }}>Unlock premium features, advanced analytics and priority support with our flexible plans.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '16px'
          }}>
            {plans.map((p, i) => (
              <div key={i} style={{
                background: 'var(--bg2)',
                border: `1px solid ${p.badge ? 'var(--blue)' : 'var(--glass-border)'}`,
                borderRadius: '8px',
                padding: '36px',
                position: 'relative',
                transition: 'all .3s',
                background: p.badge ? 'linear-gradient(135deg,rgba(0,157,255,.06),rgba(0,191,255,.02))' : 'var(--bg2)'
              }}>
                {p.badge && <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--blue)',
                  color: '#fff',
                  fontFamily: 'var(--font-cond)',
                  fontSize: '11px',
                  letterSpacing: '.15em',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  textTransform: 'uppercase'
                }}>{p.badge}</div>}
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '22px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '44px', fontWeight: 700, color: 'var(--blue)', lineHeight: 1, marginBottom: '4px' }}>{p.price}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)', marginBottom: '28px' }}>{p.period}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {p.feats.map((f, j) => <li key={j} style={{ fontSize: '13px', color: 'var(--silver)', display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ content: "'✓'", color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}</li>)}
                  {p.no.map((f, j) => <li key={j} style={{ fontSize: '13px', color: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ content: "'✗'", color: 'rgba(255,255,255,.2)', fontWeight: 700, flexShrink: 0 }}>✗</span> {f}</li>)}
                </ul>
                <button className={`btn ${p.badge ? 'btn-primary' : 'btn-ghost'}`} style={{ width: '100%' }} onClick={() => onOpenModal('register')}>
                  {p.name === 'Starter' ? 'Get Started Free' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg,rgba(0,157,255,.08),rgba(0,191,255,.03))',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '100px 20px',
        textAlign: 'center'
      }}>
        <div className="s-inner">
          <div className="s-tag" style={{ justifyContent: 'center', display: 'flex' }}>Get Started Today</div>
          <h2 className="s-title" style={{ textAlign: 'center', fontSize: 'clamp(36px,5vw,72px)', textShadow: '0 0 20px rgba(0,157,255,.5)' }}>Build Your Next Era</h2>
          <p style={{ color: 'var(--silver)', fontSize: '16px', margin: '16px 0 40px' }}>Join 2.4 million traders who trust NEXORA with their financial future.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => onOpenModal('register')} style={{ padding: '14px 36px', fontSize: '15px' }}>Open Free Account</button>
            <button className="btn btn-ghost" style={{ padding: '14px 36px', fontSize: '15px' }}>Explore Academy</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg)',
        borderTop: '1px solid rgba(255,255,255,.05)',
        padding: '60px 20px 30px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '50px',
            marginBottom: '50px'
          }}>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '280px' }}>
                NEXORA is a SEBI-registered stockbroker. Invest in stocks, mutual funds, F&O, crypto and more — all on one platform. Build the next era of your wealth.
              </p>
            </div>
            <div><h4 style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '18px' }}>Company</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <li><a style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '12px', cursor: 'pointer' }}>About Us</a></li>
                <li><a style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '12px', cursor: 'pointer' }}>Careers</a></li>
                <li><a style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '12px', cursor: 'pointer' }}>Blog</a></li>
              </ul>
            </div>
            <div><h4 style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '18px' }}>Products</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <li><Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '12px' }}>Stocks & F&O</Link></li>
                <li><Link to="/academy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '12px' }}>Academy</Link></li>
                <li><span style={{ color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer' }}>Subscriptions</span></li>
              </ul>
            </div>
            <div><h4 style={{ fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '18px' }}>Support</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <li><a style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '12px', cursor: 'pointer' }}>Help Center</a></li>
                <li><a style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '12px', cursor: 'pointer' }}>Privacy Policy</a></li>
                <li><a style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '12px', cursor: 'pointer' }}>Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.04)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>© 2025 NEXORA Technologies Pvt. Ltd. All rights reserved. SEBI Reg: INZ000000000</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;