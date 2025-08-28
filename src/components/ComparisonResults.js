import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-top: 20px;
`;

const ResultsHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  text-align: center;
`;

const HeaderTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 5px;
`;

const HeaderSubtitle = styled.p`
  opacity: 0.9;
  font-size: 1rem;
`;

const PriceComparison = styled.div`
  background: #e8f4fd;
  color: #0066cc;
  padding: 20px;
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ItemColumn = styled.div`
  padding: 25px;
  
  &:first-child {
    border-right: 2px solid #f0f0f0;
    
    @media (max-width: 768px) {
      border-right: none;
      border-bottom: 2px solid #f0f0f0;
    }
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #667eea;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
`;

const FeatureSection = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FeatureIcon = styled.span`
  color: ${props => props.type === 'pros' ? '#28a745' : props.type === 'cons' ? '#dc3545' : '#667eea'};
  font-weight: bold;
  margin-top: 2px;
`;

const RecommendationSection = styled.div`
  grid-column: 1 / -1;
  padding: 25px;
  background: #f8f9fa;
  border-top: 2px solid #f0f0f0;
`;

const RecommendationTitle = styled.h3`
  color: #667eea;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.3rem;
`;

const RecommendationText = styled.p`
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
`;

const SummaryTitle = styled.h4`
  margin-bottom: 10px;
  color: #333;
`;

const SummaryText = styled.p`
  line-height: 1.6;
  color: #666;
  font-style: italic;
`;

const EmptyState = styled.div`
  padding: 20px;
  text-align: center;
  color: #999;
  font-style: italic;
`;

function ComparisonResults({ results }) {
  if (!results) return null;

  const getFeatureIcon = (type) => {
    switch (type) {
      case 'pros': return '✓';
      case 'cons': return '✗';
      default: return '•';
    }
  };

  const renderFeatureList = (items, type = 'feature') => {
    if (!items || items.length === 0) {
      return (
        <EmptyState>No information available</EmptyState>
      );
    }

    return (
      <FeatureList>
        {items.map((item, index) => (
          <FeatureItem key={index}>
            <FeatureIcon type={type}>
              {getFeatureIcon(type)}
            </FeatureIcon>
            <span>{item}</span>
          </FeatureItem>
        ))}
      </FeatureList>
    );
  };

  return (
    <ResultsContainer>
      <ResultsHeader>
        <HeaderTitle>{results.itemA} vs {results.itemB}</HeaderTitle>
        {results.category && (
          <HeaderSubtitle>Category: {results.category}</HeaderSubtitle>
        )}
      </ResultsHeader>
      
      {results.priceComparison && results.priceComparison !== 'Price comparison unavailable' && (
        <PriceComparison>
          💰 {results.priceComparison}
        </PriceComparison>
      )}
      
      <ComparisonGrid>
        <ItemColumn>
          <ItemTitle>{results.itemA}</ItemTitle>
          
          <FeatureSection>
            <SectionTitle>🔧 Key Features</SectionTitle>
            {renderFeatureList(results.itemAFeatures)}
          </FeatureSection>
          
          <FeatureSection>
            <SectionTitle>👍 Pros</SectionTitle>
            {renderFeatureList(results.itemAPros, 'pros')}
          </FeatureSection>
          
          <FeatureSection>
            <SectionTitle>👎 Cons</SectionTitle>
            {renderFeatureList(results.itemAConsuments, 'cons')}
          </FeatureSection>
        </ItemColumn>

        <ItemColumn>
          <ItemTitle>{results.itemB}</ItemTitle>
          
          <FeatureSection>
            <SectionTitle>🔧 Key Features</SectionTitle>
            {renderFeatureList(results.itemBFeatures)}
          </FeatureSection>
          
          <FeatureSection>
            <SectionTitle>👍 Pros</SectionTitle>
            {renderFeatureList(results.itemBPros, 'pros')}
          </FeatureSection>
          
          <FeatureSection>
            <SectionTitle>👎 Cons</SectionTitle>
            {renderFeatureList(results.itemBCons, 'cons')}
          </FeatureSection>
        </ItemColumn>
        
        <RecommendationSection>
          <RecommendationTitle>🎯 Recommendation</RecommendationTitle>
          <RecommendationText>
            {results.recommendation || 'No specific recommendation available.'}
          </RecommendationText>
          
          {results.summary && (
            <>
              <SummaryTitle>📝 Summary</SummaryTitle>
              <SummaryText>
                {results.summary}
              </SummaryText>
            </>
          )}
        </RecommendationSection>
      </ComparisonGrid>
    </ResultsContainer>
  );
}

export default ComparisonResults;