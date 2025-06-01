import { useNavigate } from 'react-router-dom';
import React from 'react';

export const FortuneButton = ({ content, url, size = 'medium' }) => {
  const navigate = useNavigate();
  const words = content.split(' ');
  const handleClick = () => {
    navigate(url);
  };

  const sizeClasses = {
    small: 'w-1/4 py-2 text-xl',
    medium: 'w-1/3 py-4 text-2xl',
    large: 'w-1/2 py-6 text-3xl'
  };

  return (
    <button 
      onClick={handleClick}
      className={`${sizeClasses[size]} bg-white border-2 border-black rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium font-gapyeong text-black-200`}
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
