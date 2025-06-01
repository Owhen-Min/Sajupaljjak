import React from "react";

const MessageItem = ({ message, sentAt, isMine, profileImage, nickName }) => {
  return (
    <div className="px-2 font-NanumR text-sm">
      {isMine ? (
        <div className="flex gap-x-2 items-center chat chat-end">
          <span className="text-xs text-gray-400">{sentAt}</span>
          <span className="bg-[#fe787d] text-white flex items-center chat-bubble chat-bubble-warning text-sm">
            {message}
          </span>
        </div>
      ) : (
        <div>
          {/* <span className="text-xs text-gray-400">{nickName}</span> */}
          <div className="flex gap-2 items-center chat chat-start">
            <img
              src={profileImage}
              alt="프로필"
              className="w-8 h-8 rounded-full"
            />
            <span className="bg-[#eaeaea] text-black flex items-center chat-bubble text-sm">
              {message}
            </span>
            <span className="text-xs text-gray-400">{sentAt}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageItem;
