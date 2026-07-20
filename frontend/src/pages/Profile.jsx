// pages/Profile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, balance, courses, logout, showToast } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
    showToast('Signed out successfully. See you soon!', 'info');
  };

  return (
    <div className="page">
      <div className="page-wrap">
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: '20px' }} onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '26px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px' }}>
          My Profile
        </h2>

        <div className="profile-grid">
          <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,var(--blue),var(--neon))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-head)',
              fontSize: '30px',
              fontWeight: 700,
              margin: '0 auto 16px',
              border: '2px solid var(--glass-border)'
            }}>
              {user.initials || 'U'}
            </div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>
              {user.name || 'Trader'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {user.email || ''}
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(0,157,255,.1)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '4px 14px',
              fontFamily: 'var(--font-cond)',
              fontSize: '11px',
              color: 'var(--blue)',
              marginTop: '12px'
            }}>
              ✦ Premium Member
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-cond)',
              fontSize: '12px',
              color: 'var(--green)',
              justifyContent: 'center',
              marginTop: '8px'
            }}>
              ✅ KYC Verified
            </div>
            <div className="profile-mini-stats">
              <div style={{
                background: 'var(--bg2)',
                border: '1px solid var(--glass-border)',
                borderRadius: '4px',
                padding: '14px',
                textAlign: 'center'
              }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, color: 'var(--blue)' }}>
                  {courses.length}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Courses</div>
              </div>
              <div style={{
                background: 'var(--bg2)',
                border: '1px solid var(--glass-border)',
                borderRadius: '4px',
                padding: '14px',
                textAlign: 'center'
              }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, color: 'var(--green)' }}>
                  ₹{balance.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Balance</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '24px', color: 'var(--blue)' }}>
              Account Details
            </h3>
            <div className="profile-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '14px 0', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase', width: '40%' }}>Full Name</td>
                  <td style={{ padding: '14px 0', fontSize: '13px' }}>{user.name || '-'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 0', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase' }}>Email</td>
                  <td style={{ padding: '14px 0', fontSize: '13px' }}>{user.email || '-'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 0', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase' }}>Mobile</td>
                  <td style={{ padding: '14px 0', fontSize: '13px' }}>{user.phone || '+91 98765 43210'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 0', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase' }}>Account ID</td>
                  <td style={{ padding: '14px 0', fontSize: '13px' }}>NXR-2024-004821</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 0', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase' }}>Member Since</td>
                  <td style={{ padding: '14px 0', fontSize: '13px' }}>January 2024</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 0', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase' }}>Plan</td>
                  <td style={{ padding: '14px 0', fontSize: '13px' }}><span style={{ color: 'var(--blue)', fontFamily: 'var(--font-cond)' }}>PREMIUM</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 0', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-cond)', fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase' }}>2FA Status</td>
                  <td style={{ padding: '14px 0', fontSize: '13px' }}><span style={{ color: 'var(--green)' }}>Enabled</span></td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="profile-actions">
              <button className="btn btn-primary btn-sm">Edit Profile</button>
              <button className="btn btn-ghost btn-sm">Change Password</button>
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;