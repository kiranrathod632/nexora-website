// context/AppContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', phone: '', initials: '' });
  const [balance, setBalance] = useState(128000);
  const [courses, setCourses] = useState([]);
  const [transactions, setTransactions] = useState([
    { id: 'TXN001', date: '04 Jun 2025, 09:14', desc: 'Funds Added via UPI', type: 'credit', amount: 50000, status: 'success' },
    { id: 'TXN002', date: '03 Jun 2025, 14:22', desc: 'RELIANCE — Buy 10 shares', type: 'invest', amount: -24800, status: 'success' },
    { id: 'TXN003', date: '02 Jun 2025, 11:05', desc: 'Technical Analysis Pro Course', type: 'course', amount: -4999, status: 'success' },
    { id: 'TXN004', date: '01 Jun 2025, 16:30', desc: 'Funds Added via Net Banking', type: 'credit', amount: 100000, status: 'success' },
    { id: 'TXN005', date: '30 May 2025, 10:45', desc: 'TCS — Buy 5 shares', type: 'invest', amount: -19000, status: 'success' },
    { id: 'TXN006', date: '28 May 2025, 09:00', desc: 'Withdrawal to Bank', type: 'debit', amount: -25000, status: 'success' },
    { id: 'TXN007', date: '25 May 2025, 13:15', desc: 'HDFC Bank — Buy 20 shares', type: 'invest', amount: -31200, status: 'success' },
    { id: 'TXN008', date: '22 May 2025, 16:00', desc: 'Premium Subscription — Monthly', type: 'debit', amount: -999, status: 'success' },
    { id: 'TXN009', date: '20 May 2025, 08:30', desc: 'Swing Trading Masterclass', type: 'course', amount: -2999, status: 'success' },
    { id: 'TXN010', date: '15 May 2025, 11:00', desc: 'Funds Added via UPI', type: 'credit', amount: 75000, status: 'success' },
  ]);

  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const login = useCallback((userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser({ name: '', email: '', phone: '', initials: '' });
  }, []);

  const addFunds = useCallback((amount, method) => {
    setBalance(prev => prev + amount);
    const newTx = {
      id: 'TXN' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      desc: `Funds Added via ${method.toUpperCase()}`,
      type: 'credit',
      amount,
      status: 'success'
    };
    setTransactions(prev => [newTx, ...prev]);
    return true;
  }, []);

  const buyCourse = useCallback((course) => {
    if (balance < course.price) {
      showToast('Insufficient balance! Please add funds first.', 'error');
      return false;
    }
    setBalance(prev => prev - course.price);
    setCourses(prev => [...prev, course.id]);
    const newTx = {
      id: 'TXN' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      desc: course.title + ' — Course Purchase',
      type: 'course',
      amount: -course.price,
      status: 'success'
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast('Course enrolled successfully! 🎓', 'success');
    return true;
  }, [balance, showToast]);

  const invest = useCallback((amount, option) => {
    if (balance < amount) {
      showToast('Insufficient balance. Add funds first.', 'error');
      return false;
    }
    setBalance(prev => prev - amount);
    const newTx = {
      id: 'TXN' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      desc: option.name + ' — Investment',
      type: 'invest',
      amount: -amount,
      status: 'success'
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast(`Investment of ₹${amount.toLocaleString('en-IN')} confirmed! 🎉`, 'success');
    return true;
  }, [balance, showToast]);

  const value = {
    isLoggedIn,
    user,
    balance,
    courses,
    transactions,
    toasts,
    setToasts,
    showToast,
    login,
    logout,
    addFunds,
    buyCourse,
    invest,
    setBalance,
    setTransactions,
    setCourses
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};