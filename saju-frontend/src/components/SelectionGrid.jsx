import React, { useState, useEffect } from 'react';
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
  background-color: ${props => props.$isSelected ? '#ff5226' : 'white'};
  color: ${props => props.$isSelected ? 'white' : 'black'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$isSelected ? '#ff5226' : '#f5f5f5'};
  }
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#FF0000' : 'white'};
  color: ${props => props.selected ? 'white' : 'black'};

  &:hover {
    background-color: ${props => props.selected ? '#FF0000' : '#f5f5f5'};
  }
`;

const SelectionGrid = ({ 
  rows, 
  cols, 
  multiSelect = false,
  options = [],
  onSelect = () => {},
  showSelectAll = false,
  selected = []
}) => {
    const [selectedItems, setSelectedItems] = useState(
      Array.isArray(selected) ? selected : [options.indexOf(selected)]
    );
    
    useEffect(() => {
      setSelectedItems(
        Array.isArray(selected) ? selected : [options.indexOf(selected)]
      );
    }, [selected, options]);

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
        onSelect(options[index]);
      }
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
            $isSelected={selectedItems.length === options.length}
            onClick={handleSelectAll}
            style={{ marginBottom: '10px', width: '100%' }}
          >
            전체 선택
          </Button>
        )}
        <Grid cols={cols}>
          {options.map((option, index) => (
            <GridItem
              key={index}
              selected={selectedItems.includes(index)}
              onClick={() => handleClick(index)}
            >
              {option}
            </GridItem>
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
    showSelectAll: PropTypes.bool,
    selected: PropTypes.array
  };
  

export default SelectionGrid;
