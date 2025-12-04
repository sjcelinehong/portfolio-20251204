// App.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import Overlay from './Overlay';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      {/* 3D Scene */}
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      
      {/* 2D HTML Interface */}
      <Overlay />
    </div>
  );
}

export default App;