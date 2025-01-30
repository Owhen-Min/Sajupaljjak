import styled from 'styled-components';

export const StyledInput = styled.input`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  margin: 10px 0;
  transition: all 0.3s ease;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #ff6842;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const StyledButton = styled.button`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ff6842;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;

  &:hover {
    background-color: #ff6842;
  }
`; 