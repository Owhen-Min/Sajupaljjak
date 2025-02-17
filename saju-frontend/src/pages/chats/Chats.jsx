// import BottomNav from "../../components/BottomNav";
// import ChatList from "../../components/ChatList";
// import TopBar from "../../components/TopBar";
// import { useEffect, useState } from "react";
// import useWebSocket from "../../hooks/useWebSocket";
// import { useAuth } from "../../hooks/useAuth";

// function Chats() {
//   // const [data, setData] = useState([{}]);
//   const { stompClient } = useWebSocket();
//   const memberId = useAuth().memberId;

//   const data = [
//     {
//       36: {
//         chatRoom: {
//           id: 36,
//           partner: {
//             id: 2,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "무토",
//           },
//         },
//         message: {
//           lastMessage: "집에 가고 싶어요",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 5,
//         },
//       },
//       25: {
//         chatRoom: {
//           id: 25,
//           partner: {
//             id: 5,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "신금",
//           },
//         },
//         message: {
//           lastMessage:
//             "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 12,
//         },
//       },
//       276: {
//         chatRoom: {
//           id: 276,
//           partner: {
//             id: 2,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "무토",
//           },
//         },
//         message: {
//           lastMessage: "집에 가고 싶어요",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 7,
//         },
//       },
//       5: {
//         chatRoom: {
//           id: 5,
//           partner: {
//             id: 5,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "신금",
//           },
//         },
//         message: {
//           lastMessage:
//             "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 6,
//         },
//       },

//       16: {
//         chatRoom: {
//           id: 16,
//           partner: {
//             id: 2,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "무토",
//           },
//         },
//         message: {
//           lastMessage: "집에 가고 싶어요",
//           lastSendTime: "2025-02-13T14:12:32",
//           newMessageCount: 2,
//         },
//       },
//       17: {
//         chatRoom: {
//           id: 17,
//           partner: {
//             id: 5,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "신금",
//           },
//         },
//         message: {
//           lastMessage:
//             "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 0,
//         },
//       },

//       18: {
//         chatRoom: {
//           id: 18,
//           partner: {
//             id: 2,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "무토",
//           },
//         },
//         message: {
//           lastMessage: "집에 가고 싶어요",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 0,
//         },
//       },
//       19: {
//         chatRoom: {
//           id: 19,
//           partner: {
//             id: 5,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "신금",
//           },
//         },
//         message: {
//           lastMessage:
//             "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 0,
//         },
//       },
//       20: {
//         chatRoom: {
//           id: 20,
//           partner: {
//             id: 2,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "무토",
//           },
//         },
//         message: {
//           lastMessage: "집에 가고 싶어요",
//           lastSendTime: "2025-02-13T16:50:32",
//           newMessageCount: 0,
//         },
//       },
//       21: {
//         chatRoom: {
//           id: 21,
//           partner: {
//             id: 5,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "신금",
//           },
//         },
//         message: {
//           lastMessage:
//             "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
//           lastSendTime: "2025-02-12T12:12:32",
//           newMessageCount: 0,
//         },
//       },
//       22: {
//         chatRoom: {
//           id: 22,
//           partner: {
//             id: 2,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "무토",
//           },
//         },
//         message: {
//           lastMessage: "집에 가고 싶어요",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 0,
//         },
//       },
//       23: {
//         chatRoom: {
//           id: 23,
//           partner: {
//             id: 5,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "신금",
//           },
//         },
//         message: {
//           lastMessage:
//             "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 0,
//         },
//       },
//       24: {
//         chatRoom: {
//           id: 24,
//           partner: {
//             id: 2,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "무토",
//           },
//         },
//         message: {
//           lastMessage: "집에 가고 싶어요",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 0,
//         },
//       },
//       27: {
//         chatRoom: {
//           id: 27,
//           partner: {
//             id: 5,
//             nickname: "hong",
//             profileImage:
//               "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
//             celestialStem: "신금",
//           },
//         },
//         message: {
//           lastMessage:
//             "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
//           lastSendTime: "2025-02-13T12:12:32",
//           newMessageCount: 0,
//         },
//       },
//     },
//   ];

//   return (
//     <div className="flex flex-col h-screen relative ">
//       <Header />
//       <div className="px-4 text-left w-full max-w-sm pt-5">
//         <h2 className="text-lg font-semibold text-gray-800 mb-1">
//           운명의 상대와 대화를 시작하세요
//         </h2>
//         <p className="text-sm text-gray-600">
//           현재 대화 중인 상대방이 표시됩니다.
//         </p>
//       </div>
//       <div className="flex-grow overflow-y-auto scrollbar-hidden mt-4">
//         <ChatList chats={data} />
//       </div>
//       <BottomNav />
//     </div>
//   );
// }

// function Header() {
//   return (
//     <header className="h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
//       <h1 className="text-lg font-bold">채팅</h1>
//     </header>
//   );
// }

// export default Chats;

// // const data = [
// //   {
// //     "25": {
// //       "chatRoom": {
// //         "id": 25,
// //         "partner": {
// //           "id": 5,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "신금",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 12,
// //       },
// //     },
// //      "276": {
// //       "chatRoom": {
// //         "id": 276,
// //         "partner": {
// //           "id": 2,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "무토",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "집에 가고 싶어요",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 7,
// //       },
// //     },
// //     "5": {
// //       "chatRoom": {
// //         "id": 5,
// //         "partner": {
// //           "id": 5,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "신금",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 6,
// //       },
// //     },

// //     "16": {
// //       "chatRoom": {
// //         "id": 16,
// //         "partner": {
// //           "id": 2,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "무토",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "집에 가고 싶어요",
// //         "lastSendTime": "2025-02-13T14:12:32",
// //         "newMessageCount": 2,
// //       },
// //     },
// //     "17": {
// //       "chatRoom": {
// //         "id": 17,
// //         "partner": {
// //           "id": 5,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "신금",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 0,
// //       },
// //     },

// //     "18": {
// //       "chatRoom": {
// //         "id": 18,
// //         "partner": {
// //           "id": 2,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "무토",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "집에 가고 싶어요",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 0,
// //       },
// //     },
// //     "19": {
// //       "chatRoom": {
// //         "id": 19,
// //         "partner": {
// //           "id": 5,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "신금",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 0,
// //       },
// //     },
// //     "20": {
// //       "chatRoom": {
// //         "id": 20,
// //         "partner": {
// //           "id": 2,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "무토",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "집에 가고 싶어요",
// //         "lastSendTime": "2025-02-13T16:50:32",
// //         "newMessageCount": 0,
// //       },
// //     },
// //     "21": {
// //       "chatRoom": {
// //         "id": 21,
// //         "partner": {
// //           "id": 5,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "신금",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
// //         "lastSendTime": "2025-02-12T12:12:32",
// //         "newMessageCount": 0,
// //       },
// //     },
// //     "22": {
// //       "chatRoom": {
// //         "id": 22,
// //         "partner": {
// //           "id": 2,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "무토",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "집에 가고 싶어요",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 0,
// //       },
// //     },
// //     "23": {
// //       "chatRoom": {
// //         "id": 23,
// //         "partner": {
// //           "id": 5,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "신금",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 0,
// //       },
// //     },
// //     "24": {
// //       "chatRoom": {
// //         "id": 24,
// //         "partner": {
// //           "id": 2,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "무토",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "집에 가고 싶어요",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 0,
// //       },
// //     },
// //     "27": {
// //       "chatRoom": {
// //         "id": 27,
// //         "partner": {
// //           "id": 5,
// //           "nickname": "hong",
// //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
// //           "celestialStem": "신금",
// //         },
// //       },
// //       "message": {
// //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
// //         "lastSendTime": "2025-02-13T12:12:32",
// //         "newMessageCount": 0,
// //       },
// //     },
// //   },
// // ];

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
  const { data, isPending, error } = useGet(`/api/chats/1`); //이게 다시 방 접속할때 요청 다시 보내게 해야함
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
    if (!stompClient || !stompClient.connected) return;
    console.log("채팅방 구독 시작작");

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
  }, [stompClient?.connected, chatRoomId, memberId, user, data?.partner]);

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
