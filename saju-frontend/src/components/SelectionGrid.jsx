import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${props => props.isSelected ? '#4CAF50' : 'white'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isSelected ? '#45a049' : '#f5f5f5'};
  }
`;

// ... existing code ...

const SelectionGrid = ({ rows, cols, multiSelect, options, onSelect, showSelectAll }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    
    const handleClick = (index) => {
      if (multiSelect) {
        setSelectedItems(prev => {
          if (prev.includes(index)) {
            return prev.filter(item => item !== index);
          }
          return [...prev, index];
        });
      } else {
        setSelectedItems([index]);
      }
      
      onSelect(index);
    };
  
    const handleSelectAll = () => {
      if (selectedItems.length === options.length) {
        // 모든 항목이 선택된 경우, 전체 선택 해제
        setSelectedItems([]);
        onSelect([]);
      } else {
        // 전체 선택
        const allIndices = Array.from({ length: options.length }, (_, i) => i);
        setSelectedItems(allIndices);
        onSelect(allIndices);
      }
    };
  
    return (
      <div>
        {showSelectAll && multiSelect && (
          <Button
            isSelected={selectedItems.length === options.length}
            onClick={handleSelectAll}
            style={{ marginBottom: '10px', width: '100%' }}
          >
            전체 선택
          </Button>
        )}
        <Grid cols={cols}>
          {Array(rows * cols).fill(null).map((_, index) => (
            options[index] && (
              <Button
                key={index}
                isSelected={selectedItems.includes(index)}
                onClick={() => handleClick(index)}
              >
                {options[index]}
              </Button>
            )
          ))}
        </Grid>
      </div>
    );
  };
  
  SelectionGrid.propTypes = {
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    multiSelect: PropTypes.bool,
    options: PropTypes.array,
    onSelect: PropTypes.func,
    showSelectAll: PropTypes.bool
  };
  
  SelectionGrid.defaultProps = {
    multiSelect: false,
    options: [],
    onSelect: () => {},
    showSelectAll: false
  };
  

export default SelectionGrid;
