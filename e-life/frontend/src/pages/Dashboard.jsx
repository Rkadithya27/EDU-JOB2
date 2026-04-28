import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import VoiceAssistant from '../components/VoiceAssistant';
import QRTracker from '../components/QRTracker';
import { BookOpen, Map, CheckCircle, UploadCloud, Edit3, Award, Search, Users, Handshake, TrendingUp } from 'lucide-react';

const Dashboard = ({ user }) => {
  const [demoRole, setDemoRole] = useState('Learner');
  const currentRole = user?.role || demoRole;
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      welcome: "Welcome back",
      dashboardDesc: "Here is your personalized",
      dashboardSuffix: "dashboard.",
      learner: "Learner",
      trainer: "Trainer",
      policymaker: "Mediator",
      careerGuidance: "Personalized Career Guidance",
      chooseRoadmap: "Choose Roadmap",
      prepmate: "Career Prepmate",
      analytics: "Progress Analytics",
      currentRoadmap: "Current Roadmap",
      uploadContent: "Upload Content",
      designCourse: "Design Course",
      certification: "Provide Certification",
      activeCourses: "Your Active Courses",
      jobBoard: "Job Board",
      recruitment: "Recruitment",
      macroAnalytics: "Macro Level Analytics",
      laborTrends: "Labor Market Trends & Insights",
    },
    hi: {
      welcome: "वापसी पर स्वागत है",
      dashboardDesc: "यहाँ आपका व्यक्तिगत",
      dashboardSuffix: "डैशबोर्ड है।",
      learner: "शिक्षार्थी",
      trainer: "प्रशिक्षक",
      policymaker: "नीति निर्माता",
      careerGuidance: "व्यक्तिगत करियर मार्गदर्शन",
      chooseRoadmap: "रोडमैप चुनें",
      prepmate: "करियर प्रेपमेट",
      analytics: "प्रगति विश्लेषिकी",
      currentRoadmap: "वर्तमान रोडमैप",
      uploadContent: "सामग्री अपलोड करें",
      designCourse: "कोर्स डिज़ाइन करें",
      certification: "प्रमाणन प्रदान करें",
      activeCourses: "आपके सक्रिय पाठ्यक्रम",
      jobBoard: "जॉब बोर्ड",
      recruitment: "भर्ती",
      macroAnalytics: "मैक्रो स्तर विश्लेषिकी",
      laborTrends: "श्रम बाजार के रुझान और अंतर्दृष्टि",
    },
    es: {
      welcome: "Bienvenido de nuevo",
      dashboardDesc: "Aquí está su panel de",
      dashboardSuffix: "personalizado.",
      learner: "Aprendiz",
      trainer: "Entrenador",
      policymaker: "Mediador",
      careerGuidance: "Orientación profesional personalizada",
      chooseRoadmap: "Elegir hoja de ruta",
      prepmate: "Preparador de carrera",
      analytics: "Análisis de progreso",
      currentRoadmap: "Hoja de ruta actual",
      uploadContent: "Subir contenido",
      designCourse: "Diseñar curso",
      certification: "Proporcionar certificación",
      activeCourses: "Tus cursos activos",
      jobBoard: "Bolsa de trabajo",
      recruitment: "Reclutamiento",
      macroAnalytics: "Análisis a nivel macro",
      laborTrends: "Tendencias y perspectivas del mercado laboral",
    }
  };

  const t = translations[language];

  return (
    <div>
      <div className="header-row">
        <div>
          <h1 className="text-gradient">{t.welcome}, {user?.name || 'RK'}!</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>{t.dashboardDesc} {currentRole} {t.dashboardSuffix}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {!user && (
          <div style={{ background: 'var(--glass-bg)', padding: '4px', borderRadius: '8px', display: 'flex' }}>
            <button
              className={`btn-secondary ${demoRole === 'Learner' ? 'active' : ''}`}
              style={{ border: 'none', background: demoRole === 'Learner' ? 'rgba(99,102,241,0.2)' : 'transparent', color: demoRole === 'Learner' ? 'white' : 'var(--text-secondary)' }}
              onClick={() => setDemoRole('Learner')}
            >
              {t.learner}
            </button>
            <button
              className={`btn-secondary ${demoRole === 'Trainer' ? 'active' : ''}`}
              style={{ border: 'none', background: demoRole === 'Trainer' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: demoRole === 'Trainer' ? 'white' : 'var(--text-secondary)' }}
              onClick={() => setDemoRole('Trainer')}
            >
              {t.trainer}
            </button>
            <button
              className={`btn-secondary ${demoRole === 'Policymaker' ? 'active' : ''}`}
              style={{ border: 'none', background: demoRole === 'Policymaker' ? 'rgba(236,72,153,0.2)' : 'transparent', color: demoRole === 'Policymaker' ? 'white' : 'var(--text-secondary)' }}
              onClick={() => setDemoRole('Policymaker')}
            >
              {t.policymaker}
            </button>
          </div>
        )}
        </div>
      </div>

      {currentRole === 'Learner' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            {user?.career_guidance && (
              <div className="glass-panel" style={{ marginBottom: '24px', borderLeft: '4px solid var(--accent-primary)', background: 'rgba(99,102,241,0.05)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)' }}>
                  <span style={{ fontSize: '20px' }}>🎯</span> {t.careerGuidance}
                </h3>
                <p style={{ marginTop: '12px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  {user.career_guidance}
                </p>
              </div>
            )}
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div className="glass-panel hover-scale" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/learning-paths')}>
                <Map size={32} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ marginBottom: '4px' }}>{t.chooseRoadmap}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Find your path</p>
              </div>
              <div className="glass-panel hover-scale" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/prepmate')}>
                <BookOpen size={32} color="var(--accent-secondary)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ marginBottom: '4px' }}>{t.prepmate}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ATS, Mock Interviews</p>
              </div>
              <div className="glass-panel hover-scale" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/track/SESSION_9823X4')}>
                <CheckCircle size={32} color="var(--success)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ marginBottom: '4px' }}>{t.analytics}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Track progress</p>
              </div>
            </div>

            <div className="glass-panel" style={{ marginBottom: '24px' }}>
              <h3>🔥 {t.currentRoadmap}: Advanced Python</h3>
              <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                <div style={{ width: '65%', background: 'var(--success)', height: '100%', borderRadius: '8px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>65% Completed</span>
                <span>Next Module: FastAPI WebSockets</span>
              </div>
            </div>

            <VoiceAssistant userGuidance={user?.career_guidance} />
          </div>

          <div>
            <QRTracker sessionId="SESSION_9823X4" />
            <div className="glass-panel" style={{ marginTop: '24px' }}>
              <h3>Recent Achievements</h3>
              <ul style={{ listStyle: 'none', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                  <span style={{ fontSize: '20px' }}>🏆</span> Completed Data Structures
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {currentRole === 'Trainer' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          <div className="glass-panel hover-scale" style={{ textAlign: 'center', padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/upload')}>
            <UploadCloud size={48} color="var(--accent-primary)" style={{ margin: '0 auto 16px' }} />
            <h2>{t.uploadContent}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Upload videos, docs, and quizzes</p>
          </div>
          <div className="glass-panel hover-scale" style={{ textAlign: 'center', padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/courses')}>
            <Edit3 size={48} color="var(--accent-secondary)" style={{ margin: '0 auto 16px' }} />
            <h2>{t.designCourse}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Structure modules and lessons</p>
          </div>
          <div className="glass-panel hover-scale" style={{ textAlign: 'center', padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/courses')}>
            <Award size={48} color="var(--success)" style={{ margin: '0 auto 16px' }} />
            <h2>{t.certification}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Issue certificates to students</p>
          </div>

          <div className="glass-panel" style={{ gridColumn: 'span 3', marginTop: '16px' }}>
            <h3>{t.activeCourses}</h3>
            <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '16px' }}>Advanced React Patterns</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>124 enrolled students</p>
              </div>
              <button className="btn-primary" onClick={() => navigate('/courses')}>Manage</button>
            </div>
          </div>
        </div>
      )}

      {(currentRole === 'Policymaker' || currentRole === 'Mediator') && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          <div className="glass-panel hover-scale" style={{ textAlign: 'center', padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/jobs')}>
            <Search size={48} color="var(--accent-tertiary)" style={{ margin: '0 auto 16px' }} />
            <h2>{t.jobBoard}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Post and manage jobs</p>
          </div>
          <div className="glass-panel hover-scale" style={{ textAlign: 'center', padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/recruitment')}>
            <Users size={48} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
            <h2>{t.recruitment}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Manage hiring pipeline</p>
          </div>
          <div className="glass-panel hover-scale" style={{ textAlign: 'center', padding: '32px', cursor: 'pointer' }} onClick={() => navigate('/analytics')}>
            <TrendingUp size={48} color="var(--accent-primary)" style={{ margin: '0 auto 16px' }} />
            <h2>{t.analytics}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Macro labor insights</p>
          </div>

          <div className="glass-panel hover-scale" style={{ gridColumn: 'span 3', marginTop: '16px', cursor: 'pointer' }} onClick={() => navigate('/analytics')}>
            <h2 className="text-gradient">{t.macroAnalytics}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>{t.laborTrends}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--accent-primary)', fontSize: '32px' }}>1,248</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Active Job Postings</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--success)', fontSize: '32px' }}>82%</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Placement Rate</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--accent-tertiary)', fontSize: '32px' }}>Top</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Need: Full-Stack Dev</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
