import React from "react";

const MessageItem = ({ message, sentAt, isMine, profileImage, nickName }) => {
  return (
    <div className="p-2">
      {!isMine ? (
        // 상대가 보낸 메세지
        <div>
          <span className="text-xs"> {nickName} </span>
          <div className="flex gap-2 chat chat-start">
            <img
              src={profileImage}
              alt="사진"
              className="w-10 h-10 rounded-full"
            />
            <span className="chat-bubble text-sm"> {message} </span>
            <span className="text-xs text-gray-400"> {sentAt} </span>
          </div>
        </div>
      ) : (
        //  내가 보낸 메세지
        <div className="flex gap-2 chat chat-end">
          <span className="text-xs text-gray-400"> {sentAt} </span>
          {/* <span className="text-xs"> {nickName} </span> */}
          <span className="chat-bubble chat-bubble-warning text-sm">
            {" "}
            {message}{" "}
          </span>
          <img
            src={profileImage}
            alt="사진"
            className="w-10 h-10 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
