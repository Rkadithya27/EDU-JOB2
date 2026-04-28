import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, ExternalLink, Link as LinkIcon, Share2 } from 'lucide-react';

const SkillWallet = () => {
  const credentials = [
    { id: 'CERT-9X82', title: 'Advanced Python Architect', issuer: 'EDU-JOB Academy', date: 'Oct 12, 2025', skills: ['Python', 'System Design'], verified: true },
    { id: 'CERT-4F3A', title: 'React Performance Expert', issuer: 'Meta Learning', date: 'Nov 05, 2025', skills: ['React', 'Optimization'], verified: true },
    { id: 'CERT-7B1C', title: 'AI Engineering Fundamentals', issuer: 'DeepLearning.AI', date: 'Jan 22, 2026', skills: ['LLMs', 'Prompt Engineering'], verified: true },
  ];

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={32} color="var(--success)" /> Immutable Skill Wallet
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Your blockchain-verified credentials and completed roadmaps.</p>
        </div>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Share2 size={18} /> Share Public Profile
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {credentials.map((cert, index) => (
          <motion.div 
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel hover-scale"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {/* Holographic effect */}
            <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)', transform: 'rotate(30deg)', pointerEvents: 'none' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} /> Verified on Chain
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <LinkIcon size={12} /> {cert.id}
              </div>
            </div>

            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{cert.title}</h3>
            <p style={{ color: 'var(--accent-tertiary)', fontSize: '14px', marginBottom: '16px' }}>Issued by {cert.issuer}</p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {cert.skills.map(skill => (
                <span key={skill} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Issued: {cert.date}</span>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View Contract <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillWallet;
