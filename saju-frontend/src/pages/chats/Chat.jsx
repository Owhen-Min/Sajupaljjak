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
    </div>
  );
}

export default Chats;
