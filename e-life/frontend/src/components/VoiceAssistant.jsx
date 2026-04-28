import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SiriWaveform = () => (
  <div style={{ position: 'relative', width: '100%', maxWidth: '250px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <motion.div animate={{ height: ['10px', '40px', '10px'], width: ['70%', '90%', '70%'], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} style={{ position: 'absolute', border: '2px solid rgba(139, 92, 246, 0.8)', borderRadius: '50%', filter: 'blur(2px)', boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }} />
    <motion.div animate={{ height: ['30px', '10px', '30px'], width: ['90%', '60%', '90%'], rotate: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} style={{ position: 'absolute', border: '2px solid rgba(6, 182, 212, 0.8)', borderRadius: '50%', filter: 'blur(2px)', boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }} />
    <motion.div animate={{ height: ['15px', '35px', '15px'], width: ['80%', '100%', '80%'], rotate: [-1, 3, -1] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} style={{ position: 'absolute', border: '2px solid rgba(236, 72, 153, 0.8)', borderRadius: '50%', filter: 'blur(2px)', boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)' }} />
    <motion.div animate={{ scaleX: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ position: 'absolute', width: '90%', height: '2px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', filter: 'blur(1px)', boxShadow: '0 0 8px white' }} />
  </div>
);

const VoiceAssistant = ({ userGuidance }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef(null);

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Zero-Latency Rule: Local STT -> Backend -> Local TTS
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }
    
    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
      
      // Send locally generated text to backend
      try {
        const res = await fetch('http://127.0.0.1:8000/api/v1/voice/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, user_guidance: userGuidance })
        });
        
        const data = await res.json();
        setResponse(data.response_text);
        
        // Local TTS (Zero-latency playback)
        const utterance = new SpeechSynthesisUtterance(data.response_text);
        
        // Setup sweet female voice
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(v => 
          v.name.includes('Google UK English Female') || 
          v.name.includes('Samantha') || 
          v.name.includes('Victoria') ||
          v.name.includes('Microsoft Zira') ||
          v.name.includes('Google US English') ||
          (v.name.toLowerCase().includes('female') && v.lang.startsWith('en'))
        );
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        // Slightly slower rate and higher pitch for a sweeter tone
        utterance.rate = 1.05;
        utterance.pitch = 1.2;
        
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        setResponse("Error connecting to backend voice service.");
      }
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="glass-panel" style={{ marginTop: '24px', background: 'linear-gradient(145deg, rgba(20,20,31,0.8), rgba(99,102,241,0.1))' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        🎙️ AI Voice Assistant
        {isListening && <span className="listening-indicator"></span>}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px', marginBottom: '16px' }}>
        Ask me to generate a roadmap or check your progress.
      </p>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '56px' }}>
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div 
              key="listening" 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={stopListening}
              title="Click to stop listening"
              style={{ width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
            >
              <SiriWaveform />
            </motion.div>
          ) : (
            <motion.div 
              key="idle" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '16px' }}
            >
              <button 
                className="btn-primary" 
                onClick={startListening}
                style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: 'none', background: 'var(--accent-primary)', cursor: 'pointer' }}
              >
                🎤
              </button>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {transcript && <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>You: "{transcript}"</div>}
                {response && <div style={{ fontSize: '15px', color: 'var(--accent-primary)', marginTop: '4px' }}>AI: {response}</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VoiceAssistant;
