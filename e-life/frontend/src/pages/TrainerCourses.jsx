import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Star, Plus, X, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TrainerCourses = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([
    { id: 1, title: 'Advanced React Patterns', students: 124, rating: 4.8, modules: 12 },
    { id: 2, title: 'UI/UX for Developers', students: 89, rating: 4.9, modules: 8 }
  ]);
  const { language } = useLanguage();
  
  const translations = {
    en: { title: "Course Management", subtitle: "Create and manage your educational content.", createNew: "Create New Course", enrolled: "Enrolled", modules: "Modules", manage: "Manage Content", designNew: "Design New Course", publish: "Publish Course" },
    hi: { title: "पाठ्यक्रम प्रबंधन", subtitle: "अपनी शैक्षिक सामग्री बनाएँ और प्रबंधित करें।", createNew: "नया कोर्स बनाएँ", enrolled: "नामांकित", modules: "मॉड्यूल", manage: "सामग्री प्रबंधित करें", designNew: "नया कोर्स डिज़ाइन करें", publish: "कोर्स प्रकाशित करें" },
    es: { title: "Gestión de cursos", subtitle: "Crea y gestiona tu contenido educativo.", createNew: "Crear nuevo curso", enrolled: "Inscritos", modules: "Módulos", manage: "Gestionar Contenido", designNew: "Diseñar nuevo curso", publish: "Publicar curso" }
  };
  const t = translations[language];

  const [formData, setFormData] = useState({ title: '', description: '', category: '', modules: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    
    setCourses([...courses, {
      id: Date.now(),
      title: formData.title,
      students: 0,
      rating: 0,
      modules: parseInt(formData.modules) || 1
    }]);
    
    setFormData({ title: '', description: '', category: '', modules: '' });
    setIsModalOpen(false);
  };

  return (
    <div style={{ animation: 'opacity 0.4s ease', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h1 className="text-gradient">{t.title}</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>{t.subtitle}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> {t.createNew}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        <AnimatePresence>
          {courses.map(course => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel hover-scale"
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <BookOpen size={24} color="var(--accent-primary)" />
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{course.title}</h3>
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <Users size={14} /> {course.students} {t.enrolled}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <Video size={14} /> {course.modules} {t.modules}
                </div>
              </div>

              <button 
                onClick={() => navigate('/upload')} 
                style={{ 
                  width: '100%', 
                  marginTop: '16px', 
                  padding: '10px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--glass-border)', 
                  borderRadius: '8px', 
                  color: 'white', 
                  cursor: 'pointer', 
                  transition: 'all 0.2s',
                  fontWeight: 500,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }} 
                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }} 
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
              >
                {t.manage}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CREATE COURSE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setIsModalOpen(false)} />
            
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ position: 'relative', width: '100%', maxWidth: '500px', background: 'rgba(20,20,25,0.95)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '32px', zIndex: 10000 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2>{t.designNew}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Course Title</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="e.g. Master React in 10 Days" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Course Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', resize: 'vertical' }} placeholder="What will students learn?" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Category</label>
                    <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="e.g. Engineering" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Number of Modules</label>
                    <input type="number" min="1" value={formData.modules} onChange={e => setFormData({...formData, modules: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} placeholder="e.g. 5" />
                  </div>
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

export default TrainerCourses;
