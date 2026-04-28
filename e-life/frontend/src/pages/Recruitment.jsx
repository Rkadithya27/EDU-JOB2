import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, PhoneCall, CheckCircle } from 'lucide-react';
import { useJobs } from '../context/JobContext';

const Recruitment = () => {
  const { jobs } = useJobs();

  return (
    <div style={{ animation: 'opacity 0.4s ease', paddingBottom: '40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="text-gradient">Recruitment Pipeline</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Track candidates and interview schedules for your active jobs.</p>
      </div>

      {jobs.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '64px' }}>
          <Users size={48} color="var(--text-secondary)" style={{ margin: '0 auto 16px' }} />
          <h3>No Active Jobs</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Post a job in the Job Board to start tracking candidates.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {jobs.map((job, index) => (
            <motion.div 
              key={job.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }}
              className="glass-panel"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)' }}>
                <div>
                  <h2 style={{ fontSize: '20px' }}>{job.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>{job.company} • {job.location}</p>
                </div>
                <div style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-primary)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} /> {job.applicants} Total Applicants
                </div>
              </div>

              {job.applicants > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Applied</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.max(1, Math.floor(job.applicants * 0.6))}</div>
                  </div>
                  <div style={{ background: 'rgba(99,102,241,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <div style={{ fontSize: '13px', color: 'var(--accent-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><PhoneCall size={14}/> Screening</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.max(1, Math.floor(job.applicants * 0.2))}</div>
                  </div>
                  <div style={{ background: 'rgba(236,72,153,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(236,72,153,0.2)' }}>
                    <div style={{ fontSize: '13px', color: 'var(--accent-tertiary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><UserCheck size={14}/> Interviewing</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.max(0, Math.floor(job.applicants * 0.15))}</div>
                  </div>
                  <div style={{ background: 'rgba(16,185,129,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <div style={{ fontSize: '13px', color: 'var(--success)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14}/> Offered</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.max(0, Math.floor(job.applicants * 0.05))}</div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                  No applicants yet. Share your job posting to attract candidates!
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recruitment;
