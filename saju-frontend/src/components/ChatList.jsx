import { useNavigate } from "react-router-dom";
import SajuUserBubble from "./SajuUserBubble";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";

const ChatList = ({ chats }) => {
  const navigate = useNavigate();
  const [openChatId, setOpenChatId] = useState(null);

  function formatRelativeTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 30) {
      return `${diffInDays}일 전`;
    } else {
      return dateString;
    }
  }

  const handleChatClick = (chatRoomId) => {
    navigate(`/chats/${chatRoomId}`); // 채팅방으로 이동
  };

  const renderSwipeableChat = (chatRoomId, chatData) => {
    const [isDragging, setIsDragging] = useState(false);

    const swipeHandlers = useSwipeable({
      onSwipeStart: () => {
        setIsDragging(true);
        if (openChatId && openChatId !== chatRoomId) {
          const prevElement = document.getElementById(`chat-content-${openChatId}`);
          if (prevElement) {
            prevElement.style.transform = 'translateX(0)';
          }
        }
      },
      onSwipedLeft: () => {
        const element = document.getElementById(`chat-content-${chatRoomId}`);
        if (element) {
          element.style.transform = 'translateX(-80px)';
        }
        setOpenChatId(chatRoomId);
      },
      
      onTouchEndOrOnMouseUp: () => {
        setTimeout(() => {
          setIsDragging(false);
        }, 100);
      },
      trackMouse: true
    });

    return (
      <div key={chatRoomId} className="relative flex flex-col">
        <div className="relative w-full">
          <div className="absolute right-0 top-0 h-full">
            <div className="goout-button h-full w-20 bg-red-500 flex items-center justify-center">
              <span className="text-white font-medium">나가기</span>
            </div>
          </div>
          <div
            {...swipeHandlers}
            id={`chat-content-${chatRoomId}`}
            className="w-full chat-card flex items-center bg-white pl-3 py-5 border border-gray-200 cursor-pointer opacity-100 hover:bg-gray-50 transition transform duration-200 ease-in-out gap-x-3 overflow-x-hidden select-none"
            onClick={() => !isDragging && handleChatClick(chatRoomId)}
          >
            <div className="flex w-2/12 justify-center items-center">
              <img
                src={chatData.chatRoom.partner.profileImage}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover object-center"
              />
            </div>
            <div className="flex w-7/12 flex-col gap-y-1">  
              <div className="flex items-center gap-x-2">
                <SajuUserBubble skyElement={chatData.chatRoom.partner.celestialStem} size="normal" />
                <h3 className="text-xl font-semibold">{chatData.chatRoom.partner.nickname}</h3>
              </div>
              <p className="w-full truncate text-gray-700 ml-1">
                {chatData.message.lastMessage}
              </p>
            </div>
            <div className="flex w-2/12 flex-col items-end gap-y-2">
              <span className="text-sm text-gray-500">
                {formatRelativeTime(chatData.message.lastSendTime)}
              </span>
              <span className={`text-sm text-white bg-red-500 h-7 w-7 rounded-full py-1 text-center ${chatData.message.newMessageCount > 0 ? 'block' : 'opacity-0'}`}>
                {chatData.message.newMessageCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {Object.entries(chats[0])
        .sort(([, a], [, b]) => new Date(b.message.lastSendTime) - new Date(a.message.lastSendTime))
        .map(([chatRoomId, chatData]) => renderSwipeableChat(chatRoomId, chatData))}
    </div>
  );
};

export default ChatList;
