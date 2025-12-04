// src/components/Overlay.jsx
import React from 'react';
import Monitor from './Monitor';

const Overlay = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      
      {/* 
        Monitor Component 
        pointer-events: auto is handled inside the Monitor's CSS or we wrap it here 
      */}
      <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
        <Monitor />
      </div>

      {/* Header / Other UI elements */}
      <header style={{ position: 'absolute', top: 40, left: 40, color: 'white' }}>
        <h1>My Developer Desk</h1>
        <p>Interactive Portfolio</p>
      </header>
    </div>
  );
};

export default Overlay;