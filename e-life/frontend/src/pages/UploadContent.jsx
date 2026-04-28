import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, CheckCircle, X } from 'lucide-react';

const UploadContent = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles) => {
    const formattedFiles = newFiles.map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0
    }));

    setFiles(prev => [...prev, ...formattedFiles]);

    // Simulate upload progress
    formattedFiles.forEach(file => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 20;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
        }
        setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: currentProgress } : f));
      }, 300);
    });
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div style={{ animation: 'opacity 0.4s ease', paddingBottom: '40px' }}>
      <h1 className="text-gradient">Upload Content</h1>
      <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>Upload videos, documents, and quizzes for your courses.</p>
      
      <div 
        className="glass-panel" 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ 
          border: `2px dashed ${isDragging ? 'var(--accent-primary)' : 'var(--glass-border)'}`, 
          background: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'rgba(20,20,31,0.7)',
          textAlign: 'center', 
          padding: '64px',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          onChange={handleFileInput} 
          style={{ display: 'none' }} 
        />
        <motion.div animate={{ y: isDragging ? -10 : 0 }}>
          <UploadCloud size={64} color={isDragging ? "var(--accent-primary)" : "var(--text-secondary)"} style={{ margin: '0 auto' }} />
        </motion.div>
        <h3 style={{ marginTop: '16px', color: isDragging ? 'var(--accent-primary)' : 'white' }}>
          {isDragging ? 'Drop files here' : 'Drag and drop files here'}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>or</p>
        <button 
          className="btn-secondary" 
          style={{ marginTop: '16px' }}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          Browse Files
        </button>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '32px' }}>
            <h3 style={{ marginBottom: '16px' }}>Uploading Files</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {files.map(file => (
                <React.Fragment key={file.id}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-panel"
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}
                >
                  <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '12px' }}>
                    <File size={24} color="var(--accent-primary)" />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 500 }}>{file.name}</span>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{file.size}</span>
                    </div>
                    
                    <div style={{ height: '6px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div 
                        style={{ height: '100%', background: file.progress >= 100 ? 'var(--success)' : 'var(--accent-primary)', borderRadius: '4px' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>

                  {file.progress >= 100 ? (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button 
                        onClick={() => {
                          const el = document.getElementById(`quiz-${file.id}`);
                          if(el) {
                            el.style.display = 'block';
                            el.innerHTML = '<div style="display:flex; align-items:center; gap:8px; color:var(--accent-tertiary); font-size:13px; font-weight:600;"><span class="listening-indicator" style="width:12px; height:12px; background:var(--accent-tertiary);"></span> AI analyzing file...</div>';
                            setTimeout(() => {
                              el.innerHTML = `
                                <div style="background: rgba(236,72,153,0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(236,72,153,0.2); margin-top: 12px;">
                                  <h4 style="color: var(--accent-tertiary); display:flex; align-items:center; gap:8px; margin-bottom: 12px;">✨ AI Generated Quiz</h4>
                                  <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">Q1: What is the main thesis of this document?</div>
                                  <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">Q2: List three practical applications mentioned.</div>
                                  <button class="btn-secondary" style="font-size: 12px; padding: 6px 12px; margin-top: 8px;">Attach to Course</button>
                                </div>
                              `;
                            }, 2000);
                          }
                        }}
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(99,102,241,0.2))', 
                          border: '1px solid rgba(236,72,153,0.4)', 
                          color: 'var(--text-primary)', 
                          padding: '6px 12px', 
                          borderRadius: '8px', 
                          fontSize: '12px', 
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        ✨ Auto-Quiz
                      </button>
                      <CheckCircle size={24} color="var(--success)" />
                    </div>
                  ) : (
                    <button 
                      onClick={() => removeFile(file.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
                    >
                      <X size={20} />
                    </button>
                  )}
                </motion.div>
                <div id={`quiz-${file.id}`} style={{ display: 'none', paddingLeft: '64px' }}></div>
              </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadContent;
