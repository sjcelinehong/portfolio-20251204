// src/components/ContentPage.js
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ContentContainer = styled(motion.div)`
  position: fixed; /* 전체 화면을 덮기 위해 fixed 사용 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  color: #333;
  overflow-y: scroll; /* 스크롤 가능 */
  z-index: 100; /* 데스크탑 위로 오도록 */
  padding: 50px;
  box-sizing: border-box;
`;

const Section = styled.section`
  min-height: 80vh; /* 각 섹션이 스크롤을 유발하도록 충분한 높이 */
  margin-bottom: 50px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const ContentPage = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        // 스크롤이 거의 끝에 도달했는지 확인 (오차 범위 50px)
        if (scrollHeight - scrollTop - clientHeight < 50) {
          console.log('Scroll end detected, navigating back to desktop.');
          // 스크롤이 끝난 후 약간의 딜레이를 주어 사용자가 내용을 완전히 볼 수 있게 함
          setTimeout(() => navigate('/'), 1000); 
        }
      }
    };

    const currentContent = contentRef.current;
    if (currentContent) {
      currentContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentContent) {
        currentContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [navigate]);

  return (
    <ContentContainer
      initial={{ scale: 0.5, opacity: 0 }} // 모니터에서 확대되는 느낌
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={contentRef}
    >
      <h1>Comprehensive Project Overview</h1>
      <p>Welcome to a detailed look into my work and design philosophy.</p>

      <Section id="intro">
        <h2>Introduction</h2>
        <p>This section outlines my professional journey and core competencies...</p>
        <p>... (더 많은 내용) ...</p>
      </Section>

      <Section id="project-highlights">
        <h2>Key Projects Highlights</h2>
        <p>Discover some of my most impactful projects and their outcomes.</p>
        <p>... (더 많은 내용) ...</p>
      </Section>

      <Section id="design-philosophy">
        <h2>My Design Philosophy</h2>
        <p>Understanding the principles that drive my creative process.</p>
        <p>... (더 많은 내용) ...</p>
      </Section>

      <Section id="conclusion" style={{ marginBottom: '20vh' }}> {/* 스크롤 끝 감지를 위해 여유 높이 */}
        <h2>Thank You!</h2>
        <p>I appreciate your time. This page will automatically return to the main desktop in a moment.</p>
      </Section>
    </ContentContainer>
  );
};

export default ContentPage;