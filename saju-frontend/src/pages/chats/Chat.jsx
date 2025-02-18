import React from "react";
import MessageList from "../../components/MessageList";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import { useParams } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import useWebSocket from "../../hooks/useWebSocket";

const Chat = () => {
  const chatRoomId = useParams().chatId;
  const [input, setInput] = useState("");
  const [newMessage, setNewMessage] = useState({});
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "안녕하세요!",
      sentAt: "10:30 AM",
      isMine: false,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "상대방닉네임",
    },
    {
      id: 2,
      message: "안녕하세요! 반가워요 😊",
      sentAt: "10:31 AM",
      isMine: true,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "나",
    },
  ]);

  const [payload, setPayload] = useState({
    chatroomId: chatRoomId,
    lastReadMessage: "",
  });

  const { data, isPending, error } = useGet(`/api/chats/${chatRoomId}`);
  const { stompClient, isConnected } = useWebSocket();
  const memberId = localStorage.getItem("memberId");
  
  useEffect(() => {
    if (data) {
      const transformMessages = (messages, memberId) => {
        if (!messages) return [];
        return messages.map((message) => {
          setPayload((prev) => ({ ...prev, lastReadMessage: message.message }));
          return {
            id: message.id,
            message: message.message,
            sentAt: message.sentAt,
            isMine: message.senderId === memberId,
            profileImage:
              message.senderId === memberId
                ? user.profileImage
                : data.partner.profileImage,
            nickName:
              message.senderId === memberId
                ? user.nickName
                : data.partner.nickName,
          };
        });
      };
      setMessages(transformMessages(data.messages, memberId));
    }
  }, [data, chatRoomId, setMessages, memberId, user]);

  useEffect(() => {
    if (!stompClient || !isConnected) return;

    console.log(`=== 채팅방 ${chatRoomId} 구독 시작 ===`);
    const subscription = stompClient.subscribe(
      `/ws/topic/chat/${chatRoomId}`,
      (response) => {
        console.log("=== 새로운 메시지 수신 ===");
        console.log("원본 응답:", response);
        console.log("응답 body:", response.body);
        
        try {
          const responseData = JSON.parse(response.body);
          console.log("파싱된 응답 데이터:", responseData);
          console.log("- 메시지 ID:", responseData.id);
          console.log("- 보낸 사람:", responseData.senderId);
          console.log("- 내용:", responseData.content);
          console.log("- 시간:", responseData.sentAt);

          // 자신이 보낸 메시지는 이미 UI에 추가되어 있으므로 건너뜀
          if (responseData.senderId === memberId) {
            console.log("자신이 보낸 메시지 수신됨 - UI 업데이트 건너뜀");
            return;
          }

          const newMessage = {
            id: responseData.id,
            message: responseData.content,
            sentAt: responseData.sentAt,
            isMine: false,
            profileImage: data?.partner?.profileImage || "",
            nickName: data?.partner?.nickName || "",
          };

          console.log("UI에 추가될 새 메시지:", newMessage);
          setMessages(prev => [...prev, newMessage]);
          console.log("=== 메시지 처리 완료 ===");
        } catch (error) {
          console.error("메시지 처리 중 오류 발생:", error);
          console.error("원본 응답:", response);
        }
      },
      {
        // 구독 옵션 추가
        id: `chat-${chatRoomId}`,
      }
    );

    console.log("구독 객체:", subscription);

    return () => {
      console.log(`=== 채팅방 ${chatRoomId} 구독 취소 ===`);
      subscription.unsubscribe();
    };
  }, [stompClient, isConnected, chatRoomId, memberId, user, data]);

  const sendMessage = () => {
    if (!stompClient || !isConnected) {
      console.log("웹소켓 연결 상태 확인:");
      console.log("- stompClient:", stompClient);
      console.log("- isConnected:", isConnected);
      return;
    }
    
    if (!input.trim()) return;
    
    const message = {
      chatroomId: chatRoomId,
      senderId: memberId,
      content: input,
      messageType: "TEXT",
    };
    
    const messageString = JSON.stringify(message);
    console.log("=== 메시지 전송 시도 ===");
    console.log("발신 데이터(raw):", message);
    console.log("발신 데이터(string):", messageString);
    console.log("전송 destination:", "/app/chats");
    
    try {
      stompClient.publish({
        destination: "/app/chats",
        body: messageString,
        headers: {},
      });

      const newMessage = {
        id: Date.now(),
        message: input,
        sentAt: new Date().toLocaleTimeString(),
        isMine: true,
        profileImage: user?.profileImage,
        nickName: user?.nickName,
      };
      
      console.log("UI에 추가되는 메시지:", newMessage);
      setMessages(prev => [...prev, newMessage]);
      setInput("");
      console.log("=== 메시지 전송 완료 ===");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      console.error("에러 상세:", {
        message: error.message,
        stack: error.stack
      });
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


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
