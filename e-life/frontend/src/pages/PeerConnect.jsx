import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MessageCircle, Code, Coffee, Award } from 'lucide-react';

const PeerConnect = () => {
  const [peers, setPeers] = useState([
    { id: 1, name: 'Alex Johnson', role: 'Frontend Learner', match: 94, avatar: 'https://i.pravatar.cc/150?img=11', skills: ['React', 'CSS'], status: 'Stuck on Redux' },
    { id: 2, name: 'Sarah Chen', role: 'Full-Stack Learner', match: 88, avatar: 'https://i.pravatar.cc/150?img=5', skills: ['Node.js', 'React'], status: 'Looking to pair program' },
    { id: 3, name: 'David Kim', role: 'UI/UX Learner', match: 82, avatar: 'https://i.pravatar.cc/150?img=12', skills: ['Figma', 'CSS'], status: 'Reviewing portfolios' },
  ]);

  const [matches, setMatches] = useState([]);

  const handleSwipe = (direction, id) => {
    const swipedPeer = peers.find(p => p.id === id);
    if (direction === 'right') {
      setMatches([...matches, swipedPeer]);
    }
    setPeers(peers.filter(p => p.id !== id));
  };

  return (
    <div style={{ paddingBottom: '40px', display: 'flex', flexDirection: 'column', height: '85vh' }}>
      <div>
        <h1 className="text-gradient">AI Peer Matching</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '32px' }}>Find study partners with complementary skills to accelerate your learning.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', flex: 1 }}>
        {/* Swipe Area */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AnimatePresence>
            {peers.length > 0 ? (
              <motion.div
                key={peers[0].id}
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, x: -200 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe > 100) handleSwipe('right', peers[0].id);
                  else if (swipe < -100) handleSwipe('left', peers[0].id);
                }}
                className="glass-panel hover-scale"
                style={{ width: '100%', maxWidth: '400px', height: '500px', display: 'flex', flexDirection: 'column', position: 'absolute', cursor: 'grab', padding: 0, overflow: 'hidden' }}
              >
                <div style={{ height: '60%', background: `url(${peers[0].avatar}) center/cover` }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(20,20,31,1) 0%, rgba(20,20,31,0) 100%)', display: 'flex', alignItems: 'flex-end', padding: '24px' }}>
                    <div>
                      <h2 style={{ fontSize: '28px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {peers[0].name}
                        <span style={{ fontSize: '14px', background: 'var(--success)', padding: '4px 8px', borderRadius: '12px' }}>{peers[0].match}% Match</span>
                      </h2>
                      <p style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{peers[0].role}</p>
                    </div>
                  </div>
                </div>
                
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Coffee size={16} /> Status: {peers[0].status}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {peers[0].skills.map(skill => (
                        <span key={skill} style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                    <button onClick={() => handleSwipe('left', peers[0].id)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ec4899', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.1)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
                      <X size={28} />
                    </button>
                    <button onClick={() => handleSwipe('right', peers[0].id)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--success)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.1)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
                      <Heart size={28} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Award size={64} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                <h3>You've reviewed all potential study partners!</h3>
                <p>Check back later for more AI matches.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Matches Sidebar */}
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageCircle size={20} color="var(--accent-primary)" /> Your Connections
          </h3>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {matches.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center', marginTop: '32px' }}>Swipe right to connect with peers and start collaborating!</p>
            ) : (
              matches.map(match => (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={match.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', cursor: 'pointer' }}>
                  <img src={match.avatar} alt={match.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <div>
                    <h4 style={{ fontSize: '14px' }}>{match.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--accent-primary)' }}>{match.match}% Match</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerConnect;
