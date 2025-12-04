// src/components/Folder.jsx
import React, { useState } from 'react';

// Helper function to darken a HEX color by a percentage
const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#5227FF', size = 1, items = [], style = {} }) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paperColors = [
    darkenColor('#ffffff', 0.1),
    darkenColor('#ffffff', 0.05),
    '#ffffff'
  ];

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent clicking folder from closing monitor
    setOpen((prev) => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (index) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const getOpenTransform = (index) => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    return '';
  };

  return (
    <div 
      className="folder-wrapper" 
      style={{ ...style, transform: `${style.transform || ''} scale(${size})` }}
    >
      <div 
        className={`folder-group ${open ? 'open' : ''}`}
        onClick={handleClick}
      >
        {/* Folder Back */}
        <div className="folder-back" style={{ backgroundColor: folderBackColor }}>
          {/* Tab */}
          <span className="folder-tab" style={{ backgroundColor: folderBackColor }}></span>

          {/* Papers */}
          {papers.map((item, i) => {
            const width = i === 0 ? '70%' : i === 1 ? '80%' : '90%';
            const height = i === 0 ? '80%' : i === 1 ? (open ? '80%' : '70%') : (open ? '80%' : '60%');
            
            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                className={`folder-paper ${open ? 'open' : ''}`}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={() => handlePaperMouseLeave(i)}
                style={{
                  width,
                  height,
                  backgroundColor: paperColors[i],
                  transform: open ? transformStyle : undefined,
                  zIndex: 20 + i
                }}
              >
                {item}
              </div>
            );
          })}

          {/* Folder Front (Left Flap) */}
          <div
            className={`folder-flap flap-left ${open ? 'open' : ''}`}
            style={{ backgroundColor: color }}
          ></div>

          {/* Folder Front (Right Flap) */}
          <div
            className={`folder-flap flap-right ${open ? 'open' : ''}`}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;