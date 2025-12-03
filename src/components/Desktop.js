// src/components/Desktop.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components'; // styled-components 사용 예시

// 스타일 컴포넌트 정의 (선택 사항, 일반 CSS 사용 가능)
const DesktopContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/images/office-background.jpg'); /* 실제 배경 이미지 경로 */
  background-size: cover;
  background-position: center;
  overflow: hidden;
  position: relative;
`;

const Desk = styled(motion.div)`
  width: 80%;
  height: 60%;
  background-color: #4a3a2e; /* 책상 색상 */
  border-radius: 10px;
  position: absolute;
  bottom: 5%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
`;

const MonitorsWrapper = styled(motion.div)`
  display: flex;
  gap: 20px;
  position: absolute;
  top: 30%; /* 책상 위 위치 조정 */
  z-index: 10;
`;

const Monitor = styled(motion.div)`
  width: 250px;
  height: 150px;
  background-color: #222;
  border: 5px solid #000;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
  font-size: 1.2em;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

const Desktop = () => {
  const navigate = useNavigate();

  // 모니터 애니메이션 variants
  const monitorVariants = {
    initial: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    // 클릭 시 확대되는 효과는 각 페이지 컴포넌트에서 담당
  };

  return (
    <DesktopContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 책상 위에 종이들 (CSS로 위치 및 스타일링) */}
      <div className="paper paper-left" />
      <div className="paper paper-right" />

      <Desk /> {/* 책상 */}

      <MonitorsWrapper>
        {/* 왼쪽 화면 */}
        <Monitor
          variants={monitorVariants}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/content')}
        >
          Project Overview
        </Monitor>

        {/* 가운데 화면 */}
        <Monitor
          variants={monitorVariants}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/folder')}
        >
          My Projects
        </Monitor>

        {/* 오른쪽 화면 (추가 구현 필요) */}
        <Monitor
          variants={monitorVariants}
          whileHover={{ scale: 1.05 }}
          onClick={() => alert('Contact Me!')} // 임시 알림
        >
          Contact Info
        </Monitor>
      </MonitorsWrapper>
    </DesktopContainer>
  );
};

export default Desktop;