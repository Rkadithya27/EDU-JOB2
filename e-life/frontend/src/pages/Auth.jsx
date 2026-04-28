import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, UserCircle, Briefcase, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Auth = ({ setAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Learner' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.includes('@')) return 'Please enter a valid email address.';
    if (formData.password.length < 6) return 'Password must be at least 6 characters long.';
    if (!isLogin && !otpSent && formData.name.trim() === '') return 'Full Name is required.';
    return null;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, token: otp })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Invalid OTP Code');
      }
      
      setError('');
      const displayRole = formData.role.charAt(0).toUpperCase() + formData.role.slice(1);
      setAuthenticated({ name: formData.name || 'RK', role: displayRole });
      
      // Navigate to domain specific page
      if (displayRole === 'Policymaker' || displayRole === 'Mediator') {
        navigate('/analytics');
      } else if (displayRole === 'Trainer') {
        navigate('/courses');
      } else {
        navigate('/learning-paths');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (!isLogin) {
        // Register User via Python Backend
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/users/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role
          })
        });

        if (!res.ok) {
           const errData = await res.json();
           const detail = errData.detail;
           const errorMsg = Array.isArray(detail) ? detail[0].msg : (typeof detail === 'string' ? detail : JSON.stringify(detail));
           throw new Error(errorMsg || 'Registration failed');
        }

        const data = await res.json();
        formData.name = data.name;
        formData.role = data.role;
        
        // Trigger 2FA Email OTP using custom Python Backend
        const otpRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/users/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        });
        
        if (!otpRes.ok) {
          const errData = await otpRes.json();
          throw new Error(errData.detail || "Failed to send 2FA OTP email.");
        }
        
        setOtpSent(true);
        setIsLoading(false);
        return; // Exit here, wait for OTP verification
        
      } else {
        // Login Logic via Python Backend
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        if (!res.ok) {
           const errData = await res.json();
           const detail = errData.detail;
           const errorMsg = Array.isArray(detail) ? detail[0].msg : (typeof detail === 'string' ? detail : JSON.stringify(detail));
           throw new Error(errorMsg || 'Login failed');
        }

        const data = await res.json();
        formData.name = data.name;
        formData.role = data.role;
        
        // Trigger 2FA Email OTP using custom Python Backend
        const otpRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/users/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        });
        
        if (!otpRes.ok) {
          const errData = await otpRes.json();
          throw new Error(errData.detail || "Failed to send 2FA OTP email.");
        }
        
        setOtpSent(true);
        setIsLoading(false);
        return; // Exit here, wait for OTP verification
      }

      // Ensure we capitalize role properly for the frontend layout logic
      const displayRole = formData.role.charAt(0).toUpperCase() + formData.role.slice(1);
      
      setError('');
      setAuthenticated({ name: formData.name, role: displayRole });
      
      if (displayRole === 'Policymaker' || displayRole === 'Mediator') {
        navigate('/analytics');
      } else if (displayRole === 'Trainer') {
        navigate('/courses');
      } else {
        navigate('/learning-paths');
      }
    } catch (err) {
      if (err?.message === "Failed to fetch") {
         setError("Could not connect to the backend server. Make sure it is running on port 8000.");
      } else {
         setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { value: 'Learner', icon: <GraduationCap size={18} /> },
    { value: 'Policymaker', icon: <Briefcase size={18} /> },
    { value: 'Trainer', icon: <UserCircle size={18} /> }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Left side - Decorative Visuals */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{ 
          flex: 1, 
          display: 'flex',
          position: 'relative', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: '4rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
          borderRight: '1px solid var(--glass-border)'
        }}
        className="d-none d-md-flex"
      >
        <div style={{ position: 'absolute', top: '10%', left: '10%', filter: 'blur(60px)', background: 'rgba(99, 102, 241, 0.3)', width: '300px', height: '300px', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', filter: 'blur(60px)', background: 'rgba(236, 72, 153, 0.3)', width: '300px', height: '300px', borderRadius: '50%' }}></div>
        
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          style={{ position: 'relative', zIndex: 10, maxWidth: '500px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Sparkles className="text-gradient" size={40} />
            <h1 className="text-gradient" style={{ fontSize: '48px', margin: 0 }}>EDU-JOB</h1>
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', lineHeight: 1.2 }}>
            Empowering your learning journey with AI.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.6 }}>
            Join our platform to experience personalized learning paths, connect with expert trainers, and shape the future of education.
          </p>
          
          <div style={{ marginTop: '48px', display: 'flex', gap: '16px' }}>
             <div className="glass-panel" style={{ padding: '16px', flex: 1 }}>
               <h3 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>10k+</h3>
               <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Active Learners</p>
             </div>
             <div className="glass-panel" style={{ padding: '16px', flex: 1 }}>
               <h3 style={{ color: 'var(--accent-tertiary)', marginBottom: '8px' }}>500+</h3>
               <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Expert Trainers</p>
             </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right side - Auth Form */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-panel" 
            style={{ width: '100%', maxWidth: '440px', padding: '40px', position: 'relative', zIndex: 10 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>
                {otpSent ? 'Check Your Email' : (isLogin ? 'Welcome Back' : 'Create an Account')}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                {otpSent ? `We sent a 6-digit code to ${formData.email}` : (isLogin ? 'Enter your details to access your account' : 'Sign up to get started on your journey')}
              </p>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899', border: '1px solid rgba(236,72,153,0.3)', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ec4899' }} />
                {error}
              </motion.div>
            )}

            {otpSent ? (
              <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', textAlign: 'center' }}>Enter 6-Digit OTP</label>
                  <input 
                    type="text" 
                    maxLength={6}
                    placeholder="••••••"
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
                    style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--accent-primary)', color: 'white', outline: 'none', transition: 'all 0.3s ease', fontSize: '24px', textAlign: 'center', letterSpacing: '8px' }} 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading || otp.length < 6}
                  style={{ 
                    marginTop: '16px', 
                    width: '100%', 
                    background: 'linear-gradient(135deg, var(--success), #34d399)',
                    color: 'white',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: (isLoading || otp.length < 6) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
                    transition: 'transform 0.2s ease',
                    opacity: (isLoading || otp.length < 6) ? 0.8 : 1
                  }}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {!isLogin && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <User style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '16px', color: 'var(--text-secondary)' }} size={18} />
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="John Doe"
                        value={formData.name} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', transition: 'all 0.3s ease', fontSize: '15px' }} 
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                      />
                    </div>
                  </motion.div>
                )}
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '16px', color: 'var(--text-secondary)' }} size={18} />
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="you@example.com"
                      value={formData.email} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', transition: 'all 0.3s ease', fontSize: '15px' }} 
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Password</label>
                    {isLogin && <span style={{ fontSize: '13px', color: 'var(--accent-primary)', cursor: 'pointer' }}>Forgot password?</span>}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '16px', color: 'var(--text-secondary)' }} size={18} />
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="••••••••"
                      value={formData.password} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', transition: 'all 0.3s ease', fontSize: '15px' }} 
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                    />
                  </div>
                </div>

                {!isLogin && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Select your role</label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {roles.map(role => (
                        <div 
                          key={role.value}
                          onClick={() => setFormData({...formData, role: role.value})}
                          style={{ 
                            flex: 1, 
                            padding: '12px 8px', 
                            borderRadius: '12px', 
                            border: `1px solid ${formData.role === role.value ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                            background: formData.role === role.value ? 'rgba(99, 102, 241, 0.1)' : 'rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease',
                            color: formData.role === role.value ? 'white' : 'var(--text-secondary)'
                          }}
                        >
                          <span style={{ color: formData.role === role.value ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                            {role.icon}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 500 }}>{role.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  style={{ 
                    marginTop: '16px', 
                    width: '100%', 
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    color: 'white',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
                    transition: 'transform 0.2s ease',
                    opacity: isLoading ? 0.8 : 1
                  }}
                  onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {isLoading ? (
                    <span className="listening-indicator" style={{ width: '20px', height: '20px', background: 'transparent', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}

            {!otpSent && (
              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => { setIsLogin(!isLogin); setError(''); }} 
                    style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 600, fontSize: '14px', padding: '0 4px', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @media (max-width: 768px) { .d-none.d-md-flex { display: none !important; } }
      `}} />
    </div>
  );
};

export default Auth;
