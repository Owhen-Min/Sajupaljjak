import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList from "../../components/UserList";
import { useState } from "react";

// import useFetchData from '../../hooks/useFetchData';
import { testUsers } from "../../data/user";



function Solo() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

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
      <div className="section-container">
        <div className="p-5 pb-2 text-2xl font-dokrip">궁합 매칭</div>
        <UserList users={testUsers} onUserClick={handleUserClick} />
      </div>
    
      {isModalOpen && selectedUser && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-t-3xl overflow-hidden animate-slideUp h-screen"
            onClick={e => e.stopPropagation()}
          >
            <div 
              className="w-full h-[40vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedUser.profileImage})` }}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold">{selectedUser.nickname}</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {selectedUser.memberType}
                </span>
                <span className="text-gray-600">{selectedUser.age}세</span>
              </div>
              <p className="text-gray-700">{selectedUser.introduction}</p>
            </div>
          </div>
        </div>
      )}

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