import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, Lock, BookOpen, Clock, Award, Star, X, Shield, Users, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LearningPaths = () => {
  const [activeTab, setActiveTab] = useState('enrolled');
  const [selectedPath, setSelectedPath] = useState(null);
  const [enrollModal, setEnrollModal] = useState(null);
  const { language } = useLanguage();

  const translations = {
    en: { title: "Learning Roadmaps", subtitle: "Select a roadmap to structure your learning journey.", enrolled: "My Enrollments", discover: "Discover New" },
    hi: { title: "लर्निंग रोडमैप", subtitle: "अपनी सीखने की यात्रा को संरचित करने के लिए एक रोडमैप चुनें।", enrolled: "मेरे नामांकन", discover: "नया खोजें" },
    es: { title: "Rutas de aprendizaje", subtitle: "Selecciona una ruta para estructurar tu viaje de aprendizaje.", enrolled: "Mis inscripciones", discover: "Descubrir nuevas" }
  };
  const t = translations[language];

  const enrolledPaths = [
    {
      id: 1,
      title: 'Advanced Python Developer',
      description: 'Mastering asyncio, FastAPI, and advanced data structures for high-performance applications.',
      progress: 65,
      color: 'var(--success)',
      nextModule: 'FastAPI WebSockets & Real-time',
      modules: [
        { title: 'Python Memory Management', completed: true, duration: '2h 15m' },
        { title: 'Asyncio Deep Dive', completed: true, duration: '3h 40m' },
        { title: 'FastAPI WebSockets & Real-time', completed: false, duration: '4h 20m' },
        { title: 'Advanced Testing with Pytest', completed: false, duration: '1h 50m' },
        { title: 'Deployment & CI/CD', completed: false, duration: '2h 30m' }
      ]
    },
    {
      id: 2,
      title: 'Full-Stack Web Engineering',
      description: 'Building modern, scalable web applications with React, Node.js, and Supabase.',
      progress: 20,
      color: 'var(--accent-primary)',
      nextModule: 'React Server Components',
      modules: [
        { title: 'Modern JS/ES6+ Refresher', completed: true, duration: '1h 30m' },
        { title: 'React Server Components', completed: false, duration: '2h 45m' },
        { title: 'State Management with Redux', completed: false, duration: '3h 10m' },
        { title: 'Supabase Auth & Database', completed: false, duration: '4h 00m' },
        { title: 'Vite Performance Tuning', completed: false, duration: '1h 20m' }
      ]
    }
  ];

  const availablePaths = [
    {
      id: 3,
      title: 'AI & Machine Learning Foundations',
      description: 'Start your journey into AI. Learn PyTorch, neural networks, and prompt engineering.',
      students: '12,482',
      rating: 4.8,
      duration: '40 hours',
      color: 'var(--accent-tertiary)',
      level: 'Beginner to Intermediate',
      skills: ['Python', 'PyTorch', 'Neural Networks', 'NLP', 'Data Processing'],
      instructor: 'Dr. Sarah Chen'
    },
    {
      id: 4,
      title: 'Cloud DevOps Architecture',
      description: 'Master AWS, Docker, Kubernetes, and Terraform for scalable cloud infrastructure.',
      students: '8,901',
      rating: 4.9,
      duration: '55 hours',
      color: '#f59e0b',
      level: 'Advanced',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      instructor: 'James DevOps'
    }
  ];

  const handleEnrollClick = (path) => {
    setEnrollModal(path);
  };

  const handleConfirmEnrollment = () => {
    // In a real app, this would make an API call
    // For now, we'll just close it after a brief delay
    setTimeout(() => {
      setEnrollModal(null);
      // Optionally switch tab to 'enrolled' to show it's added (would need state update)
    }, 800);
  };

  return (
    <div style={{ animation: 'opacity 0.4s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h1 className="text-gradient">{t.title}</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>{t.subtitle}</p>
        </div>
        
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => { setActiveTab('enrolled'); setSelectedPath(null); }}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '8px', 
              border: 'none', 
              background: activeTab === 'enrolled' ? 'rgba(99,102,241,0.2)' : 'transparent',
              color: activeTab === 'enrolled' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: activeTab === 'enrolled' ? 600 : 400,
              transition: 'all 0.2s'
            }}
          >
            {t.enrolled}
          </button>
          <button 
            onClick={() => { setActiveTab('discover'); setSelectedPath(null); }}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '8px', 
              border: 'none', 
              background: activeTab === 'discover' ? 'rgba(99,102,241,0.2)' : 'transparent',
              color: activeTab === 'discover' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: activeTab === 'discover' ? 600 : 400,
              transition: 'all 0.2s'
            }}
          >
            {t.discover}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedPath ? (
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'enrolled' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {enrolledPaths.map(path => (
                  <div 
                    key={path.id} 
                    className="glass-panel hover-scale" 
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    onClick={() => setSelectedPath(path)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ color: path.color, fontSize: '18px', fontWeight: 600 }}>{path.title}</h3>
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Award size={14} color={path.color} />
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>In Progress</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: '1.5', flex: 1 }}>{path.description}</p>
                    
                    <div style={{ marginTop: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                        <span>Progress</span>
                        <span style={{ color: 'white', fontWeight: 600 }}>{path.progress}%</span>
                      </div>
                      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                        <div style={{ width: `${path.progress}%`, background: path.color, height: '100%', borderRadius: '8px', transition: 'width 1s ease-out' }}></div>
                      </div>
                      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                        <Play size={16} color="var(--text-secondary)" />
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Up Next:</span>
                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{path.nextModule}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {availablePaths.map(path => (
                  <div key={path.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `rgba(255,255,255,0.05)`, border: `1px solid ${path.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <BookOpen size={24} color={path.color} />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{path.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', flex: 1 }}>{path.description}</p>
                    
                    <div style={{ display: 'flex', gap: '16px', marginTop: '20px', marginBottom: '24px', padding: '12px 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Star size={14} color="#f59e0b" />
                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{path.rating}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} color="var(--text-secondary)" />
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{path.duration}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleEnrollClick(path)}
                      className="btn-primary hover-scale" 
                      style={{ width: '100%', background: `linear-gradient(135deg, ${path.color}, rgba(255,255,255,0.2))`, border: 'none' }}
                    >
                      Enroll Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              onClick={() => setSelectedPath(null)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
            >
              ← Back to Roadmaps
            </button>
            
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', color: selectedPath.color, marginBottom: '8px' }}>{selectedPath.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{selectedPath.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{selectedPath.progress}%</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Course Completed</div>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Course Modules</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedPath.modules.map((mod, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '16px', 
                        background: mod.completed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.02)', 
                        border: `1px solid ${mod.completed ? 'rgba(16, 185, 129, 0.2)' : 'var(--glass-border)'}`,
                        borderRadius: '12px',
                        transition: 'all 0.2s',
                        cursor: mod.completed ? 'default' : 'pointer'
                      }}
                      className={!mod.completed ? "hover-scale" : ""}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: mod.completed ? 'var(--success)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                        {mod.completed ? <CheckCircle size={20} color="white" /> : <Play size={18} color="white" style={{ marginLeft: '2px' }} />}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 500, color: mod.completed ? 'white' : 'var(--text-secondary)' }}>{mod.title}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{mod.duration}</span>
                          {!mod.completed && <span style={{ fontSize: '12px', color: selectedPath.color, background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '12px' }}>Module {idx + 1}</span>}
                        </div>
                      </div>
                      
                      {!mod.completed && (
                        <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', background: `linear-gradient(135deg, ${selectedPath.color}, rgba(255,255,255,0.2))` }}>
                          Start Learning
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {enrollModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
              }}
              onClick={() => setEnrollModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                background: 'rgba(20, 20, 25, 0.95)',
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                boxShadow: `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 0 40px ${enrollModal.color}20`,
                zIndex: 10000,
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `linear-gradient(135deg, ${enrollModal.color}40, transparent)`, border: `1px solid ${enrollModal.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Target size={28} color={enrollModal.color} />
                  </div>
                  <button 
                    onClick={() => setEnrollModal(null)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-secondary)', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Enroll in {enrollModal.title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '15px', marginBottom: '24px' }}>
                  {enrollModal.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                      <Users size={16} />
                      <span style={{ fontSize: '13px' }}>Enrolled Students</span>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 600 }}>{enrollModal.students}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                      <Shield size={16} />
                      <span style={{ fontSize: '13px' }}>Difficulty Level</span>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 600 }}>{enrollModal.level}</div>
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '12px' }}>Skills you will gain:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {enrollModal.skills.map((skill, idx) => (
                      <span key={idx} style={{ padding: '6px 12px', background: `rgba(255,255,255,0.05)`, border: `1px solid ${enrollModal.color}40`, borderRadius: '20px', fontSize: '13px', color: 'white' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleConfirmEnrollment}
                  className="btn-primary"
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    fontSize: '16px', 
                    fontWeight: 600, 
                    background: `linear-gradient(135deg, ${enrollModal.color}, rgba(255,255,255,0.2))`,
                    boxShadow: `0 8px 25px ${enrollModal.color}40`,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Confirm Enrollment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningPaths;
