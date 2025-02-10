import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList from "../../components/UserList";

// import useGet from '../../hooks/useGet';
import { testUsers } from "../../data/user";

function Solo() {
  // const { data: users, isLoading, isError } = useGet('/api/match/top', ['match', 'top']);
  
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
      <div className="section-container">
        <div className="p-5 pb-2 text-2xl font-dokrip">궁합 매칭</div>
        <UserList users={testUsers} />
      </div>
    
      <div className="section-container">
        <div className="p-5 pb-2  text-2xl font-dokrip">랜덤 채팅</div>
        {/* <UserCard/> */}
      </div>

      {/* 랜덤 채팅 연결하는 부분  UserCard컴포넌트에 이미지 아무거나 넣고 */}
      <BottomNav />
    </div>
  );
}

export default Solo;