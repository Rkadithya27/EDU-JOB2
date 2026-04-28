import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Briefcase, Zap } from 'lucide-react';

const Analytics = () => {
  // Mock Data
  const trendData = [
    { year: '2020', demand: 4000, supply: 2400 },
    { year: '2021', demand: 3000, supply: 1398 },
    { year: '2022', demand: 2000, supply: 9800 },
    { year: '2023', demand: 2780, supply: 3908 },
    { year: '2024', demand: 1890, supply: 4800 },
    { year: '2025', demand: 2390, supply: 3800 },
    { year: '2026', demand: 3490, supply: 4300 },
  ];

  const salaryData = [
    { role: 'Frontend', avg: 120, max: 180 },
    { role: 'Backend', avg: 135, max: 190 },
    { role: 'DevOps', avg: 145, max: 210 },
    { role: 'Data Sci', avg: 150, max: 230 },
    { role: 'AI Eng', avg: 170, max: 280 },
  ];

  const predictiveSkillData = [
    { skill: 'Quantum Computing', currentDemand: 20, predictedDemand2030: 95 },
    { skill: 'Gen AI & LLMs', currentDemand: 70, predictedDemand2030: 100 },
    { skill: 'Cybersecurity', currentDemand: 80, predictedDemand2030: 90 },
    { skill: 'Web3 & Blockchain', currentDemand: 45, predictedDemand2030: 85 },
    { skill: 'Cloud Native', currentDemand: 85, predictedDemand2030: 95 },
    { skill: 'AR/VR Dev', currentDemand: 30, predictedDemand2030: 75 }
  ];

  return (
    <div style={{ animation: 'opacity 0.4s ease', paddingBottom: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="text-gradient">Real-Time Market Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Deep dive into labor market trends, salary distributions, and skill demands.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)' }}>
             <TrendingUp size={24} color="var(--accent-primary)" />
           </div>
           <div>
             <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Market Growth</div>
             <div style={{ fontSize: '24px', fontWeight: 700 }}>+14.2%</div>
           </div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)' }}>
             <Briefcase size={24} color="var(--success)" />
           </div>
           <div>
             <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Open Positions</div>
             <div style={{ fontSize: '24px', fontWeight: 700 }}>1.2M</div>
           </div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(236,72,153,0.1)' }}>
             <DollarSign size={24} color="var(--accent-tertiary)" />
           </div>
           <div>
             <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Avg Tech Salary</div>
             <div style={{ fontSize: '24px', fontWeight: 700 }}>$134k</div>
           </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        
        {/* Trend Area Chart */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '24px' }}>Labor Demand vs Supply (5 Yr Trend)</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--success)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="year" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="demand" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorDemand)" />
                <Area type="monotone" dataKey="supply" stroke="var(--success)" fillOpacity={1} fill="url(#colorSupply)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Salary Bar Chart */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '24px' }}>Average Salary by Role (in $1000s)</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="role" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="avg" fill="var(--accent-tertiary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="max" fill="rgba(236,72,153,0.3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Predictive Skill Gap Radar */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-panel" style={{ gridColumn: 'span 2', height: '450px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3>Predictive Skill Gap (2030)</h3>
            <div style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} /> AI Forecasted
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={predictiveSkillData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="skill" stroke="var(--text-secondary)" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--text-secondary)" fontSize={10} />
                <Radar name="Current Demand (2025)" dataKey="currentDemand" stroke="var(--accent-primary)" fill="var(--accent-primary)" fillOpacity={0.3} />
                <Radar name="Predicted Demand (2030)" dataKey="predictedDemand2030" stroke="var(--accent-tertiary)" fill="var(--accent-tertiary)" fillOpacity={0.4} />
                <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Analytics;
