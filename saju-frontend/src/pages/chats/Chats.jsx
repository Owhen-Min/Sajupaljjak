import BottomNav from "../../components/BottomNav";
import ChatList from "../../components/ChatList";
import TopBar from "../../components/TopBar";
import { useEffect, useState } from "react";
import useWebSocket from "../../hooks/useWebSocket";
import { useAuth } from "../../hooks/useAuth";

function Chats() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

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
        setNewData(responseData);
        console.log("받은 데이터 :", responseData);

        const message = {
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

        setData((prev) => ({ message, ...prev }));
        console.log("추가된 이후 배열", data);
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