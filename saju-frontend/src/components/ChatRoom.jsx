import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatRoom = ({ chatId, user }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice", text: "안녕!", time: "10:32 AM" },
    { id: 2, sender: user.name, text: "안녕! 어떻게 지내?", time: "10:34 AM" },
  ]);
  const ws = (useRef < WebSocket) | (null > null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/chat");

    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = (text) => {
    if (ws.current && text.trim()) {
      const newMessage = {
        sender: user.name,
        text,
        time: new Date().toLocaleTimeString(),
      };
      ws.current.send(JSON.stringify(newMessage));
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader name="Alice" />
      <ChatMessages messages={messages} user={user} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
