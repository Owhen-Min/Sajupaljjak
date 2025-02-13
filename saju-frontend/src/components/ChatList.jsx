import React from "react";
import { useNavigate } from "react-router-dom";

const ChatList = ({ chats }) => {
  const navigate = useNavigate();

  const handleChatClick = (chatRoomId) => {
    navigate(`/chat/${chatRoomId}`); // 채팅방으로 이동
  };

  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat.chatRoomId}
          className="chat-card bg-white p-4 mb-4 rounded-lg shadow cursor-pointer opacity-90 hover:opacity-100 transition"
          onClick={() => handleChatClick(chat.chatRoomId)}
        >
          <div className="flex items-end gap-2 mb-2">
            <img
              src={chat.partner.profileImage}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <h3 className="text-lg font-semibold">{chat.partner.nickname}</h3>
          </div>
          <p className="text-gray-700 line-clamp-2">
            {chat.message.lastMessage}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {chat.message.newMessageCount > 0
                ? ` ${chat.message.newMessageCount}`
                : ""}
            </span>
            <span className="text-sm text-gray-500">
              {chat.message.lastSendTime}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
