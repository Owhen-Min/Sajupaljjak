import { useNavigate } from "react-router-dom";
import SajuUserBubble from "./SajuUserBubble";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { useDelete } from "../hooks/useApi";
const ChatList = ({ chats }) => {
  const navigate = useNavigate();
  const [openChatId, setOpenChatId] = useState(null);
  const deleteChat = useDelete();

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
          const prevElement = document.getElementById(
            `chat-content-${openChatId}`
          );
          if (prevElement) {
            prevElement.style.transform = "translateX(0)";
          }
        }
      },
      onSwipedLeft: () => {
        const element = document.getElementById(`chat-content-${chatRoomId}`);
        if (element) {
          element.style.transform = "translateX(-80px)";
        }
        setOpenChatId(chatRoomId);
      },

      onSwipedRight: () => {
        const element = document.getElementById(`chat-content-${chatRoomId}`);
        if (element) {
          element.style.transform = "translateX(0)";
        }
        setOpenChatId(chatRoomId);
      },

      onTouchEndOrOnMouseUp: () => {
        setTimeout(() => {
          setIsDragging(false);
        }, 100);
      },
      trackMouse: true,
    });

    return (
      <div
        key={chatRoomId}
        className="relative flex flex-col font-NanumR text-sm"
      >
        <div className="relative w-full">
          <div
            className="absolute right-0 top-0 goout-button h-full w-20 bg-red-500 flex items-center justify-center cursor-pointer"
            onClick={() => {
              deleteChat.mutate({ uri: `/chats/${chatRoomId}` });
            }}
          >
            <span className="text-white font-medium">나가기</span>
          </div>
          <div
            {...swipeHandlers}
            id={`chat-content-${chatRoomId}`}
            className=" w-full flex items-center bg-white pl-3 py-2 border-gray-200 cursor-pointer opacity-100 hover:bg-gray-50 transition transform duration-200 ease-in-out gap-x-3 overflow-x-hidden select-none"
            onClick={() => !isDragging && handleChatClick(chatRoomId)}
          >
            <div className="flex w-2/12 justify-center items-center">
              <img
                src={chatData.partner.profileImage}
                alt="profile"
                className="w-12 h-12 rounded-xl object-cover object-center"
              />
            </div>
            <div className="flex w-7/12 flex-col gap-y-1 py-1">
              <div className="flex items-center gap-x-2">
                <SajuUserBubble
                  skyElement={chatData.partner.celestialStem}
                  size="small"
                />
                <h3 className="text-base text-black font-bold">
                  {chatData.partner.nickname}
                </h3>
              </div>
              <p className="w-full truncate text-gray-700 ml-1">
                {chatData.message.lastMessage}
              </p>
            </div>
            <div className="flex w-2/12 flex-col items-end gap-y-2">
              <span className="text-sm text-gray-500">
                {formatRelativeTime(chatData.message.lastSendTime)}
              </span>
              <span
                className={`text-xs text-white bg-red-500 h-6 w-6 flex items-center justify-center rounded-full text-center ${
                  chatData.message.newMessageCount > 0 ? "block" : "opacity-0"
                }`}
              >
                {chatData.message.newMessageCount >= 100
                  ? "99+"
                  : chatData.message.newMessageCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const processChats = () => {
    if (!chats || Object.keys(chats).length === 0) return [];
    
    // 객체 형태로 들어오는 경우 처리
    if (!Array.isArray(chats)) {
      return Object.entries(chats).map(([_, chatData]) => ({
        chatRoomId: chatData.chatRoom.id,
        partner: chatData.chatRoom.partner,
        message: chatData.message
      }));
    }
    
    // 배열 형태로 들어오는 경우 처리
    return chats.map(chat => ({
      chatRoomId: chat.chatRoomId,
      partner: chat.partner,
      message: chat.message
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {processChats()
        .sort(
          (a, b) =>
            new Date(b.message.lastSendTime) - new Date(a.message.lastSendTime)
        )
        .map((chatData) =>
          renderSwipeableChat(chatData.chatRoomId, chatData)
        )}
    </div>
  );
};

export default ChatList;
