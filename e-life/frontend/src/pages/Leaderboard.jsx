import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Target, Zap, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const users = [
    { rank: 1, name: 'Alex Johnson', score: 9850, league: 'Diamond', avatar: 'https://i.pravatar.cc/150?img=11', trend: '+120' },
    { rank: 2, name: 'Sarah Chen', score: 9420, league: 'Diamond', avatar: 'https://i.pravatar.cc/150?img=5', trend: '+80' },
    { rank: 3, name: 'David Kim', score: 8900, league: 'Platinum', avatar: 'https://i.pravatar.cc/150?img=12', trend: '+45' },
    { rank: 4, name: 'Emma Wilson', score: 8750, league: 'Platinum', avatar: 'https://i.pravatar.cc/150?img=9', trend: '+210' },
    { rank: 5, name: 'Michael Brown', score: 8200, league: 'Gold', avatar: 'https://i.pravatar.cc/150?img=15', trend: '-20' },
    { rank: 6, name: 'You (RK)', score: 8150, league: 'Gold', avatar: 'https://i.pravatar.cc/150?img=8', trend: '+400' },
  ];

  const getLeagueColor = (league) => {
    switch(league) {
      case 'Diamond': return '#c0e8f9';
      case 'Platinum': return '#e5e4e2';
      case 'Gold': return '#ffd700';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.2))', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px' }}>
          <Trophy size={40} color="#ffd700" />
        </motion.div>
        <h1 className="text-gradient">Global Leaderboard</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Rank up by completing Mock Interviews and ATS Scans.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '32px' }}>
        {/* Your Stats */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>Your Stats</h3>
          
          <div style={{ textAlign: 'center' }}>
             <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--accent-primary)' }}>#6</div>
             <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Global Rank</div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={16} color="var(--accent-tertiary)"/> Score</div>
             <div style={{ fontWeight: 600 }}>8,150 XP</div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Medal size={16} color="#ffd700"/> League</div>
             <div style={{ fontWeight: 600, color: '#ffd700' }}>Gold</div>
          </div>
          
          <button className="btn-primary" style={{ width: '100%', marginTop: 'auto' }}>Take a Test to Rank Up</button>
        </motion.div>

        {/* Top Users */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {users.map((user, index) => (
            <motion.div 
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel hover-scale"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '60px 1fr 100px 120px', 
                alignItems: 'center', 
                padding: '16px 24px',
                background: user.name === 'You (RK)' ? 'rgba(99, 102, 241, 0.1)' : 'var(--glass-bg)',
                border: user.name === 'You (RK)' ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)'
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 800, color: index < 3 ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                #{user.rank}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img src={user.avatar} alt={user.name} style={{ width: '48px', height: '48px', borderRadius: '50%', border: `2px solid ${getLeagueColor(user.league)}` }} />
                <div>
                  <h4 style={{ fontSize: '16px' }}>{user.name}</h4>
                  <div style={{ fontSize: '12px', color: getLeagueColor(user.league), fontWeight: 600 }}>{user.league} League</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: user.trend.startsWith('+') ? 'var(--success)' : '#ef4444', fontSize: '13px', fontWeight: 600 }}>
                {user.trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {user.trend} XP
              </div>
              
              <div style={{ textAlign: 'right', fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                <Zap size={16} color="var(--accent-tertiary)" /> {user.score.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Mock for TrendingDown since it wasn't imported from lucide-react initially
const TrendingDown = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

export default Leaderboard;
