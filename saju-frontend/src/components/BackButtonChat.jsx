import { useNavigate } from "react-router-dom";
import { usePatch } from "../hooks/useApi";

export const BackButtonChat = ({ url, className, payload }) => {
  const navigate = useNavigate();

	const mutation = usePatch();
	
	const handleClick = () => {
    mutation.mutate({ uri: "/api/chats", payload },
      {
        onSuccess: () => {
          if (url) {
            navigate(url);
          } else {
            navigate(-1);
          }
        },
        onError: (error) => {
          console.error("PATCH 요청 실패:", error);
          alert("요청을 처리하는 중 문제가 발생했습니다.");
        },
      }
    );
  };


  return (
    <button
      onClick={handleClick}
      className={`
        w-[10%] aspect-square 
        flex items-center justify-center
        text-gray-600
        border border-gray-300 
        rounded-lg
        bg-white
        box-border
        transition-all duration-300 ease-in-out
        hover:bg-gray-100
        focus:outline-none focus:border-[#ff6842] focus:ring-2 focus:ring-[#4CAF50]/20
        absolute left-2 ${className}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default BackButtonChat;
