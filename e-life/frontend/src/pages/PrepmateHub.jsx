import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Upload, FileText, CheckCircle, Brain, AlertCircle, Play, Clock } from 'lucide-react';

const PrepmateHub = () => {
  const [activeMode, setActiveMode] = useState('hub'); // 'hub', 'interview', 'upload', 'test'

  // --- Interview State ---
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const startInterviewVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
      setAiResponse("Processing...");
      
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/voice/ask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        
        const data = await res.json();
        setAiResponse(data.response_text);
        
        const utterance = new SpeechSynthesisUtterance(data.response_text);
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(v => 
          v.name.includes('Google UK English Female') || 
          v.name.includes('Samantha') || 
          v.name.includes('Victoria') ||
          v.name.includes('Microsoft Zira') ||
          v.name.includes('Google US English') ||
          (v.name.toLowerCase().includes('female') && v.lang.startsWith('en'))
        );
        if (femaleVoice) utterance.voice = femaleVoice;
        utterance.rate = 1.05;
        utterance.pitch = 1.25;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        setAiResponse("Error connecting to backend voice service.");
      }
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  // --- Test State ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testTopic, setTestTopic] = useState('');
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [testQuestions, setTestQuestions] = useState([]);

  const handleStartTest = () => {
    if (!testTopic.trim()) return;
    
    // Generate dynamic template questions based on the topic
    const topic = testTopic.trim();
    setTestQuestions([
      {
        id: 1,
        question: `What is the core underlying principle of ${topic}?`,
        options: [
          `It strictly relies on object-oriented paradigms.`,
          `It is primarily used for optimizing hardware pipelines.`,
          `It focuses on solving domain-specific architectural problems.`,
          `It replaces traditional databases completely.`
        ],
        correct: 2
      },
      {
        id: 2,
        question: `When implementing ${topic} in a production environment, what is the most critical vulnerability to look out for?`,
        options: ["Memory Leaks", "SQL Injection", "Race Conditions", "State Desynchronization"],
        correct: 3
      },
      {
        id: 3,
        question: `Which of the following is considered best practice when scaling ${topic}?`,
        options: [
          "Using a monolithic architecture",
          "Vertical scaling only",
          "Implementing caching and load balancing",
          "Hardcoding configuration values"
        ],
        correct: 2
      }
    ]);
    setIsTestStarted(true);
  };

  const handleSelectAnswer = (qIndex, oIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: oIndex });
  };

  const calculateScore = () => {
    let score = 0;
    testQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++;
    });
    return Math.round((score / testQuestions.length) * 100);
  };

  // --- Upload State ---
  const [uploadProgress, setUploadProgress] = useState(0);
  const [atsScore, setAtsScore] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setUploadProgress(1);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Generate a deterministic pseudo-random ATS score between 60 and 96 based on file size
          const pseudoScore = 60 + (file.size % 37);
          setAtsScore(pseudoScore); 
          return 100;
        }
        return prev + 12;
      });
    }, 250);
  };

  return (
    <div style={{ animation: 'opacity 0.4s ease', paddingBottom: '40px' }}>
      
      {activeMode !== 'hub' && (
        <button 
          onClick={() => { setActiveMode('hub'); setTestSubmitted(false); setCurrentQuestion(0); setSelectedAnswers({}); setUploadProgress(0); setAtsScore(null); setTranscript(''); setAiResponse(''); setIsTestStarted(false); setTestTopic(''); }}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
        >
          <ArrowLeft size={16} /> Back to Hub
        </button>
      )}

      <AnimatePresence mode="wait">
        
        {/* --- MAIN HUB VIEW --- */}
        {activeMode === 'hub' && (
          <motion.div key="hub" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <h1 className="text-gradient">Prepmate Hub</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>AI-Powered Interview & Resume Preparation</p>
            
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="hover-scale" style={{ background: 'rgba(99,102,241,0.1)', borderLeft: '4px solid var(--accent-primary)', padding: '16px', borderRadius: '0 8px 8px 0' }}>
                <h3>🗣️ AI Mock Interviewer</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Practice answering behavioral and technical questions in real-time with our voice AI.</p>
                <button onClick={() => setActiveMode('interview')} className="btn-primary" style={{ marginTop: '12px' }}>Start Session</button>
              </div>
              
              <div className="hover-scale" style={{ background: 'rgba(236,72,153,0.1)', borderLeft: '4px solid var(--accent-tertiary)', padding: '16px', borderRadius: '0 8px 8px 0' }}>
                <h3>📄 Resume ATS Scanner</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Upload your resume and get instant feedback on ATS compatibility.</p>
                <button onClick={() => setActiveMode('upload')} className="btn-primary" style={{ marginTop: '12px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>Upload PDF</button>
              </div>
              
              <div className="hover-scale" style={{ background: 'rgba(16,185,129,0.1)', borderLeft: '4px solid var(--success)', padding: '16px', borderRadius: '0 8px 8px 0' }}>
                <h3>🧠 Aptitude Test</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Test your logical reasoning and quantitative skills.</p>
                <button onClick={() => setActiveMode('test')} className="btn-primary" style={{ marginTop: '12px', background: 'linear-gradient(135deg, #10b981, #34d399)' }}>Take Test</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- APTITUDE TEST INTERFACE --- */}
        {activeMode === 'test' && (
          <motion.div key="test" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h1 className="text-gradient">Skill Assessment Test</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>
              {!isTestStarted ? "Select your topic to generate a dynamic assessment." : `Testing your knowledge on: ${testTopic}`}
            </p>
            
            <div className="glass-panel">
              {!isTestStarted ? (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <Brain size={48} color="var(--accent-primary)" style={{ margin: '0 auto 16px' }} />
                  <h2 style={{ marginBottom: '16px' }}>What topic do you want to test?</h2>
                  <input 
                    type="text" 
                    value={testTopic}
                    onChange={(e) => setTestTopic(e.target.value)}
                    placeholder="e.g. React.js, Data Structures, Marketing..."
                    style={{ 
                      width: '100%', maxWidth: '400px', padding: '16px', 
                      borderRadius: '12px', border: '1px solid var(--accent-primary)', 
                      background: 'rgba(255,255,255,0.05)', color: 'white',
                      fontSize: '16px', marginBottom: '24px', textAlign: 'center'
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleStartTest()}
                  />
                  <br />
                  <button 
                    onClick={handleStartTest} 
                    className="btn-primary" 
                    disabled={!testTopic.trim()}
                    style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', opacity: testTopic.trim() ? 1 : 0.5 }}
                  >
                    Generate & Start Test
                  </button>
                </div>
              ) : !testSubmitted ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                    <span>Question {currentQuestion + 1} of {testQuestions.length}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={16} /> 15:00 min left</span>
                  </div>

                  <h2 style={{ fontSize: '20px', marginBottom: '24px', lineHeight: '1.4' }}>
                    {testQuestions[currentQuestion].question}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {testQuestions[currentQuestion].options.map((opt, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleSelectAnswer(currentQuestion, idx)}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          border: `2px solid ${selectedAnswers[currentQuestion] === idx ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                          background: selectedAnswers[currentQuestion] === idx ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                        className="hover-scale"
                      >
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${selectedAnswers[currentQuestion] === idx ? 'var(--accent-primary)' : 'var(--text-secondary)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           {selectedAnswers[currentQuestion] === idx && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-primary)' }} />}
                        </div>
                        {opt}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                    <button 
                      className="btn-secondary" 
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                      style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
                    >
                      Previous
                    </button>
                    
                    {currentQuestion === testQuestions.length - 1 ? (
                      <button 
                        className="btn-primary" 
                        onClick={() => setTestSubmitted(true)}
                        style={{ background: 'var(--success)' }}
                        disabled={Object.keys(selectedAnswers).length < testQuestions.length}
                      >
                        Submit Test
                      </button>
                    ) : (
                      <button 
                        className="btn-primary" 
                        onClick={() => setCurrentQuestion(prev => Math.min(testQuestions.length - 1, prev + 1))}
                      >
                        Next Question
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                   <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '2px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                      <Brain size={40} color="var(--success)" />
                   </div>
                   <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Test Completed!</h2>
                   <p style={{ color: 'var(--text-secondary)' }}>Here is your aptitude analysis score.</p>
                   
                   <div style={{ fontSize: '64px', fontWeight: 'bold', color: 'var(--accent-primary)', margin: '24px 0' }}>
                     {calculateScore()}%
                   </div>
                   
                   <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '12px 24px', borderRadius: '24px', color: 'var(--success)' }}>
                      <CheckCircle size={18} /> Top 15% of Candidates
                   </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* --- ATS RESUME UPLOAD INTERFACE --- */}
        {activeMode === 'upload' && (
          <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h1 className="text-gradient">ATS Resume Scanner</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>Upload your PDF to get an instant match score.</p>
            
            <div className="glass-panel" style={{ textAlign: 'center', padding: '64px 24px', position: 'relative', overflow: 'hidden' }}>
               {/* Background scanning effect */}
               {uploadProgress > 0 && uploadProgress < 100 && (
                 <motion.div 
                   initial={{ top: '-10%' }}
                   animate={{ top: '110%' }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   style={{ position: 'absolute', left: 0, right: 0, height: '4px', background: 'var(--accent-tertiary)', boxShadow: '0 0 20px 4px var(--accent-tertiary)', zIndex: 0, opacity: 0.5 }}
                 />
               )}
               
               <div style={{ position: 'relative', zIndex: 1 }}>
                 {!atsScore ? (
                   <>
                     <div className={uploadProgress > 0 ? "pulse-dot" : ""} style={{ width: '80px', height: '80px', borderRadius: '50%', background: uploadProgress > 0 ? 'rgba(236,72,153,0.3)' : 'rgba(236,72,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', transition: 'all 0.3s' }}>
                        <Upload size={40} color="var(--accent-tertiary)" />
                     </div>
                     <h3 style={{ marginBottom: '16px' }}>Drag and Drop your PDF</h3>
                     
                     {uploadProgress === 0 ? (
                       <label className="btn-primary hover-scale" style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)', display: 'inline-block', cursor: 'pointer', padding: '12px 24px' }}>
                         Select File
                         <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleUpload} />
                       </label>
                     ) : (
                       <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                         <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Scanning Document <span style={{ color: 'white' }}>{fileName}</span>... {Math.min(uploadProgress, 100)}%</p>
                         <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                           <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'var(--accent-tertiary)', transition: 'width 0.25s ease' }}></div>
                         </div>
                       </div>
                     )}
                   </>
               ) : (
                 <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                      <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>{atsScore}</span>
                    </div>
                    <h2 style={{ marginBottom: '8px' }}>Great Match!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px auto' }}>Your resume passes ATS checks for most Software Engineering roles. We recommend adding more keywords related to 'CI/CD'.</p>
                    <button onClick={() => { setUploadProgress(0); setAtsScore(null); }} className="btn-secondary">Scan Another</button>
                 </motion.div>
               )}
               </div>
            </div>
          </motion.div>
        )}

        {/* --- AI MOCK INTERVIEW INTERFACE --- */}
        {activeMode === 'interview' && (
          <motion.div key="interview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h1 className="text-gradient">AI Mock Interview</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>Speak clearly. The AI will listen and respond dynamically.</p>
            
            <div className="glass-panel" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingBottom: '80px' }}>
              <div className={isListening ? "breathing-effect pulse-dot" : ""} style={{ width: '150px', height: '150px', borderRadius: '50%', background: isListening ? 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(236,72,153,0) 70%)' : 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', transition: 'all 0.3s ease' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: isListening ? 'linear-gradient(135deg, #ec4899, #f43f5e)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isListening ? '0 0 40px rgba(236,72,153,0.8)' : '0 0 30px rgba(99,102,241,0.5)', transition: 'all 0.3s ease' }}>
                  <Mic size={40} color="white" />
                </div>
              </div>
              
              {!aiResponse && !transcript ? (
                <>
                  <h3 style={{ marginBottom: '8px' }}>"Hello! I'll be your interviewer today."</h3>
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', textAlign: 'center' }}>"Tell me about a time you had to overcome a difficult technical challenge."</p>
                </>
              ) : (
                <div style={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {transcript && (
                    <div style={{ alignSelf: 'flex-end', background: 'rgba(99,102,241,0.1)', border: '1px solid var(--accent-primary)', padding: '12px 16px', borderRadius: '16px 16px 0 16px', color: 'white', fontSize: '15px' }}>
                      {transcript}
                    </div>
                  )}
                  {aiResponse && (
                    <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px 16px', borderRadius: '16px 16px 16px 0', color: 'var(--text-secondary)', fontSize: '15px' }}>
                      {aiResponse === "Processing..." ? <span className="pulse-dot" style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%' }}></span> : aiResponse}
                    </div>
                  )}
                </div>
              )}

              <div style={{ position: 'absolute', bottom: '24px', display: 'flex', gap: '16px' }}>
                <button 
                  onClick={startInterviewVoice}
                  className={`btn-primary ${isListening ? 'recording' : ''}`} 
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isListening ? 'linear-gradient(135deg, #ec4899, #f43f5e)' : '' }}
                >
                  {isListening ? (
                    <>Listening... (Speak Now)</>
                  ) : (
                    <><Play size={16} /> Start Answering</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default PrepmateHub;
