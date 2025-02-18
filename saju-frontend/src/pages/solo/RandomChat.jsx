import React from "react";
import MessageList from "../../components/MessageList";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import useWebSocket from "../../hooks/useWebSocket";

const Chat = () => {
  const chatRoomId = useParams().chatId;
  const [input, setInput] = useState("");
  const [newMessage, setNewMessage] = useState({});
  const [messages, setMessages] = useState([{}]);

  const stompClient = useWebSocket();
  const { memberId, user } = useAuth();


  useEffect(() => {
    if (!stompClient || !stompClient.connected) return;

    console.log("채팅방 구독 시작작");
    const subscription = stompClient.subscribe(
      `/ws/topic/chat/${chatRoomId}`,
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
              ? user?.profileImage
              : data?.partner?.profileImage || "",
          nickName:
            responseData.senderId === memberId
              ? user?.nickName
              : data?.partner?.nickName || "",
        };

        console.log("수신 메세지 :", newMessage);
        setMessages((prev) => [...prev, newMessage]);
        setPayload((prev) => ({
          ...prev,
          lastReadMessage: responseData.content,
        }));
      }
    );
    return () => {
      subscription.unsubscribe();
      console.log(" 채팅방 구독 취소");
    };
  }, [stompClient, chatRoomId, memberId, user, data]);


  const sendMessage = () => {
    if (!stompClient || !stompClient.connected) {
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
    stompClient.send("/ws/app/random", {}, JSON.stringify(message));
    setInput("");
  };


  return (
    <div className=" h-screen bg-gray-50 font-NanumR relative flex flex-col">
      <Header />
      {/* 메시지 리스트 컨테이너: 헤더와 하단 입력창 높이를 고려한 패딩 */}
      <div className="flex-1 pt-2 pb-2 overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <BottomInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
};

function Header() {
  const navigate = useNavigate();

  return (
    <header className="relative h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">상대방 닉네임</h1>
      <div
        className="absolute left-4 text-xl cursor-pointer text-white"
        onClick={() => navigate("/chats")}
      >
        <IoArrowBack />
      </div>
    </header>
  );
}

function BottomInput({ input, setInput, sendMessage }) {
  return (
    <div className="border-2 border-gray-300 rounded-md relative h-12 flex-shrink-0  text-white flex items-center justify-center">
      <Input
        type="text"
        placeholder="메시지 전송하기"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-3 py-2 border-none text-gray-800 focus:outline-none"
      />
      <MainButton
        onClick={() => {
          sendMessage();
        }}
        className="p-2 text-base text-gray-800 border-2 border-gray-800 font-bold bg-white rounded-r-md"
      >
        전송
      </MainButton>
    </div>
  );
}

export default Chat;
