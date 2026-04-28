import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Briefcase, MapPin, DollarSign, X, Trash2 } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useLanguage } from '../context/LanguageContext';

const JobBoard = () => {
  const { jobs, addJob, deleteJob } = useJobs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', company: '', location: '', salary: '', description: '', skills: '' });
  const { language } = useLanguage();
  
  const translations = {
    en: { title: "Job Board Dashboard", subtitle: "Manage and monitor all active job listings.", postNew: "Post New Job", applicants: "Applicants", delete: "Delete Job", postForm: "Post a New Job", publish: "Publish Job" },
    hi: { title: "जॉब बोर्ड डैशबोर्ड", subtitle: "सभी सक्रिय नौकरी लिस्टिंग को प्रबंधित और मॉनिटर करें।", postNew: "नई नौकरी पोस्ट करें", applicants: "आवेदक", delete: "नौकरी हटाएं", postForm: "नई नौकरी पोस्ट करें", publish: "नौकरी प्रकाशित करें" },
    es: { title: "Panel de bolsa de trabajo", subtitle: "Gestiona y supervisa todas las ofertas de trabajo activas.", postNew: "Publicar nuevo trabajo", applicants: "Solicitantes", delete: "Eliminar trabajo", postForm: "Publicar un nuevo trabajo", publish: "Publicar trabajo" }
  };
  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company) return;
    
    addJob({
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    });
    
    setFormData({ title: '', company: '', location: '', salary: '', description: '', skills: '' });
    setIsModalOpen(false);
  };

  return (
    <div style={{ animation: 'opacity 0.4s ease', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h1 className="text-gradient">{t.title}</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>{t.subtitle}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> {t.postNew}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        <AnimatePresence>
          {jobs.map((job, index) => (
            <motion.div 
              key={job.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }}
              className="glass-panel hover-scale"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(99,102,241,0.1)', borderRadius: '12px' }}>
                  <Briefcase size={24} color="var(--accent-primary)" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                    {job.applicants} {t.applicants}
                  </div>
                  <button 
                    onClick={() => deleteJob(job.id)}
                    style={{ background: 'rgba(236,72,153,0.1)', border: 'none', padding: '6px', borderRadius: '8px', color: 'var(--accent-tertiary)', cursor: 'pointer', transition: 'background 0.2s' }}
                    title={t.delete}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{job.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>{job.company}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} /> {job.location || 'Remote'}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign size={14} /> 
                  {job.salary ? (job.salary.toString().includes('$') ? job.salary : `$${Number(job.salary).toLocaleString()}`) : 'Not specified'}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {job.skills && job.skills.map(skill => (
                  <span key={skill} style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '4px' }}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CREATE JOB MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setIsModalOpen(false)} />
            
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ position: 'relative', width: '100%', maxWidth: '500px', background: 'rgba(20,20,25,0.95)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '32px', zIndex: 10000 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2>{t.postForm}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Job Title</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="e.g. Senior Frontend Engineer" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Company Name</label>
                  <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="e.g. TechFlow Solutions" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Location</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="Remote, CA" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Salary (Numbers only)</label>
                    <input type="number" min="0" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="e.g. 120000" />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Required Skills (comma separated)</label>
                  <input type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="React, Node.js, AWS" />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '16px', padding: '14px' }}>{t.publish}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default JobBoard;
