<<<<<<< HEAD
import BottomNav from "../../components/BottomNav";
import ChatList from "../../components/ChatList";
import TopBar from "../../components/TopBar";
import { useGet } from "../../hooks/useApi";

function Chats() {
  // const { data, loading, error } = useGet("/api/chats");
  // if(loading) return <div>로딩 중...</div>;
  // if(error) return <div>에러 발생!</div>;

  const data = [
    {
      chatRoomId: 1,
      partner: {
        id: 2,
        nickname: "hong",
        name: "홍길동",
        profileImage: "imgUrl~",
        celestialStem: "무토",
        age: 21,
      },
      message: {
        lastMessage: "제발좀읽으세요",
        lastSendTime: "2023-08-22 15:14:32", // 프론트가 편한 형식으로 변경
        newMessageCount: 12,
      },
    },
    {
      chatRoomId: 2,
      partner: {
        id: 4,
        nickname: "kim",
        name: "이종문",
        profileImage: "imgUrl~",
        celestialStem: "무토",
        age: 21,
      },
      message: {
        lastMessage: "두번째",
        lastSendTime: "2023-08-22T14:14:32",
        newMessageCount: 12,
      },
    },
  ];

  return (
    <div className="flex flex-col h-screen relative">
      <TopBar />
      <ChatList chats={data} />
      <BottomNav />
=======

import React from 'react';
import MessageList  from "../../components/MessageList";

const Chat = () => {
	const messages = [
    {
      id: 1,
      message: "안녕하세요!",
      sentAt: "10:30 AM",
      isMine: false,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "상대방닉네임임",
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
    {
      id: 3,
      message: "오늘 일정이 어떻게 되세요?",
      sentAt: "10:32 AM",
      isMine: false,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "상대방닉네임임",
    },
    {
      id: 4,
      message: "점심 먹고 카페 가려고요!",
      sentAt: "10:33 AM",
      isMine: true,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "나",
    },
    {
      id: 5,
      message: "좋네요! 같이 가도 될까요?",
      sentAt: "10:34 AM",
      isMine: false,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "상대방닉네임임",
    },
    {
      id: 6,
      message: "당연하죠! 몇 시쯤 만날까요?",
      sentAt: "10:35 AM",
      isMine: true,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "나",
    },
    {
      id: 7,
      message: "12시에 만나는 거 어때요?",
      sentAt: "10:36 AM",
      isMine: false,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "상대방닉네임임",
    },
    {
      id: 8,
      message: "좋아요! 장소는 어디로 할까요?",
      sentAt: "10:37 AM",
      isMine: true,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "나",
    },
  ];
	return (
    <div>
      <MessageList messages={messages} />
			<input placeholder='내용 입력'/>
			<button>전송</button>
>>>>>>> front
    </div>
  );
}

<<<<<<< HEAD
export default Chats;
=======
export default Chat;

>>>>>>> front
