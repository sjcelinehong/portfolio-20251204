import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Desktop from './components/Desktop';
import ContentPage from './components/ContentPage';
import FolderExplorer from './components/FolderExplorer';
import './App.css'; 

function AppWrapper() {
  const location = useLocation(); 
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Desktop />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/folder" element={<FolderExplorer />} />
        {/* 추가적인 프로젝트 상세 페이지 라우트도 여기에 추가 가능 */}
        <Route path="/project/:id" element={<div>Project Detail Page</div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;