import { useNavigate } from 'react-router-dom';

export const FortuneButton = ({ content, url }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <button 
      onClick={handleClick}
      className="w-2/5 py-4 px-11 bg-white text-black border-2 border-black rounded-lg hover:bg-gray-100 transition-colors duration-200 text-xl font-medium font-gapyeong"
    >
      {content}
    </button>
  );
};

export default FortuneButton;
