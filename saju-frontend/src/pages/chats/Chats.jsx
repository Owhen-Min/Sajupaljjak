import BottomNav from "../../components/BottomNav";
import ChatList from "../../components/ChatList";
import TopBar from "../../components/TopBar";
import { useEffect, useState } from "react";
import  useWebSocket  from "../../hooks/useWebSocket";
import { useAuth } from "../../hooks/useAuth";

function Chats() {

  const [data, setData] = useState([{}]);
  const { stompClient } = useWebSocket();
  const memberId = useAuth().memberId;

  useEffect(() => {
    if (stompClient){
      const subscription = stompClient.subscribe(
        `/topic/list/${memberId}`,
        (message) => {
        const responseData = JSON.parse(message.body);
        console.log("받은 데이터 :", responseData);
        const newData = {
          [responseData.chatRoomId] : {
            "chatRoom": {
              "id": responseData.chatRoomId,
              "partner": {
                "id": responseData.partner.memberId,
                "nickname": responseData.partner.nickname,
                "profileImage": responseData.partner.profileImage,
                "celestialStem": responseData.partner.celestialStem,
              },
            }
          }
        }
        setData((prev) => [...prev, newData]);
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, memberId]);
  
 

  return (
    <div className="flex flex-col h-screen relative py-[56.5px]">
      <TopBar />
      <div className="flex-grow overflow-y-auto scrollbar-hidden">
        <ChatList chats={data} />
      </div>
      <BottomNav />
    </div>
  );
}

export default Chats;

 // const data = [
  //   {
  //     "25": { 
  //       "chatRoom": {
  //         "id": 25,
  //         "partner": {
  //           "id": 5,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "신금",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
  //         "lastSendTime": "2025-02-13T12:12:32",
  //         "newMessageCount": 12,
  //       },
  //     },
  //      "276": { 
  //       "chatRoom": {
  //         "id": 276,
  //         "partner": {
  //           "id": 2,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "무토",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "집에 가고 싶어요",
  //         "lastSendTime": "2025-02-13T12:12:32", 
  //         "newMessageCount": 7,
  //       },
  //     },
  //     "5": { 
  //       "chatRoom": {
  //         "id": 5,
  //         "partner": {
  //           "id": 5,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "신금",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
  //         "lastSendTime": "2025-02-13T12:12:32",
  //         "newMessageCount": 6,
  //       },
  //     },
 
  //     "16": { 
  //       "chatRoom": {
  //         "id": 16,
  //         "partner": {
  //           "id": 2,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "무토",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "집에 가고 싶어요",
  //         "lastSendTime": "2025-02-13T14:12:32", 
  //         "newMessageCount": 2,
  //       },
  //     },
  //     "17": { 
  //       "chatRoom": {
  //         "id": 17,
  //         "partner": {
  //           "id": 5,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "신금",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
  //         "lastSendTime": "2025-02-13T12:12:32",
  //         "newMessageCount": 0,
  //       },
  //     },

  //     "18": { 
  //       "chatRoom": {
  //         "id": 18,
  //         "partner": {
  //           "id": 2,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "무토",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "집에 가고 싶어요",
  //         "lastSendTime": "2025-02-13T12:12:32", 
  //         "newMessageCount": 0,
  //       },
  //     },
  //     "19": { 
  //       "chatRoom": {
  //         "id": 19,
  //         "partner": {
  //           "id": 5,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "신금",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
  //         "lastSendTime": "2025-02-13T12:12:32",
  //         "newMessageCount": 0,
  //       },
  //     },
  //     "20": { 
  //       "chatRoom": {
  //         "id": 20,
  //         "partner": {
  //           "id": 2,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "무토",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "집에 가고 싶어요",
  //         "lastSendTime": "2025-02-13T16:50:32", 
  //         "newMessageCount": 0,
  //       },
  //     },
  //     "21": { 
  //       "chatRoom": {
  //         "id": 21,
  //         "partner": {
  //           "id": 5,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "신금",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
  //         "lastSendTime": "2025-02-12T12:12:32",
  //         "newMessageCount": 0,
  //       },
  //     },
  //     "22": { 
  //       "chatRoom": {
  //         "id": 22,
  //         "partner": {
  //           "id": 2,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "무토",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "집에 가고 싶어요",
  //         "lastSendTime": "2025-02-13T12:12:32", 
  //         "newMessageCount": 0,
  //       },
  //     },
  //     "23": { 
  //       "chatRoom": {
  //         "id": 23,
  //         "partner": {
  //           "id": 5,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "신금",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
  //         "lastSendTime": "2025-02-13T12:12:32",
  //         "newMessageCount": 0,
  //       },
  //     },
  //     "24": { 
  //       "chatRoom": {
  //         "id": 24,
  //         "partner": {
  //           "id": 2,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "무토",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "집에 가고 싶어요",
  //         "lastSendTime": "2025-02-13T12:12:32", 
  //         "newMessageCount": 0,
  //       },
  //     },
  //     "27": { 
  //       "chatRoom": {
  //         "id": 27,
  //         "partner": {
  //           "id": 5,
  //           "nickname": "hong",
  //           "profileImage": "https://img.segye.com/content/image/2019/06/28/20190628507687.jpg",
  //           "celestialStem": "신금",
  //         },
  //       },
  //       "message": {
  //         "lastMessage": "가만히 앉아서 놀거 다 노는데 통장에 돈 따박따박 박히면 좋겠다",
  //         "lastSendTime": "2025-02-13T12:12:32",
  //         "newMessageCount": 0,
  //       },
  //     },
  //   },
  // ];