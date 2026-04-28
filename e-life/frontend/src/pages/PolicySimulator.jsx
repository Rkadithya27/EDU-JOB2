import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Zap, TrendingUp, AlertTriangle, Play, RefreshCw, Layers } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PolicySimulator = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [policyAmount, setPolicyAmount] = useState(500); // Millions
  const [targetSector, setTargetSector] = useState('Green Energy');
  
  // Baseline data before simulation
  const [chartData, setChartData] = useState([
    { year: 2025, greenJobs: 120, traditionalJobs: 800, avgSalary: 65 },
    { year: 2026, greenJobs: 130, traditionalJobs: 780, avgSalary: 66 },
    { year: 2027, greenJobs: 140, traditionalJobs: 760, avgSalary: 67 },
    { year: 2028, greenJobs: 155, traditionalJobs: 740, avgSalary: 68 },
    { year: 2029, greenJobs: 170, traditionalJobs: 720, avgSalary: 69 },
    { year: 2030, greenJobs: 190, traditionalJobs: 700, avgSalary: 71 },
  ]);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    
    setTimeout(() => {
      // Generate "Butterfly Effect" altered data
      const factor = policyAmount / 100; // Multiplier based on investment
      setChartData([
        { year: 2025, greenJobs: 120, traditionalJobs: 800, avgSalary: 65 },
        { year: 2026, greenJobs: Math.round(130 + (20 * factor)), traditionalJobs: Math.round(780 - (10 * factor)), avgSalary: 67 },
        { year: 2027, greenJobs: Math.round(140 + (50 * factor)), traditionalJobs: Math.round(760 - (25 * factor)), avgSalary: 69 },
        { year: 2028, greenJobs: Math.round(155 + (90 * factor)), traditionalJobs: Math.round(740 - (45 * factor)), avgSalary: 72 },
        { year: 2029, greenJobs: Math.round(170 + (140 * factor)), traditionalJobs: Math.round(720 - (70 * factor)), avgSalary: 76 },
        { year: 2030, greenJobs: Math.round(190 + (200 * factor)), traditionalJobs: Math.round(700 - (100 * factor)), avgSalary: 82 },
      ]);
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 2500);
  };

  const resetSimulation = () => {
    setChartData([
      { year: 2025, greenJobs: 120, traditionalJobs: 800, avgSalary: 65 },
      { year: 2026, greenJobs: 130, traditionalJobs: 780, avgSalary: 66 },
      { year: 2027, greenJobs: 140, traditionalJobs: 760, avgSalary: 67 },
      { year: 2028, greenJobs: 155, traditionalJobs: 740, avgSalary: 68 },
      { year: 2029, greenJobs: 170, traditionalJobs: 720, avgSalary: 69 },
      { year: 2030, greenJobs: 190, traditionalJobs: 700, avgSalary: 71 },
    ]);
    setSimulationComplete(false);
    setPolicyAmount(500);
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Network size={36} color="var(--accent-tertiary)" /> Butterfly Effect Engine
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Simulate massive economic policy shifts and watch the AI predict the exact ripple effects across the national labor market over the next 5 years.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', height: '65vh' }}>
        
        {/* Left Panel: Policy Injector */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={20} color="var(--accent-primary)"/> Inject Policy Variable
          </h3>
          
          <div>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>Target Sector</label>
            <select 
              value={targetSector} 
              onChange={(e) => setTargetSector(e.target.value)}
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', outline: 'none' }}
              disabled={isSimulating || simulationComplete}
            >
              <option value="Green Energy">Green Energy & EV Manufacturing</option>
              <option value="Artificial Intelligence">AI & Quantum Computing</option>
              <option value="Semiconductors">Domestic Semiconductors</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>Funding Allocation (Millions USD)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input 
                type="range" 
                min="100" max="2000" step="100" 
                value={policyAmount} 
                onChange={(e) => setPolicyAmount(e.target.value)}
                style={{ flex: 1, accentColor: 'var(--accent-tertiary)' }}
                disabled={isSimulating || simulationComplete}
              />
              <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--accent-tertiary)', minWidth: '70px' }}>${policyAmount}M</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!simulationComplete ? (
              <button 
                className="btn-primary" 
                onClick={runSimulation}
                disabled={isSimulating}
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px', background: isSimulating ? 'rgba(99,102,241,0.5)' : '' }}
              >
                {isSimulating ? (
                  <><span className="listening-indicator" style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> Processing Neural Simulation...</>
                ) : (
                  <><Play size={18} /> Execute Butterfly Effect</>
                )}
              </button>
            ) : (
              <button 
                className="btn-secondary" 
                onClick={resetSimulation}
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px' }}
              >
                <RefreshCw size={18} /> Reset Simulation
              </button>
            )}
          </div>
        </div>

        {/* Right Panel: The Ripple Effect Results */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '32px', position: 'relative', overflow: 'hidden' }}>
          
          <AnimatePresence>
            {isSimulating && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(20,20,31,0.8)', backdropFilter: 'blur(4px)', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
              >
                <Network size={64} color="var(--accent-tertiary)" style={{ animation: 'pulse 1.5s infinite alternate' }} />
                <h2 style={{ marginTop: '24px', color: 'var(--accent-tertiary)' }}>Calculating Global Market Ripples...</h2>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3>Labor Trajectory (2025 - 2030)</h3>
            {simulationComplete && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '6px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} /> AI Projection Rendered
              </motion.div>
            )}
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--success)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} hide />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} />
                <Area type="monotone" name={`${targetSector} Jobs (k)`} dataKey="greenJobs" stroke="var(--success)" strokeWidth={3} fillOpacity={1} fill="url(#colorGreen)" />
                <Area type="monotone" name="Traditional Jobs (k)" dataKey="traditionalJobs" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorTrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {simulationComplete && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{targetSector} Growth</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={20}/> +{Math.round(chartData[5].greenJobs / chartData[0].greenJobs * 100 - 100)}%</div>
              </div>
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Traditional Disruption</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={20}/> -{Math.round(100 - chartData[5].traditionalJobs / chartData[0].traditionalJobs * 100)}%</div>
              </div>
              <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>National Salary Avg</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={20}/> ${chartData[5].avgSalary}k</div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.2); opacity: 0.3; } }
      `}} />
    </div>
  );
};

export default PolicySimulator;
