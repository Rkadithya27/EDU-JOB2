import React from 'react';
import { useNavigate } from 'react-router-dom';

const QRTracker = ({ sessionId }) => {
  const navigate = useNavigate();
  // Using window.location.origin so it adapts to the local IP if accessed from mobile
  const trackingUrl = `${window.location.origin}/track/${sessionId}`;
  
  return (
    <div className="glass-panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>📱 Live Progress Tracker</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '12px', margin: '8px 0 16px 0' }}>
        Scan this dynamic QR code to securely track progress on mobile.
      </p>
      
      <div 
        onClick={() => navigate(`/track/${sessionId}`)}
        className="hover-scale"
        style={{ background: 'white', padding: '16px', borderRadius: '12px', display: 'inline-block', cursor: 'pointer', transition: 'transform 0.2s' }}
        title="Click to open tracker on desktop"
      >
        {/* Mock QR Code Image */}
        <img 
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(trackingUrl)}`} 
          alt="Dynamic QR Code" 
          width="150" 
          height="150"
        />
      </div>
      <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
        <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate(`/track/${sessionId}`)}>
          Click to Open Analytics
        </span>
      </div>
    </div>
  );
};

export default QRTracker;
