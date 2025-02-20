import MessageList from "../../components/MessageList";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import { useParams } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useState, useEffect, useRef } from "react";
import useWebSocket from "../../hooks/useWebSocket";

const Chat = () => {
  const chatRoomId = useParams().chatId;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { data, isPending, error } = useGet(`/api/chats/${chatRoomId}`);
  const { stompClient, isConnected } = useWebSocket();
  const memberId = localStorage.getItem('memberId');
  const subscriptionRef = useRef(null);
  const [partner, setPartner] = useState({
    id: null,
    nickName: null,
    profileImage: null,
    celestialStem: null,
    age: null
  });

  // 초기 메시지 로드
  useEffect(() => {
    if (data) {
      console.log('[채팅] 초기 데이터 수신:', data);
      
      if (data.partner) {
        setPartner(data.partner);
      }

      // 메시지 변환 및 한 번만 설정
      const transformMessages = (messages, memberId, partnerInfo) => {
        if (!Array.isArray(messages)) {
          console.log('[채팅] 메시지 데이터 형식 오류');
          return [];
        }
        return messages.map((message) => {
          // messageType 확인
          if (message.messageType !== 'TEXT') {
            console.log(`[채팅] 지원하지 않는 메시지 타입: ${message.messageType}`);
            return null;
          }

          return {
            id: message.id,
            message: message.content,
            sentAt: message.sendTime, // sendTime으로 수정
            isMine: message.senderId === memberId,
            profileImage: message.senderId == memberId
              ? null
              : partnerInfo?.profileImage || "기본이미지URL",
            nickName: message.senderId == memberId ? "나" : partnerInfo?.nickname || "상대방", // nickname으로 수정
          };
        }).filter(message => message !== null); // 지원하지 않는 메시지 타입 필터링
      };
      
      const transformedMessages = transformMessages(data.messages, memberId, data.partner);
      console.log('[채팅] 변환된 메시지:', transformedMessages);
      setMessages(transformedMessages);
    }
  }, [data, memberId]);

  const handleNewMessage = (messageData) => {
    try {
      if (messageData.senderId === memberId) {
        console.log('[웹소켓] 자신의 메시지 무시');
        return;
      }

      const newMessage = {
        id: messageData.id || Date.now(),
        message: messageData.content,
        sentAt: messageData.sendTime,
        isMine: false,
        profileImage: partner.profileImage || "기본이미지URL",
        nickName: partner.nickName || "상대방",
      };

      console.log('[웹소켓] 새 메시지 처리:', newMessage);
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('[웹소켓] 메시지 파싱 오류:', error);
    }
  };

  // 웹소켓 구독 설정
  useEffect(() => {
    if (!stompClient || !isConnected) {
      console.log('[웹소켓] 연결 대기 중');
      return;
    }

    console.log(`[웹소켓] 채팅방 ${chatRoomId} 구독 시도`);

    try {
      const subscription = stompClient.subscribe(
        `/topic/${chatRoomId}`,
        (response) => {
          console.log('[웹소켓] 메시지 수신:', response);
          const messageData = JSON.parse(response.body);
          handleNewMessage(messageData);
        }
      );

      subscriptionRef.current = subscription;
      console.log('[웹소켓] 구독 성공:', subscription);

    } catch (error) {
      console.error('[웹소켓] 구독 오류:', error);
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [stompClient, isConnected, chatRoomId, memberId]);

  const sendMessage = () => {
    if (!input.trim()) {
      console.log('[메시지] 빈 메시지 전송 시도 - 무시');
      return;
    }

    if (!stompClient || !isConnected) {
      console.error('[메시지] 웹소켓 연결 없음:', {
        stompClient: !!stompClient,
        isConnected: isConnected
      });
      return;
    }

    const messageData = {
      chatRoomId: chatRoomId,
      senderId: memberId,
      content: input.trim(),
      messageType: "TEXT"
    };

    console.log('[메시지] 전송 시도:', messageData);

    try {
      stompClient.publish({
        destination: "/app/chats",
        body: JSON.stringify(messageData),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      // UI에 즉시 반영
      const uiMessage = {
        id: Date.now(),
        message: input.trim(),
        sentAt: new Date().toISOString(),
        isMine: true,
        profileImage: "기본이미지URL",
        nickName: "나",
      };

      setMessages(prev => [...prev, uiMessage]);
      setInput("");
      console.log('[메시지] 전송 성공');
    } catch (error) {
      console.error('[메시지] 전송 실패:', {
        error: error.message,
        messageData: messageData
      });
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-screen bg-gray-50 font-NanumR flex flex-col w-full relative">
      <Header data={data} />
      <div className="flex-1 overflow-hidden">
        {/* 디버깅용 출력 */}
        <div>메시지 개수: {messages?.length}</div>
        {messages?.length > 0 ? (
          <MessageList messages={messages} />
        ) : (
          <div>메시지가 없습니다.</div>
        )}
      </div>
      <BottomInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
};

function Header({ data }) {
  const navigate = useNavigate();

  return (
    <header className="relative h-12 flex-shrink-0 bg-black text-white flex items-center justify-center ">
      <h1 className="text-lg font-bold">{data?.partner?.nickName}</h1>
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
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-md relative h-12 flex-shrink-0  text-white flex items-center justify-center">
      <Input
        type="text"
        placeholder="메시지 전송하기"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 p-3 py-2 border-none text-gray-800 focus:outline-none"
      />
      <MainButton
        onClick={sendMessage}
        className="p-2 text-base text-black border-2 border-gray-800 font-bold bg-white rounded-r-md"
      >
        전송
      </MainButton>
    </div>
  );
}

export default Chat;
