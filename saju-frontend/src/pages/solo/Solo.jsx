import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList from "../../components/UserList";
import { Link } from "react-router-dom";
import { useGet } from "../../hooks/useApi";

function Solo() {
  const { data:users, isLoading, error } = useGet("/api/match/top");
  if (isLoading) return <div>로딩중 ...</div>;
  if (error) return <div>에러 : {error.message}</div>;

  return (
    <div>
      <TopBar />
      <div className="section-container mt-0">
        <div className="p-5 pb-2 text-2xl font-dokrip">궁합 매칭</div>
        <UserList users={ users } />
      </div>

      <div className="mt-10 w-full h- 200 ">
      </div>


      <div className="section-container pl-5">
        <div className="mt-10 pl-0 pb-2  text-2xl font-dokrip">랜덤 채팅</div>

        <Link to={"/chats/random"} className="blur-xs">
          <div
            className="relative w-80 max-w-sm aspect-[4/3] cursor-pointer rounded-3xl ml-5 bg-white" 
            style={{
              backgroundImage: `url('https://cdn4.iconfinder.com/data/icons/business-vol-4-2/100/Artboard_15-512.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-40 pl-4 pt-2 rounded-b-3xl">
              <span className="text-white">모르는 사람이랑 채팅 해보세요. 3분뒤부터 정보 확인 가능한데 </span>
            </div>
          </div>
        </Link>
      </div>

      {/* 랜덤 채팅 연결하는 부분  UserCard컴포넌트에 이미지 아무거나 넣고 */}
      <BottomNav />
    </div>
  );
}

export default Solo;