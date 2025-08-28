import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from './components/Header';
import ComparisonForm from './components/ComparisonForm';
import ComparisonResults from './components/ComparisonResults';
import LoadingSpinner from './components/LoadingSpinner';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 12px;
  margin: 20px 0;
  text-align: center;
  font-weight: 500;
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCompare = async (comparisonData) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post('/api/compare', comparisonData);
      setResults(response.data);
    } catch (err) {
      setError('Sorry, there was an error processing your comparison. Please try again.');
      console.error('Comparison error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <AppContainer>
      <Container>
        <Header />
        <ComparisonForm onCompare={handleCompare} onReset={handleReset} />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {isLoading && <LoadingSpinner />}
        
        {results && <ComparisonResults results={results} />}
      </Container>
    </AppContainer>
  );
}

export default App;