import BottomNav from "../../components/BottomNav";
import ChatList from "../../components/ChatList";
import TopBar from "../../components/TopBar";
import { useEffect, useState } from "react";
import useWebSocket from "../../hooks/useWebSocket";
import { useAuth } from "../../hooks/useAuth";

function Chats() {
  const [data, setData] = useState([]);

  const { stompClient, isConnected } = useWebSocket();
  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    if (!stompClient || !isConnected) return;
    console.log("채팅목록 구독 시작");
    console.log(memberId);
    const subscription = stompClient.subscribe(
      `/topic/list/${memberId}`,
      (response) => {
        const responseData = JSON.parse(response.body);
        console.log("받은 데이터 :", responseData);
        const newData = {
          [responseData.chatRoomId]: {
            chatRoom: {
              id: responseData.chatRoomId,
              partner: {
                nickname: responseData.partner.nickname,
                profileImage: responseData.partner.profileImage,
                celestialStem: responseData.partner.celestialStem,
              },
            },
            message: {
              lastMessage: responseData.message.lastMessage,
              lastSendTime: responseData.message.lastSendTime,
              newMessageCount: responseData.message.newMessageCount
            }
          }
        };
        setData((prev) => ({ ...prev, ...newData }));
      }
    );

    return () => {
      subscription.unsubscribe();
      console.log("채팅목록 구독 해제");
    };
  }, [stompClient, isConnected, memberId]);

  return (
    <div className="flex flex-col h-screen relative ">
      <Header />
      <div className="px-4 text-left w-full max-w-sm pt-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          운명의 상대와 대화를 시작하세요
        </h2>
        <p className="text-sm text-gray-600">
          현재 대화 중인 상대방이 표시됩니다.
        </p>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-hidden mt-4">
        <ChatList chats={data} />
      </div>
      <BottomNav />
    </div>
  );
}

function Header() {
  return (
    <header className="h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">채팅</h1>
    </header>
  );
}

export default Chats;

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
