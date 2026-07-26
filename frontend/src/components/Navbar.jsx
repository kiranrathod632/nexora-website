// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.jpeg';

const Navbar = ({ onOpenModal, onLogout }) => {
  const { isLoggedIn, user } = useApp();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/#founders', label: 'About' },
    { to: '/academy', label: 'Academy' },
    { to: '/#plans', label: 'Plans' },
    ...(isLoggedIn ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <img src={logoImg} alt="NEXORA Logo" />
            <span>
              NEX<span style={{ color: 'var(--blue)' }}>ORA</span>
            </span>
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`navbar-link${location.pathname === link.to && link.label !== 'About' && link.label !== 'Plans' ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            {!isLoggedIn ? (
              <>
                <button className="btn btn-ghost btn-sm" onClick={() => onOpenModal('login')}>Login</button>
                <button className="btn btn-primary btn-sm" onClick={() => onOpenModal('register')}>Get Started</button>
              </>
            ) : (
              <>
                <span className="navbar-user">👋 {user.name}</span>
                <button className="btn btn-ghost btn-sm" onClick={onLogout}>Logout</button>
              </>
            )}
          </div>

          <button
            className={`navbar-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="navbar-link"
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}

        <div className="navbar-mobile-actions">
          {!isLoggedIn ? (
            <>
              <button
                className="btn btn-ghost"
                onClick={() => { closeMenu(); onOpenModal('login'); }}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() => { closeMenu(); onOpenModal('register'); }}
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <div className="navbar-mobile-user">👋 {user.name}</div>
              <button
                className="btn btn-ghost"
                onClick={() => { closeMenu(); onLogout(); }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
