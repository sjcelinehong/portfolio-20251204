// src/components/Monitor.jsx
import React, { useState, useMemo } from 'react';
import Folder from './Folder';

const Monitor = () => {
  const [expanded, setExpanded] = useState(false);

  // Generate 5 random positions for the folders
  // We use useMemo so they don't jump around on re-renders
  const folderData = useMemo(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#5227FF'];
    
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      // Random positions within the screen (10% to 80%)
      top: `${Math.random() * 60 + 20}%`, 
      left: `${Math.random() * 70 + 10}%`,
      // Random rotation (-30deg to 30deg)
      rotation: Math.random() * 60 - 30,
      size: 1.2
    }));
  }, []);

  const toggleScreen = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={`monitor-container ${expanded ? 'expanded' : ''}`}
      onClick={toggleScreen}
    >
      <div className="monitor-screen">
        {!expanded && (
          <div className="monitor-hint">Click Main</div>
        )}
        
        {/* Only show folders when screen is expanded */}
        {expanded && folderData.map((data) => (
          <Folder
            key={data.id}
            color={data.color}
            size={data.size}
            style={{
              top: data.top,
              left: data.left,
              transform: `rotate(${data.rotation}deg)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Monitor;