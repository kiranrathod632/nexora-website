// components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.jpeg';

const Navbar = ({ onOpenModal, onLogout }) => {
  const { isLoggedIn, user } = useApp();
  const navigate = useNavigate();

  const handleShowPage = (path) => {
    navigate(path);
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      background: 'rgba(5,5,8,.96)',
      borderBottom: '1px solid var(--glass-border)',
      backdropFilter: 'blur(24px)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        height: '62px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src={logoImg} alt="NEXORA Logo" style={{ height: '40px', width: '40px', objectFit: 'contain', borderRadius: '4px' }} />
          <span style={{ fontFamily: 'var(--font-head)', fontSize: '22px', fontWeight: 700, letterSpacing: '.1em', color: '#fff' }}>
            NEX<span style={{ color: 'var(--blue)' }}>ORA</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--silver)', textDecoration: 'none', fontFamily: 'var(--font-cond)', fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Home
          </Link>
          <Link to="/" style={{ color: 'var(--silver)', textDecoration: 'none', fontFamily: 'var(--font-cond)', fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            About
          </Link>
          <Link to="/academy" style={{ color: 'var(--silver)', textDecoration: 'none', fontFamily: 'var(--font-cond)', fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Academy
          </Link>
          <Link to="/" style={{ color: 'var(--silver)', textDecoration: 'none', fontFamily: 'var(--font-cond)', fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Plans
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-cond)', fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Dashboard
            </Link>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {!isLoggedIn ? (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => onOpenModal('login')}>Login</button>
              <button className="btn btn-primary btn-sm" onClick={() => onOpenModal('register')}>Get Started</button>
            </>
          ) : (
            <>
              <span style={{ fontSize: '13px', color: 'var(--silver)' }}>👋 {user.name}</span>
              <button className="btn btn-ghost btn-sm" onClick={onLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;