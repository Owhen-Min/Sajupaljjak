import React from "react";

const MessageItem = ({ message, sentAt, isMine, profileImage, nickName }) => {
  return (
    <div className="">
      {!isMine ? (
        // 상대가 보낸 메세지
        <div className="flex gap-2 bg-gray-200">
          <img src={profileImage} alt="사진" className="w-10 h-10" />
          <span> {nickName} </span>
          <span> {message} </span>
          <span> {sentAt} </span>
        </div>
      ) : (
        //  내가 보낸 메세지
        <div className="flex gap-2">
          <span> {sentAt} </span>
          <span> {message} </span>
          <span> {nickName} </span>
          <img src={profileImage} alt="사진" className="w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
