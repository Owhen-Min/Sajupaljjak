import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
        >
          {!message.isMine && (
            <div className="flex-shrink-0 mr-2">
              <img
                src={message.profileImage}
                alt="프로필"
                className="w-10 h-10 rounded-full"
              />
            </div>
          )}
          <div className={`flex flex-col ${message.isMine ? 'items-end' : 'items-start'}`}>
            {!message.isMine && (
              <span className="text-sm text-gray-600 mb-1">{message.nickName}</span>
            )}
            <div
              className={`rounded-lg p-3 break-words ${
                message.isMine
                  ? 'bg-blue-500 text-white ml-auto max-w-[80%]'
                  : 'bg-gray-200 text-black max-w-[70%]'
              }`}
              style={{ wordBreak: 'break-word' }}
            >
              {message.message}
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {message.sentAt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
