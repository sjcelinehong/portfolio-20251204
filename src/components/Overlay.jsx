// Overlay.jsx
import React, { useRef } from 'react';
import { useStore } from './modules/store';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---

// 1. 왼쪽 화면: 스크롤 컨텐츠
const LeftScreenContent = () => {
  const { setView } = useStore();
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    // 스크롤이 끝에 도달했는지 확인 (여유값 10px)
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 10) {
      setView('main'); // 메인으로 복귀
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }} // 카메라 줌인 후 나타남
      ref={scrollRef}
      onScroll={handleScroll}
      className="absolute inset-0 bg-white text-black p-10 overflow-y-auto"
      style={{ pointerEvents: 'auto' }}
    >
      <h1 className="text-4xl font-bold mb-4">Project Documentation</h1>
      <p className="mb-4">Scroll down to read...</p>
      {/* 긴 컨텐츠 생성 */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="mb-10 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold">Chapter {i + 1}</h2>
            <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
        </div>
      ))}
      <div className="h-20 flex items-center justify-center text-gray-400">
        <p>End of Document (Returning to Main...)</p>
      </div>
    </motion.div>
  );
};

// 2. 중앙 화면: 폴더 컴포넌트
const Folder = ({ title, rotation, x, y, onNavigate }) => {
    return (
        <div 
            className="absolute w-48 h-32 group cursor-pointer"
            style={{ 
                left: `${x}%`, 
                top: `${y}%`, 
                transform: `rotate(${rotation}deg)` 
            }}
        >
            {/* Folder Tab (Back) */}
            <div className="absolute top-0 left-0 w-full h-full bg-yellow-600 rounded-lg shadow-lg transition-transform group-hover:scale-105" />
            
            {/* Folder Front (열리는 효과) */}
            <div className="absolute top-2 left-0 w-full h-full bg-yellow-500 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 group-hover:translate-y-4 group-hover:translate-x-2">
                <span className="font-bold text-yellow-900">{title}</span>
                
                {/* Hover Menu Overlay */}
                <div className="absolute inset-0 bg-black/80 text-white opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center space-y-2 rounded-lg transition-opacity duration-300 text-xs">
                    <button onClick={(e) => { e.stopPropagation(); onNavigate('image'); }} className="hover:text-yellow-400">이미지 보기</button>
                    <button onClick={(e) => { e.stopPropagation(); onNavigate('overview'); }} className="hover:text-yellow-400">개요 보기</button>
                    <button onClick={(e) => { e.stopPropagation(); onNavigate('project'); }} className="hover:text-yellow-400">프로젝트 보러가기</button>
                </div>
            </div>
        </div>
    );
};

// 3. 중앙 화면: 컨텐츠 컨테이너
const CenterScreenContent = () => {
    const { setView } = useStore();
    const containerRef = useRef(null);

    // 해당 섹션으로 스크롤 이동 함수
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute inset-0 bg-[#001f3f] overflow-hidden" // Dark Blue Background
            style={{ pointerEvents: 'auto' }}
        >
            {/* Close Button */}
            <button 
                onClick={() => setView('main')}
                className="absolute top-4 right-4 z-50 text-white bg-white/20 px-4 py-2 rounded-full hover:bg-white/40"
            >
                Close X
            </button>

            {/* Scrollable Container */}
            <div ref={containerRef} className="w-full h-full overflow-y-auto relative scroll-smooth">
                
                {/* Section 1: Folders Area (100vh) */}
                <div className="w-full h-full relative" id="folder-area">
                    <h2 className="absolute top-10 left-10 text-white text-3xl font-light">My Projects</h2>
                    
                    {/* 어지럽게 흩어진 폴더들 */}
                    <Folder title="Project A" rotation={15} x={20} y={30} onNavigate={scrollToSection} />
                    <Folder title="Project B" rotation={-10} x={50} y={20} onNavigate={scrollToSection} />
                    <Folder title="Project C" rotation={5} x={70} y={50} onNavigate={scrollToSection} />
                    <Folder title="Project D" rotation={-20} x={30} y={60} onNavigate={scrollToSection} />
                    <Folder title="Project E" rotation={10} x={60} y={70} onNavigate={scrollToSection} />
                </div>

                {/* Section 2: Details Sections */}
                <div className="w-full min-h-screen bg-slate-900 text-white p-20" id="image">
                    <h3 className="text-4xl mb-10">Project Images</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-64 bg-gray-700 rounded"></div>
                        <div className="h-64 bg-gray-700 rounded"></div>
                    </div>
                </div>

                <div className="w-full min-h-screen bg-slate-800 text-white p-20" id="overview">
                    <h3 className="text-4xl mb-10">Project Overview</h3>
                    <p className="text-lg leading-relaxed">
                        Detailed explanation of the project architecture, tech stack, and challenges faced during development.
                    </p>
                </div>

                <div className="w-full min-h-screen bg-slate-900 text-white p-20" id="project">
                    <h3 className="text-4xl mb-10">Live Project</h3>
                    <div className="p-10 border border-white/20 rounded-xl text-center">
                        <a href="#" className="text-2xl text-blue-400 hover:underline">Launch Live Demo -</a>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};


export default function Overlay() {
  const { view } = useStore();

  return (
    <AnimatePresence>
      {/* 3D 화면 위에 띄울 Fullscreen 오버레이들 */}
      
      {view === 'left' && (
         <div className="absolute inset-0 z-10">
            <LeftScreenContent />
         </div>
      )}

      {view === 'center' && (
         <div className="absolute inset-0 z-10">
            <CenterScreenContent />
         </div>
      )}
    </AnimatePresence>
  );
}