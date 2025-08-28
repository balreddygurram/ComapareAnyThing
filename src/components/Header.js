import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const PoweredBy = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 5px;
`;

function Header() {
  return (
    <HeaderContainer>
      <Title>🔍 AI Comparison Tool</Title>
      <Subtitle>Compare anything using AI - products, concepts, ideas, and more!</Subtitle>
      <PoweredBy>⚡ Lightning-fast, intelligent comparisons</PoweredBy>
    </HeaderContainer>
  );
}

export default Header;