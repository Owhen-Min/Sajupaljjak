import React  from 'react';
import MessageList  from "../../components/MessageList";
// import TopBarChat from "../../components/TopBarChat";
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import  useWebSocket from "../../hooks/useWebSocket";
import { useAuth } from "../../hooks/useAuth";

const Chat = () => {
  const chatRoomId = useParams().chatId;
  const { stompClient } = useWebSocket();
  const { memberId, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [newMessage, setNewMessage] = useState({});


  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        `/topic/chat/${chatRoomId}`,
        (message) => {
          const responseData = JSON.parse(message.body);
          console.log("수신 데이터 :", responseData);
          const newMessage = {
            id: responseData.id,
            message: responseData.content,
            sentAt: responseData.sentAt,
            isMine: responseData.senderId === memberId,
            profileImage:
              responseData.senderId === memberId
                ? user.profileImage
                : data.partner.profileImage,
            nickName:
              responseData.senderId === memberId
                ? user.nickName
                : data.partner.nickName,
          };
          console.log("수신 메세지 :", newMessage);
          setMessages((prev) => [...prev, newMessage]);
          setPayload({ lastReadMessage: responseData.content });
        }
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, chatRoomId, memberId, user, data.partner]);


  
  const sendMessage = () => {
    if (!stompClient) {
      console.log("웹소켓 연결 안 된 상태");
      return;
    }

    if (!input.trim()) return;
    const message = {
      chatroomId: chatRoomId,
      senderId: memberId,
      content: input,
      messageType: "TEXT",
    };
    console.log("전송 데이터 :", JSON.stringify(message, null, 2));
    stompClient.send("/app/chats", {}, JSON.stringify(message));
    setInput("");
  };


  return (
    <div className="">
      <div className="">
        <TopBarChat mainText="???" />

        <MessageList messages={messages} />
        <div className="fixed bottom-0">
          <input
            type="text"
            value={input}
            placeholder="메세지를 입력해주세요"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="w-4/5"
          />
          <button className="" onClick={sendMessage}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;


	