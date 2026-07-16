// components/Toast.jsx
import React from 'react';
import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  return (
    <div className="toast-wrap">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span className="toast-icon">{icons[toast.type] || 'ℹ️'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toast;