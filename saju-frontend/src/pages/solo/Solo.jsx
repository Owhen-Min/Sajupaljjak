import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList from "../../components/UserList";
// import useFetchData from '../../hooks/useFetchData';
import { testUsers } from "../../data/user";

function Solo() {
  // const { data: users, isLoading, isError } = useFetchData('/api/match/top', ['match', 'top']);
  
  // if (users){
  //   console.log(users);
  // }

  // if (isLoading) {
  //   return <div>로딩중</div>;
  // }

  // if (isError) {
  //   return <div>에러</div>;
  // }

  return (
    <div>
      <TopBar />
      <UserList users={testUsers} />
      <BottomNav />
    </div>
  );
}

export default Solo;