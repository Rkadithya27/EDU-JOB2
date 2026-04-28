import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Clock, PlayCircle, AlertTriangle, Eye, Video } from 'lucide-react';

const EngagementStudio = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  const videos = [
    { id: 1, title: 'Advanced State Management in React', duration: '14:20', views: 1240, confusionSpike: '08:45' },
    { id: 2, title: 'Understanding Neural Networks', duration: '22:15', views: 890, confusionSpike: '12:10' }
  ];

  // Mock heatmap data (100 points representing the video duration)
  const heatmapData = Array.from({ length: 50 }).map((_, i) => {
    // Create a spike around index 30 (which corresponds to ~08:45 in video 1)
    if (i > 28 && i < 35) return Math.random() * 40 + 60; // High confusion
    if (i === 31 || i === 32) return Math.random() * 20 + 80; // Peak confusion
    return Math.random() * 20 + 10; // Low confusion
  });

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Brain size={36} color="var(--accent-primary)" /> Neuro-Engagement Studio
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          AI analyzes learner interaction rates, rewinds, and pause metrics to generate real-time confusion heatmaps of your courses.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '24px', height: '65vh' }}>
        
        {/* Left Sidebar: Video List */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '8px' }}>Your Content</h3>
          {videos.map((vid, index) => (
            <div 
              key={vid.id}
              onClick={() => setActiveVideo(index)}
              style={{ 
                padding: '16px', 
                background: activeVideo === index ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.02)', 
                border: `1px solid ${activeVideo === index ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                <Video size={20} color={activeVideo === index ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
                <h4 style={{ fontSize: '14px', lineHeight: 1.4 }}>{vid.title}</h4>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', paddingLeft: '32px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={12}/> {vid.views}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> {vid.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Main Panel: Heatmap Analyzer */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '32px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>{videos[activeVideo].title}</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} /> Peak Confusion at {videos[activeVideo].confusionSpike}
            </div>
          </div>

          {/* Fake Video Player area */}
          <div style={{ width: '100%', height: '300px', background: '#0f0f13', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', marginBottom: '24px' }}>
            <PlayCircle size={64} color="rgba(255,255,255,0.2)" />
            <div style={{ position: 'absolute', bottom: '16px', left: '24px', color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'monospace' }}>08:45 / {videos[activeVideo].duration}</div>
          </div>

          {/* Engagement Heatmap */}
          <h4 style={{ marginBottom: '16px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} /> Cognitive Load / Confusion Heatmap
          </h4>
          
          <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '2px', paddingBottom: '24px', borderBottom: '1px solid var(--glass-border)', position: 'relative' }}>
            {heatmapData.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ delay: i * 0.01, duration: 0.5 }}
                style={{ 
                  flex: 1, 
                  background: val > 75 ? '#ef4444' : val > 40 ? '#f59e0b' : 'var(--success)',
                  opacity: val > 75 ? 1 : 0.6,
                  borderTopLeftRadius: '2px',
                  borderTopRightRadius: '2px'
                }}
              />
            ))}
            
            {/* Playhead marker */}
            <div style={{ position: 'absolute', left: '60%', top: 0, bottom: 0, width: '2px', background: 'white', zIndex: 10 }}>
              <div style={{ position: 'absolute', top: '-10px', left: '-4px', width: '10px', height: '10px', background: 'white', borderRadius: '50%' }} />
            </div>
          </div>

          <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>🤖 AI Recommendation</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              At <strong>{videos[activeVideo].confusionSpike}</strong>, 68% of learners paused and rewound the video. The cognitive load spiked heavily when you introduced "Redux Thunk". 
              <strong> Suggestion:</strong> Insert a 2-minute interactive quiz or break down the architecture diagram before proceeding to code.
            </p>
            <button className="btn-secondary" style={{ marginTop: '16px' }}>Generate Clarification Module</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EngagementStudio;
