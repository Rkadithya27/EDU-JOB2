import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, AlertTriangle, MessageSquare, Terminal, CheckCircle, Zap, ShieldAlert, Cpu } from 'lucide-react';

const RoleSimulator = () => {
  const [inSimulation, setInSimulation] = useState(false);
  const [role, setRole] = useState(null);
  const [time, setTime] = useState(9); // 9:00 AM
  const [metrics, setMetrics] = useState({ performance: 50, teamMorale: 50, stress: 20 });
  const [currentEvent, setCurrentEvent] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const roles = [
    { id: 'swe', name: 'Software Engineer', icon: <Terminal size={24} />, desc: 'Debug production, write code, manage PMs.' },
    { id: 'pm', name: 'Product Manager', icon: <Briefcase size={24} />, desc: 'Prioritize roadmap, calm down stakeholders.' },
    { id: 'cyber', name: 'Cybersecurity Analyst', icon: <ShieldAlert size={24} />, desc: 'Stop active breaches, analyze logs.' }
  ];

  const events = [
    {
      time: '09:30 AM',
      sender: 'CEO (via Slack)',
      type: 'message',
      text: "The payment gateway is down! Customers are angry on Twitter. Status?",
      options: [
        { text: "I'll hotfix it in production right now!", performance: -20, morale: -10, stress: +40, result: "You broke the database. Never hotfix blindly." },
        { text: "Investigating the logs. I'll provide an ETA in 5 mins.", performance: +20, morale: +10, stress: +10, result: "Good communication. You found a blocked port." },
        { text: "Not my problem, I work on the frontend.", performance: -40, morale: -40, stress: -10, result: "You got fired for lack of ownership." }
      ]
    },
    {
      time: '11:15 AM',
      sender: 'GitHub Actions',
      type: 'alert',
      text: "🚨 CI/CD Build Failed: 42 tests failing in the Auth module.",
      options: [
        { text: "Rollback to the previous stable commit immediately.", performance: +15, morale: +5, stress: 0, result: "Safe move. Production is secure." },
        { text: "Bypass tests and force merge.", performance: -30, morale: -20, stress: +30, result: "Production crashed. The team is furious." }
      ]
    },
    {
      time: '02:00 PM',
      sender: 'Junior Developer',
      type: 'message',
      text: "I accidentally deleted the user staging table. What do I do? 😭",
      options: [
        { text: "Yell at them for being careless.", performance: -10, morale: -30, stress: +20, result: "The junior quit. Team morale tanked." },
        { text: "Calm them down, let's restore from the automated AWS backup.", performance: +25, morale: +30, stress: +5, result: "Great leadership! You restored the DB in 10 mins." }
      ]
    }
  ];

  const handleStart = (selectedRole) => {
    setRole(selectedRole);
    setInSimulation(true);
    setMetrics({ performance: 50, teamMorale: 50, stress: 20 });
    setCurrentEvent(0);
    setGameOver(false);
  };

  const handleChoice = (option) => {
    setMetrics(prev => ({
      performance: Math.min(100, Math.max(0, prev.performance + option.performance)),
      teamMorale: Math.min(100, Math.max(0, prev.teamMorale + option.morale)),
      stress: Math.min(100, Math.max(0, prev.stress + option.stress))
    }));
    
    // Evaluate if game over due to bad metrics
    if (metrics.stress + option.stress >= 100 || metrics.performance + option.performance <= 0) {
      setGameOver(true);
      return;
    }

    if (currentEvent < events.length - 1) {
      setTimeout(() => {
        setCurrentEvent(prev => prev + 1);
      }, 1500);
    } else {
      setTimeout(() => {
        setScore(Math.round((metrics.performance + metrics.teamMorale + (100 - metrics.stress)) / 3));
        setGameOver(true);
      }, 1500);
    }
  };

  return (
    <div style={{ paddingBottom: '40px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {!inSimulation ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 24px', border: '1px solid var(--accent-primary)' }}>
            <Cpu size={40} color="var(--accent-primary)" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '48px' }}>Day-in-the-Life Metaverse</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginTop: '16px', marginBottom: '48px', lineHeight: 1.6 }}>
            Step into a hyper-realistic AI simulation. Handle production crashes, manage angry executives, and guide junior developers in real-time. Do you have what it takes?
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {roles.map(r => (
              <div 
                key={r.id} 
                className="glass-panel hover-scale" 
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px' }}
                onClick={() => handleStart(r)}
              >
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '50%', marginBottom: '16px' }}>
                  {r.icon}
                </div>
                <h3 style={{ marginBottom: '8px' }}>{r.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{r.desc}</p>
                <button className="btn-secondary" style={{ marginTop: '24px', width: '100%' }}>Enter Simulation</button>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', height: '80vh' }}>
          {/* Main Simulation Screen */}
          <div className="glass-panel" style={{ flex: 2, display: 'flex', flexDirection: 'column', padding: '32px', position: 'relative', overflow: 'hidden' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '32px' }}>
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{role.icon} {role.name} Simulator</h2>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Simulation Active • Real-time</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ color: 'var(--accent-primary)' }}>{gameOver ? '05:00 PM' : events[currentEvent].time}</h2>
                <div style={{ color: 'var(--text-secondary)' }}>Day 1</div>
              </div>
            </div>

            {/* Event Display */}
            {!gameOver ? (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentEvent}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                  <div style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)', padding: '24px', borderRadius: '16px', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', fontWeight: 600, marginBottom: '12px' }}>
                      {events[currentEvent].type === 'alert' ? <AlertTriangle size={20} /> : <MessageSquare size={20} />} 
                      Incoming from {events[currentEvent].sender}
                    </div>
                    <h2 style={{ fontSize: '24px', lineHeight: 1.5 }}>"{events[currentEvent].text}"</h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ color: 'var(--text-secondary)' }}>How do you respond?</h4>
                    {events[currentEvent].options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleChoice(opt)}
                        style={{ 
                          textAlign: 'left', 
                          padding: '20px', 
                          background: 'rgba(255,255,255,0.05)', 
                          border: '1px solid var(--glass-border)', 
                          borderRadius: '12px', 
                          color: 'white', 
                          fontSize: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                {metrics.stress >= 100 || metrics.performance <= 0 ? (
                  <>
                    <AlertTriangle size={64} color="#ef4444" style={{ marginBottom: '24px' }} />
                    <h1 style={{ color: '#ef4444', marginBottom: '16px' }}>Simulation Failed</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px' }}>You buckled under the pressure or made critical technical errors. Review your performance and try again.</p>
                  </>
                ) : (
                  <>
                    <div style={{ position: 'relative' }}>
                      <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '24px' }} />
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', border: '2px dashed var(--success)', borderRadius: '50%', opacity: 0.2 }} />
                    </div>
                    <h1 style={{ color: 'var(--success)', marginBottom: '16px', fontSize: '48px' }}>Day Survived!</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', marginBottom: '32px' }}>Excellent job navigating the daily chaos of a tech company.</p>
                    
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '400px' }}>
                      <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Overall Competency Score</div>
                      <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--accent-primary)' }}>{score}/100</div>
                    </div>
                  </>
                )}
                <button onClick={() => setInSimulation(false)} className="btn-primary" style={{ marginTop: '32px' }}>Return to Hub</button>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar - Dynamic HUD */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={20} color="var(--accent-primary)"/> Live Biometrics HUD</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Technical Performance</span>
                  <span style={{ fontWeight: 600 }}>{metrics.performance}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div animate={{ width: `${metrics.performance}%` }} style={{ height: '100%', background: metrics.performance > 40 ? 'var(--accent-primary)' : '#ef4444', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Team Morale</span>
                  <span style={{ fontWeight: 600 }}>{metrics.teamMorale}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div animate={{ width: `${metrics.teamMorale}%` }} style={{ height: '100%', background: metrics.teamMorale > 40 ? 'var(--success)' : '#ef4444', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Stress Level</span>
                  <span style={{ fontWeight: 600, color: metrics.stress > 80 ? '#ef4444' : 'white' }}>{metrics.stress}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div animate={{ width: `${metrics.stress}%` }} style={{ height: '100%', background: metrics.stress > 80 ? '#ef4444' : 'var(--accent-tertiary)', transition: 'width 0.5s ease' }} />
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '16px' }}>Terminal Logs</h3>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '8px', height: '100%', fontFamily: 'monospace', fontSize: '12px', color: '#34d399', overflowY: 'auto' }}>
                <p>{'>'} SIMULATION INITIATED...</p>
                <p>{'>'} ROLE: {role?.name.toUpperCase() || 'STANDBY'}</p>
                {inSimulation && currentEvent > 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{'>'} EVENT RESOLVED. METRICS UPDATED.</motion.p>
                )}
                {gameOver && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: metrics.stress >= 100 ? '#ef4444' : '#34d399' }}>{'>'} SIMULATION TERMINATED.</motion.p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSimulator;
