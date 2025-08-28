import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  margin: 20px 0;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 20px;
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 0.9rem;
  color: #888;
  font-style: italic;
`;

function LoadingSpinner() {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>🤖 AI is analyzing and comparing your items...</LoadingText>
      <SubText>This usually takes just a few seconds</SubText>
    </LoadingContainer>
  );
}

export default LoadingSpinner;