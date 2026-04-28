import React, { useState, useEffect } from 'react';
import { User, Shield, Moon, Sun, Bell, Globe, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = ({ user, onLogout }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [notifications, setNotifications] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      showToast(`Switched to ${newTheme === 'light' ? 'Light' : 'Dark'} Mode`);
      return newTheme;
    });
  };

  const handleNotificationToggle = () => {
    setNotifications(prev => {
      const newState = !prev;
      showToast(`Notifications turned ${newState ? 'on' : 'off'}`);
      return newState;
    });
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <h1 className="text-gradient" style={{ marginBottom: '8px' }}>Account Settings</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Manage your profile, preferences, and security.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Profile Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} color="var(--accent-primary)" /> Profile Details
          </h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Full Name</label>
            <input 
              type="text" 
              value={user?.name || 'RK'} 
              disabled 
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '8px', opacity: 0.7 }} 
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Platform Role</label>
            <input 
              type="text" 
              value={user?.role || 'Learner'} 
              disabled 
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '8px', opacity: 0.7 }} 
            />
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel">
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={20} color="var(--accent-tertiary)" /> Preferences
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
            <div>
              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />} Appearance
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Toggle between dark and light mode</div>
            </div>
            
            {/* Skeuomorphic Day/Night Toggle */}
            <div 
              onClick={toggleTheme}
              style={{ 
                width: '90px', height: '40px', borderRadius: '20px', 
                background: theme === 'dark' ? '#1c2135' : '#69c0ff',
                boxShadow: 'inset 0px 4px 8px rgba(0,0,0,0.3)', 
                position: 'relative', cursor: 'pointer', transition: 'background 0.5s ease',
                overflow: 'hidden',
                display: 'flex', alignItems: 'center'
              }}
            >
              {/* Day Clouds */}
              <AnimatePresence>
                {theme === 'light' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                     <div style={{ position: 'absolute', bottom: '-5px', right: '5px', width: '30px', height: '30px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%' }}></div>
                     <div style={{ position: 'absolute', bottom: '-10px', right: '25px', width: '40px', height: '40px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%' }}></div>
                     <div style={{ position: 'absolute', bottom: '-15px', right: '50px', width: '50px', height: '50px', background: 'white', borderRadius: '50%' }}></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Night Stars */}
              <AnimatePresence>
                {theme === 'dark' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                     <div style={{ position: 'absolute', top: '10px', left: '20px', width: '3px', height: '3px', background: 'white', borderRadius: '50%', boxShadow: '0 0 4px white' }}></div>
                     <div style={{ position: 'absolute', top: '25px', left: '35px', width: '2px', height: '2px', background: 'white', borderRadius: '50%' }}></div>
                     <div style={{ position: 'absolute', top: '8px', left: '45px', width: '4px', height: '4px', background: 'white', borderRadius: '50%', boxShadow: '0 0 6px white' }}></div>
                     <div style={{ position: 'absolute', top: '20px', left: '15px', width: '2px', height: '2px', background: 'white', borderRadius: '50%' }}></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Animated Knob */}
              <motion.div 
                animate={{ x: theme === 'dark' ? 54 : 4, rotate: theme === 'dark' ? 0 : 90 }} 
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ 
                  width: '32px', height: '32px', 
                  background: theme === 'dark' ? '#d8e2e7' : '#ffd700', 
                  borderRadius: '50%', position: 'absolute',
                  boxShadow: theme === 'dark' 
                    ? 'inset -4px -4px 6px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.5)' 
                    : 'inset -3px -3px 6px rgba(230,150,0,0.6), inset 2px 2px 5px rgba(255,255,255,0.8), 0 2px 6px rgba(0,0,0,0.3)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
                }} 
              >
                {/* Moon Craters */}
                {theme === 'dark' && (
                  <>
                    <div style={{ position: 'absolute', width: '8px', height: '8px', background: '#aeb9c1', borderRadius: '50%', top: '6px', left: '6px', boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)' }}></div>
                    <div style={{ position: 'absolute', width: '12px', height: '12px', background: '#aeb9c1', borderRadius: '50%', bottom: '4px', right: '6px', boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)' }}></div>
                    <div style={{ position: 'absolute', width: '5px', height: '5px', background: '#aeb9c1', borderRadius: '50%', top: '14px', right: '8px', boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)' }}></div>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
            <div>
              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={18} /> Notifications
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Enable push notifications</div>
            </div>
            
            <div 
              onClick={handleNotificationToggle}
              style={{ 
                width: '50px', height: '26px', borderRadius: '13px', 
                background: notifications ? 'var(--success)' : '#ccc', 
                position: 'relative', cursor: 'pointer', transition: 'background 0.3s' 
              }}
            >
              <motion.div 
                animate={{ x: notifications ? 26 : 2 }} 
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{ 
                  width: '22px', height: '22px', background: 'white', 
                  borderRadius: '50%', position: 'absolute', top: '2px', 
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)' 
                }} 
              />
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={20} color="var(--success)" /> Security
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Two-Factor Authentication (2FA)</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Add an extra layer of security.</div>
            </div>
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>Enable 2FA</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#ef4444' }}>Danger Zone</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Log out from this device.</div>
            </div>
            <button 
              onClick={onLogout}
              style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </motion.div>

      </div>

      {/* Global Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ 
              position: 'fixed', 
              bottom: '40px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              background: 'var(--accent-primary)', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '24px', 
              boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
              fontWeight: 600,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Bell size={16} /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
