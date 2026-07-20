// components/RegisterModal.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.jpeg';

const RegisterModal = ({ isOpen, onClose, onSwitch, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill all required fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError('');
    const userData = {
      name,
      email,
      phone,
      initials: name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    };
    login(userData);
    onRegister(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <img src={logoImg} alt="NEXORA" className="modal-logo" />
        <h2>Create Account</h2>
        <p className="modal-sub">Join 2.4M+ traders on NEXORA</p>
        <div className={`form-error ${error ? 'show' : ''}`}>{error}</div>
        <form onSubmit={handleSubmit}>
          <div className="form-grp">
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Arjun Sharma" />
          </div>
          <div className="form-grp">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="form-grp">
            <label>Mobile Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
          </div>
          <div className="form-grp">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }} type="submit">Create Account</button>
        </form>
        <div className="form-switch">Already have an account? <a onClick={onSwitch}>Sign in</a></div>
      </div>
    </div>
  );
};

export default RegisterModal;