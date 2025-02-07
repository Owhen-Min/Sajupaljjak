import { useNavigate } from 'react-router-dom';
import React from 'react';

export const FortuneButton = ({ content, url }) => {
  const navigate = useNavigate();
  const words = content.split(' ');
  const handleClick = () => {
    navigate(url);
  };

  return (
    <button 
      onClick={handleClick}
      className="w-1/3 py-4 bg-white text-black border-2 border-black rounded-lg hover:bg-gray-100 transition-colors duration-200 text-2xl font-medium font-gapyeong"
      aria-label={content}
    >
      {words.map((word, index) => (
        <span key={index}>
          {word}
          {index < words.length - 1 && <br />}
        </span>
      ))}
    </button>
  );
};

export default FortuneButton;
