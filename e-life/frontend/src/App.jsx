import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './index.css';
import { LogOut, Menu, X } from 'lucide-react';

import { useLanguage } from './context/LanguageContext';

function Sidebar({ user, onLogout, isOpen, setIsOpen }) {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  const translations = {
    en: {
      dashboard: "Dashboard", roadmaps: "Roadmaps", prepmate: "Prepmate Hub",
      peerConnect: "AI Peer Tinder", leaderboard: "Leaderboard", wallet: "Skill Wallet",
      simulator: "Role Simulator", courses: "My Courses", upload: "Upload Content",
      studio: "Neuro Studio", jobs: "Job Board", recruitment: "Recruitment",
      analytics: "Market Analytics", policySim: "Policy Simulator", settings: "Settings", logout: "Logout"
    },
    hi: {
      dashboard: "डैशबोर्ड", roadmaps: "रोडमैप", prepmate: "प्रेपमेट हब",
      peerConnect: "एआई पीयर टिंडर", leaderboard: "लीडरबोर्ड", wallet: "कौशल वॉलेट",
      simulator: "रोल सिम्युलेटर", courses: "मेरे पाठ्यक्रम", upload: "सामग्री अपलोड",
      studio: "न्यूरो स्टूडियो", jobs: "जॉब बोर्ड", recruitment: "भर्ती",
      analytics: "बाजार विश्लेषण", policySim: "नीति सिम्युलेटर", settings: "सेटिंग्स", logout: "लॉग आउट"
    },
    es: {
      dashboard: "Panel", roadmaps: "Hojas de ruta", prepmate: "Centro Prepmate",
      peerConnect: "Tinder de pares de IA", leaderboard: "Tabla de posiciones", wallet: "Billetera de hab.",
      simulator: "Simulador de roles", courses: "Mis Cursos", upload: "Subir Contenido",
      studio: "Neuro Estudio", jobs: "Bolsa de trabajo", recruitment: "Reclutamiento",
      analytics: "Análisis de mercado", policySim: "Simulador de políticas", settings: "Ajustes", logout: "Cerrar sesión"
    }
  };
  const t = translations[language];
  
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2 className="text-gradient breathing-effect" style={{ marginBottom: '40px', fontSize: '28px', display: 'inline-block' }}>EDU-JOB</h2>
      
      <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Link to="/" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <span>📊</span> {t.dashboard}
        </Link>
        
        {(!user?.role || user?.role === 'Learner') && (
          <>
            <Link to="/learning-paths" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/learning-paths' ? 'active' : ''}`}>
              <span>🗺️</span> {t.roadmaps}
            </Link>
            <Link to="/prepmate" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/prepmate' ? 'active' : ''}`}>
              <span>🎯</span> {t.prepmate}
            </Link>
            <Link to="/peer-connect" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/peer-connect' ? 'active' : ''}`}>
              <span>🔥</span> {t.peerConnect}
            </Link>
            <Link to="/leaderboard" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}>
              <span>🎮</span> {t.leaderboard}
            </Link>
            <Link to="/wallet" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/wallet' ? 'active' : ''}`}>
              <span>🎓</span> {t.wallet}
            </Link>
            <Link to="/simulator" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/simulator' ? 'active' : ''}`}>
              <span>🕶️</span> {t.simulator}
            </Link>
          </>
        )}

        {user?.role === 'Trainer' && (
          <>
            <Link to="/courses" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>
              <span>📚</span> {t.courses}
            </Link>
            <Link to="/upload" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}>
              <span>☁️</span> {t.upload}
            </Link>
            <Link to="/studio" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/studio' ? 'active' : ''}`}>
              <span>🧠</span> {t.studio}
            </Link>
          </>
        )}

        {(user?.role === 'Policymaker' || user?.role === 'Mediator') && (
          <>
            <Link to="/jobs" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}>
              <span>💼</span> {t.jobs}
            </Link>
            <Link to="/recruitment" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/recruitment' ? 'active' : ''}`}>
              <span>👥</span> {t.recruitment}
            </Link>
            <Link to="/analytics" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}>
              <span>📈</span> {t.analytics}
            </Link>
            <Link to="/policy-sim" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/policy-sim' ? 'active' : ''}`}>
              <span>🦋</span> {t.policySim}
            </Link>
          </>
        )}

        <Link to="/settings" onClick={() => setIsOpen(false)} className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
          <span>⚙️</span> {t.settings}
        </Link>
      </nav>
      
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px 12px', outline: 'none', cursor: 'pointer', marginBottom: '8px' }}
        >
          <option value="en" style={{ color: 'black' }}>English</option>
          <option value="hi" style={{ color: 'black' }}>हिंदी (Hindi)</option>
          <option value="es" style={{ color: 'black' }}>Español (Spanish)</option>
        </select>
        <button 
          onClick={onLogout}
          style={{ background: 'transparent', border: '1px solid rgba(236,72,153,0.3)', color: '#ec4899', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600, transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(236,72,153,0.1)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <LogOut size={16} /> {t.logout}
        </button>

        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'RK'}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{user?.name || 'RK Student'}</div>
            <div className={`role-badge badge-${(user?.role || 'Learner').toLowerCase()}`} style={{ marginTop: '4px', fontSize: '10px' }}>{user?.role || 'Learner'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Auth from './pages/Auth';
import ChatBot from './components/ChatBot';
import LearningPaths from './pages/LearningPaths';
import ProgressAnalytics from './pages/ProgressAnalytics';
import PrepmateHub from './pages/PrepmateHub';
import JobBoard from './pages/JobBoard';
import Recruitment from './pages/Recruitment';
import Analytics from './pages/Analytics';
import UploadContent from './pages/UploadContent';
import TrainerCourses from './pages/TrainerCourses';
import Leaderboard from './pages/Leaderboard';
import PeerConnect from './pages/PeerConnect';
import SkillWallet from './pages/SkillWallet';
import RoleSimulator from './pages/RoleSimulator';
import EngagementStudio from './pages/EngagementStudio';
import PolicySimulator from './pages/PolicySimulator';
import Settings from './pages/Settings';
import { JobProvider } from './context/JobContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [user, setUser] = React.useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Auth setAuthenticated={setUser} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <LanguageProvider>
      <JobProvider>
        <BrowserRouter>
          <div className="app-container">
          
          <button className="burger-menu-btn" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div 
            className={`mobile-overlay ${isSidebarOpen ? 'open' : ''}`} 
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <Sidebar user={user} onLogout={handleLogout} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            
            <Route path="/track/:sessionId" element={<ProgressAnalytics />} />

            {/* Learner Routes */}
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/prepmate" element={<PrepmateHub />} />
            <Route path="/peer-connect" element={<PeerConnect />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/wallet" element={<SkillWallet />} />
            <Route path="/simulator" element={<RoleSimulator />} />

            {/* Trainer Routes */}
            <Route path="/courses" element={<TrainerCourses />} />
            <Route path="/upload" element={<UploadContent />} />
            <Route path="/studio" element={<EngagementStudio />} />

            {/* Policymaker Routes */}
            <Route path="/jobs" element={<JobBoard />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/policy-sim" element={<PolicySimulator />} />

            {/* Settings View */}
            <Route path="/settings" element={<Settings user={user} onLogout={handleLogout} />} />
          </Routes>
        </main>
        <ChatBot />
      </div>
    </BrowserRouter>
  </JobProvider>
</LanguageProvider>
  );
}

export default App;
