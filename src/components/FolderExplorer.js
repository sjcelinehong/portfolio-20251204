// src/components/FolderExplorer.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
// 새로 제공받은 Folder 컴포넌트 import
import Folder from './Overlay'; 
import './Folder.css'; // Folder 컴포넌트의 필수 CSS 파일 import

// (Styled Components 정의는 이전과 동일)
const FolderExplorerContainer = styled(motion.div)`
  // ... (이전과 동일) ...
`;

const CloseButton = styled.button`
  // ... (이전과 동일) ...
`;

const projectsData = [
  // 여기에 각 폴더에 들어갈 프로젝트 데이터를 정의
  { id: 'proj1', title: 'UX Design', url: '/project/ux-design', color: '#FF7043' },
  { id: 'proj2', title: 'E-commerce', url: '/project/ecommerce', color: '#1E88E5' },
  { id: 'proj3', title: 'Mobile App', url: '/project/mobile-app', color: '#4CAF50' },
  { id: 'proj4', title: 'Branding', url: '/project/branding', color: '#FDD835' },
  { id: 'proj5', title: 'Data Viz', url: '/project/data-viz', color: '#9C27B0' },
];

/**
 * 프로젝트 폴더 컴포넌트
 * 폴더 내부의 종이(papers) 역할을 프로젝트 메뉴 항목으로 대체합니다.
 */
const ProjectFolder = ({ project, onCloseExplorer }) => {
  const navigate = useNavigate();

  // 폴더 내부 종이에 들어갈 메뉴 컴포넌트
  const ProjectMenuItems = ({ title, option, onClick }) => (
    <div 
        className="folder-menu-item" 
        onClick={onClick}
        // 폴더가 닫힐 때 클릭을 방지하기 위해 is-open 상태를 사용해야 하지만, 
        // Folder 컴포넌트의 open 상태에 따라 종이가 움직이므로,
        // 이곳에서는 메뉴 아이템의 디자인 역할만 담당
    >
        {title} ({option})
    </div>
  );

  const handleMenuClick = (url, option) => (e) => {
    // 폴더 클릭 이벤트와 버블링 충돌 방지
    e.stopPropagation(); 
    
    // 폴더 탐색기 닫고 상세 페이지로 이동
    onCloseExplorer(); 
    
    if (option === 'image') {
        alert(`Viewing images for ${project.title}. Navigating to ${url}`);
        navigate(url + '/images');
    } else if (option === 'overview') {
        alert(`Viewing overview for ${project.title}. Navigating to ${url}`);
        navigate(url + '#overview'); 
    } else if (option === 'project') {
        navigate(url);
    }
  };


  // 폴더가 어지럽게 배치되도록 무작위 위치/회전 계산 (이전 FolderExplorer.js 로직)
  const randomPositionAndRotation = {
    x: Math.random() * 60 - 30 + '%', 
    y: Math.random() * 60 - 30 + '%', 
    rotate: Math.random() * 20 - 10 + 'deg',
  };

  // Folder 컴포넌트의 'items' 배열에 메뉴 항목을 넣어줍니다.
  const menuItems = [
    <ProjectMenuItems 
        key="img" 
        title="🖼️ 이미지" 
        option="image" 
        onClick={handleMenuClick(project.url, 'image')}
    />,
    <ProjectMenuItems 
        key="ov" 
        title="📝 개요" 
        option="overview" 
        onClick={handleMenuClick(project.url, 'overview')}
    />,
    <ProjectMenuItems 
        key="proj" 
        title="🚀 보러가기" 
        option="project" 
        onClick={handleMenuClick(project.url, 'project')}
    />,
  ];

  return (
    <div 
        style={{
            position: 'absolute',
            left: `calc(50% + ${randomPositionAndRotation.x})`,
            top: `calc(50% + ${randomPositionAndRotation.y})`,
            transform: `translate(-50%, -50%) rotate(${randomPositionAndRotation.rotate})`,
            zIndex: 10
        }}
    >
        <Folder 
            color={project.color} 
            size={1.2} 
            items={menuItems} 
            className="project-folder-wrapper"
        >
             <div className="folder-title">{project.title}</div>
        </Folder>
    </div>
  );
};


const FolderExplorer = () => {
  const navigate = useNavigate();

  return (
    <FolderExplorerContainer
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CloseButton onClick={() => navigate('/')}>X</CloseButton>
      {projectsData.map((project) => (
        <ProjectFolder key={project.id} project={project} onCloseExplorer={() => navigate('/')} />
      ))}
    </FolderExplorerContainer>
  );
};

export default FolderExplorer;