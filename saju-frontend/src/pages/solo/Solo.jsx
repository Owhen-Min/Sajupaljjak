import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TobBar";
import UserList from "../../components/UserList";
import { testUsers } from "../../data/user";

function Solo() {
  return (
    <div>
      <TopBar />
      <UserList users={testUsers} />
      <BottomNav />
    </div>
  );
}

export default Solo;
