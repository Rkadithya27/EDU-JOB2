import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Keyboard } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I am your EDU-JOB AI Assistant. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

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
      setIsListening(false);
      
      setMessages(prev => [...prev, { sender: 'user', text }]);
      setIsTyping(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/voice/ask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error('Failed to get response');
        
        const data = await response.json();
        setMessages(prev => [...prev, { sender: 'bot', text: data.response_text }]);
        
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
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
        
      } catch (error) {
        setMessages(prev => [...prev, { sender: 'bot', text: "Oops, I'm having trouble connecting to my servers right now. Please try again later." }]);
      } finally {
        setIsTyping(false);
      }
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/voice/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userMessage })
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.response_text }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Oops, I'm having trouble connecting to my servers right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
      setShowKeyboard(false); // Hide keyboard after sending
    }
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <>
      {/* Full-Screen / Mobile-Style Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: '80px',
              right: '0',
              width: '350px',
              height: '550px',
              background: 'rgba(5, 5, 5, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(163, 230, 53, 0.2)',
              padding: '24px 16px',
              color: 'white',
              overflow: 'hidden'
            }}
          >
            {/* Close Button Top Right */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                zIndex: 20,
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <X size={16} />
            </button>

            {/* AI Buddy Badge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 10 }}>
              <div style={{ background: '#a3e635', color: '#050505', padding: '4px 12px', borderRadius: '20px', fontWeight: 600, fontSize: '13px' }}>
                EDU-JOB AI
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a3e635' }}></div>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Online</span>
              </div>
            </div>

            {/* The Floating AI Orb */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
              <motion.div
                animate={{
                  scale: isTyping ? [1, 1.15, 1] : (isListening ? [1, 1.25, 1] : [1, 1.05, 1]),
                  rotate: [0, 90, 180, 270, 360],
                  borderRadius: ['40% 60% 70% 30% / 40% 50% 60% 50%', '60% 40% 30% 70% / 60% 50% 40% 50%', '40% 60% 70% 30% / 40% 50% 60% 50%']
                }}
                transition={{
                  duration: isTyping ? 3 : 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  width: '180px',
                  height: '180px',
                  background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8), rgba(5, 5, 5, 0.9) 70%)',
                  boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.8), inset 15px 15px 30px rgba(255,255,255,0.2), 0 0 40px rgba(139,92,246,0.2)',
                  filter: 'blur(2px)',
                  marginBottom: '20px'
                }}
              />

              {/* Display Current Message */}
              <div style={{ width: '100%', textAlign: 'center', padding: '0 10px', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messages.length + (isTyping ? '-typing' : '')}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '1.4',
                      color: isTyping ? 'rgba(255,255,255,0.4)' : lastMessage?.sender === 'user' ? 'rgba(255,255,255,0.6)' : 'white'
                    }}
                  >
                    {isListening ? "Listening..." : (isTyping ? "Thinking..." : lastMessage?.text)}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Controls */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginTop: 'auto', zIndex: 10 }}>
              
              {/* Text Input Overlay */}
              <AnimatePresence>
                {showKeyboard && (
                  <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onSubmit={handleSend} 
                    style={{ width: '100%', padding: '0 10px', position: 'relative' }}
                  >
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type to chat..."
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '24px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'white',
                        outline: 'none',
                        fontSize: '14px',
                        opacity: input ? 1 : 0.8,
                        transition: 'all 0.3s'
                      }}
                    />
                    {input && (
                      <button type="submit" disabled={isTyping} style={{ position: 'absolute', right: '16px', top: '8px', background: '#a3e635', border: 'none', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Send size={14} color="#050505" />
                      </button>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Action Buttons Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 20px', marginTop: '4px' }}>
                {/* Keyboard / Log Toggle */}
                <button 
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: showKeyboard ? '#a3e635' : 'rgba(255,255,255,0.5)', transition: 'color 0.3s' }}
                >
                  <Keyboard size={18} />
                </button>

                {/* Big Mic Button */}
                <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }} 
                    transition={{ repeat: Infinity, duration: 2 }} 
                    style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '1px solid #a3e635' }} 
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.6, 1], opacity: [0.1, 0, 0.1] }} 
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} 
                    style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '1px solid #a3e635' }} 
                  />
                  <button 
                    onClick={() => {
                      if(!input.trim()) {
                        if (isListening) {
                          stopListening();
                        } else if (!isTyping) {
                          startListening();
                        }
                      } else {
                        handleSend();
                      }
                    }}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', background: isListening ? '#ef4444' : '#a3e635', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: isListening ? '0 4px 15px rgba(239, 68, 68, 0.4)' : '0 4px 15px rgba(163, 230, 53, 0.3)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="22"></line>
                    </svg>
                  </button>
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => setIsOpen(false)} 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', transition: 'background 0.3s' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (to open chat) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#a3e635',
              color: '#050505',
              border: 'none',
              boxShadow: '0 10px 25px rgba(163, 230, 53, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9998
            }}
          >
            <Bot size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
