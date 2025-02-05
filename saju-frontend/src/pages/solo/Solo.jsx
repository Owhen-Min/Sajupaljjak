import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList from "../../components/UserList";
import { testUsers } from "../../data/user";

function Solo() {
  return (
    <div>
      <TopBar />
      <UserList users={testUsers} />
      {/* 랜덤 채팅 연결하는 부분  UserCard컴포넌트에 이미지 아무거나 넣고 */}
      <BottomNav />
    </div>
  );
}

export default Solo;