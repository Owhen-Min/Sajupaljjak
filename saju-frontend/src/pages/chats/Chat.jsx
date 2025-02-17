import React from "react";
import MessageList from "../../components/MessageList";
// import TopBarChat from "../../components/TopBarChat";
import { useParams } from "react-router-dom";
import { useGet } from "../../hooks/useApi";
import { useState, useEffect } from "react";
import useWebSocket from "../../hooks/useWebSocket";
import { useAuth } from "../../hooks/useAuth";
import { BackButtonChat } from "../../components/BackButtonChat";

const Chat = () => {
  const chatRoomId = useParams().chatId;
  const [payload, setPayload] = useState({
    chatroomId: chatRoomId,
    lastReadMessage: "",
  });
  const { data, isPending, error } = useGet(`/api/chats/${chatRoomId}`); //이게 다시 방 접속할때 요청 다시 보내게 해야함
  const { stompClient } = useWebSocket();
  const { memberId, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [newMessage, setNewMessage] = useState({});

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
    if (!stompClient || !stompClient.connected) {
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
          setPayload((prev) => ({
            ...prev,
            lastReadMessage: responseData.content,
          }));
        }
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, chatRoomId, memberId, user, data.partner]);

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
    stompClient.send("/app/chats", {}, JSON.stringify(message));
    setInput("");
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      <div className="">
        {/* <TopBarChat mainText="상대방닉네임" /> */}

        {/* 채팅방에서 뒤로가기 하면 patch 요청 되게하는 버튼 */}
        <BackButtonChat url="chats" payload={payload} />

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
};

export default Chat;

// const messages = [
//   {
//     id: 1,
//     message: "안녕하세요!",
//     sentAt: "10:30 AM",
//     isMine: false,
//     profileImage:
//       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//     nickName: "상대방닉네임",
//   },
//   {
//     id: 2,
//     message: "안녕하세요! 반가워요 😊",
//     sentAt: "10:31 AM",
//     isMine: true,
//     profileImage:
//       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//     nickName: "나",
//   },
//   {
//     id: 3,
//     message: "오늘 일정이 어떻게 되세요?",
//     sentAt: "10:32 AM",
//     isMine: false,
//     profileImage:
//       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//     nickName: "상대방닉네임",
//   },
//   {
//     id: 4,
//     message: "점심 먹고 카페 가려고요!",
//     sentAt: "10:33 AM",
//     isMine: true,
//     profileImage:
//       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//     nickName: "나",
//   },
// ];
