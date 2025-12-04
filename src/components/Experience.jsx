// Experience.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from './modules/store';
import * as THREE from 'three';
import { easing } from 'maath'; // @react-three/drei에 포함된 유틸

const Monitor = ({ position, rotation, onClick, color = "#333", label }) => {
  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      {/* 모니터 프레임 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.9, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* 화면 (발광) */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

export default function Experience() {
  const { view, setView } = useStore();
  
  // 카메라 제어
  useFrame((state, delta) => {
    const camera = state.camera;
    let targetPos = new THREE.Vector3(0, 2, 5); // Main View Position
    let targetLook = new THREE.Vector3(0, 0, 0); // Main View LookAt

    if (view === 'left') {
      targetPos.set(-1.8, 0.5, 1.2); // 왼쪽 모니터 바로 앞
      targetLook.set(-1.8, 0.5, 0);
    } else if (view === 'center') {
      targetPos.set(0, 0.5, 1.2); // 중앙 모니터 바로 앞
      targetLook.set(0, 0.5, 0);
    }

    // 부드러운 카메라 이동
    easing.damp3(camera.position, targetPos, 0.5, delta);
    
    // LookAt을 부드럽게 처리하기 위한 더미 벡터 사용 권장되으나, 약식으로 처리
    const currentLook = new THREE.Vector3(0,0,-10).applyQuaternion(camera.quaternion).add(camera.position);
    easing.damp3(currentLook, targetLook, 0.5, delta);
    camera.lookAt(currentLook);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} shadow-mapSize={2048} castShadow />

      {/* 책상 (가상의 박스) */}
      <mesh position={[0, -1, 0]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[5, 0.2, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* 왼쪽 모니터 */}
      <Monitor 
        position={[-1.8, 0.5, 0]} 
        rotation={[0, 0.3, 0]} 
        color={view === 'left' ? "black" : "#white"} // 줌인되면 화면 꺼짐(HTML이 덮음)
        onClick={(e) => { e.stopPropagation(); setView('left'); }} 
      />

      {/* 중앙 모니터 */}
      <Monitor 
        position={[0, 0.5, 0]} 
        rotation={[0, 0, 0]} 
        color={view === 'center' ? "#001f3f" : "white"} 
        onClick={(e) => { e.stopPropagation(); setView('center'); }} 
      />

      {/* 오른쪽 모니터 (장식용) */}
      <Monitor 
        position={[1.8, 0.5, 0]} 
        rotation={[0, -0.3, 0]} 
        color="#333" 
        onClick={() => {}} 
      />

      {/* 종이들 (장식) */}
      <mesh position={[-0.5, -0.85, 0.8]} rotation={[-1.6, 0, 0.2]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}