import React from "react";

import MessageItem from "./MessageItem";

const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col gap-5;">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
        >
          <MessageItem {...message} />
        </div>
      ))}


    </div>
  );
};

export default MessageList;
