// components/LoginModal.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.jpeg';

const LoginModal = ({ isOpen, onClose, onSwitch, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const userData = { name, email, phone: '', initials: name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) };
    login(userData);
    onLogin(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <img src={logoImg} alt="NEXORA" className="modal-logo" />
        <h2>Welcome Back</h2>
        <p className="modal-sub">Sign in to your NEXORA account</p>
        <div className={`form-error ${error ? 'show' : ''}`}>{error}</div>
        <form onSubmit={handleSubmit}>
          <div className="form-grp">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="form-grp">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }} type="submit">Sign In</button>
        </form>
        <div className="form-switch">Don't have an account? <a onClick={onSwitch}>Create one</a></div>
      </div>
    </div>
  );
};

export default LoginModal;