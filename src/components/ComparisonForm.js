import React, { useState } from 'react';
import styled from 'styled-components';

const FormCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  margin-bottom: 30px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 25px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CompareButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 200px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResetButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #5a6268;
  }
`;

const categories = [
  { value: '', label: 'General Comparison' },
  { value: 'smartphones', label: 'Smartphones' },
  { value: 'cars', label: 'Cars' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'programming languages', label: 'Programming Languages' },
  { value: 'software tools', label: 'Software Tools' },
  { value: 'food', label: 'Food' },
  { value: 'travel destinations', label: 'Travel Destinations' },
  { value: 'books', label: 'Books' },
  { value: 'movies', label: 'Movies' },
  { value: 'games', label: 'Games' },
  { value: 'sports', label: 'Sports' },
  { value: 'cryptocurrencies', label: 'Cryptocurrencies' },
];

function ComparisonForm({ onCompare, onReset }) {
  const [formData, setFormData] = useState({
    itemA: '',
    itemB: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.itemA.trim() && formData.itemB.trim()) {
      onCompare({
        itemA: formData.itemA.trim(),
        itemB: formData.itemB.trim(),
        category: formData.category || null
      });
    }
  };

  const handleReset = () => {
    setFormData({ itemA: '', itemB: '', category: '' });
    onReset();
  };

  const isFormValid = formData.itemA.trim() && formData.itemB.trim();

  return (
    <FormCard>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="itemA">First Item:</Label>
            <Input
              type="text"
              id="itemA"
              name="itemA"
              value={formData.itemA}
              onChange={handleInputChange}
              placeholder="e.g., iPhone 15, Tesla Model 3, Python"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="itemB">Second Item:</Label>
            <Input
              type="text"
              id="itemB"
              name="itemB"
              value={formData.itemB}
              onChange={handleInputChange}
              placeholder="e.g., Samsung Galaxy S23, BMW i4, JavaScript"
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <Label htmlFor="category">Category (optional):</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>
        </FormGroup>

        <ButtonRow>
          <CompareButton 
            type="submit" 
            disabled={!isFormValid}
          >
            🚀 Compare Now
          </CompareButton>
          <ResetButton type="button" onClick={handleReset}>
            🔄 Reset
          </ResetButton>
        </ButtonRow>
      </form>
    </FormCard>
  );
}

export default ComparisonForm;