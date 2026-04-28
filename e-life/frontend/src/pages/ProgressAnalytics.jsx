import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowLeft, Clock, Target, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

const ProgressAnalytics = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  // Mock Data for the Charts
  const pieData = [
    { name: 'Completed', value: 65, color: 'var(--success)' },
    { name: 'In Progress', value: 20, color: 'var(--accent-primary)' },
    { name: 'Dropped Off', value: 15, color: 'var(--accent-tertiary)' }
  ];

  const areaData = [
    { name: 'Week 1', hours: 4, average: 3 },
    { name: 'Week 2', hours: 7, average: 4 },
    { name: 'Week 3', hours: 12, average: 5 },
    { name: 'Week 4', hours: 9, average: 6 },
    { name: 'Week 5', hours: 15, average: 6 },
    { name: 'Week 6', hours: 22, average: 7 },
  ];

  const dropOffData = [
    { module: 'M1: Basics', retained: 100, dropped: 0 },
    { module: 'M2: Auth', retained: 85, dropped: 15 },
    { module: 'M3: State', retained: 60, dropped: 25 },
    { module: 'M4: DB', retained: 40, dropped: 20 },
    { module: 'M5: Deploy', retained: 35, dropped: 5 },
  ];

  return (
    <div style={{ animation: 'opacity 0.4s ease', paddingBottom: '40px' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h1 className="text-gradient">Live Progress Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Tracking Session ID: <span style={{ color: 'var(--accent-primary)', fontFamily: 'monospace' }}>{sessionId}</span></p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
           <span className="pulse-dot" style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', display: 'inline-block' }}></span>
           <span style={{ color: 'var(--success)', fontSize: '14px', fontWeight: 600 }}>Syncing Live</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)' }}>
             <Target size={24} color="var(--success)" />
           </div>
           <div>
             <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Completion Rate</div>
             <div style={{ fontSize: '24px', fontWeight: 700 }}>65%</div>
           </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)' }}>
             <Clock size={24} color="var(--accent-primary)" />
           </div>
           <div>
             <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Time Spent</div>
             <div style={{ fontSize: '24px', fontWeight: 700 }}>69 hrs</div>
           </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.1)' }}>
             <AlertTriangle size={24} color="var(--accent-tertiary)" />
           </div>
           <div>
             <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Highest Drop-off</div>
             <div style={{ fontSize: '24px', fontWeight: 700 }}>Mod 3</div>
           </div>
        </motion.div>
      </div>

      {/* Main Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        
        {/* Area Chart: Learning Velocity */}
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <TrendingUp size={18} color="var(--accent-primary)" /> Learning Velocity
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px' }}>Hours spent learning compared to average.</p>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} 
                  itemStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="hours" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                <Area type="monotone" dataKey="average" stroke="var(--text-secondary)" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart: Status Overview */}
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }} className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Zap size={18} color="#f59e0b" /> Cohort Status Overview
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>Current distribution of learners.</p>
          <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0 0 10px ${entry.color}40)` }} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} 
                  itemStyle={{ color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
               <div style={{ fontSize: '28px', fontWeight: 'bold' }}>100%</div>
               <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total</div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* 3D Style Drop-off Chart */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="glass-panel" style={{ padding: '32px' }}>
         <h3 style={{ marginBottom: '8px' }}>Module Drop-off Rate (3D Analysis)</h3>
         <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '32px' }}>Tracking exactly where learners abandon the course pipeline.</p>
         
         <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={dropOffData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                 <XAxis dataKey="module" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip 
                   cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                   contentStyle={{ backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} 
                 />
                 {/* Fake 3D Effect using layered bars and shadows */}
                 <Bar dataKey="retained" stackId="a" fill="url(#colorRetained)" radius={[0, 0, 4, 4]} barSize={40} />
                 <Bar dataKey="dropped" stackId="a" fill="url(#colorDropped)" radius={[4, 4, 0, 0]} barSize={40} />
                 <defs>
                   <linearGradient id="colorRetained" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="var(--success)" stopOpacity={1}/>
                     <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
                   </linearGradient>
                   <linearGradient id="colorDropped" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="var(--accent-tertiary)" stopOpacity={1}/>
                     <stop offset="100%" stopColor="#be185d" stopOpacity={1}/>
                   </linearGradient>
                 </defs>
               </BarChart>
            </ResponsiveContainer>
         </div>
      </motion.div>

    </div>
  );
};

export default ProgressAnalytics;
