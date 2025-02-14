
import React from 'react';
import MessageList  from "../../components/MessageList";
import TopBar2 from "../../components/TopBar2";

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
  ];
	return (
    <div className="bg-red-50">
      <div className="preference flex flex-col relative justify-center min-h-screen">
        <TopBar2 mainText="상대방닉네임" />
        <MessageList messages={messages} />
        <div className="fixed bottom-0 flex justify-between items-center">
          <input
            type="text"
            placeholder="메세지를 입력해주세요"
            className="input input-bordered input-secondary"
          />
          <button className="btn btn-active btn-secondary ml-1">전송</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;


// const messages = [
//     {
//       id: 1,
//       message: "안녕하세요!",
//       sentAt: "10:30 AM",
//       isMine: false,
//       profileImage:
//         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
//       nickName: "상대방닉네임임",
//     },
//   ]