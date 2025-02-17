import React from "react";
import MessageList from "../../components/MessageList";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";

const Chat = () => {
  const messages = [
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
    {
      id: 3,
      message: "오늘 일정이 어떻게 되세요?",
      sentAt: "10:32 AM",
      isMine: false,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "상대방닉네임",
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
      nickName: "상대방닉네임",
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
      nickName: "상대방닉네임",
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
    {
      id: 9,
      message: "좋아요! 장소는 어디로 할까요?",
      sentAt: "10:37 AM",
      isMine: true,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "나",
    },
    {
      id: 10,
      message: "좋아요! 장소는 어디로 할까요?",
      sentAt: "10:37 AM",
      isMine: false,
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      nickName: "상대방닉네임",
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
      nickName: "상대방닉네임",
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
      nickName: "상대방닉네임",
    },
  ];

  return (
    <div className=" h-screen bg-gray-50 font-NanumR relative flex flex-col">
      <Header />
      {/* 메시지 리스트 컨테이너: 헤더와 하단 입력창 높이를 고려한 패딩 */}
      <div className="flex-1 pt-2 pb-2 overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <BottomInput />
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

function BottomInput() {
  return (
    <div className="border-2 border-gray-300 rounded-md relative h-12 flex-shrink-0  text-white flex items-center justify-center">
      <Input
        type="text"
        placeholder="메시지 전송하기"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 p-3 py-2 border-none text-gray-800 focus:outline-none"
      />
      <MainButton
        onClick={() => console.log(searchQuery)}
        className="p-2 text-base text-gray-800 border-2 border-gray-800 font-bold bg-white rounded-r-md"
      >
        전송
      </MainButton>
    </div>
  );
}

export default Chat;
