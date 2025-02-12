import BottomNav from "../../components/BottomNav";
import TopBar2 from "../../components/TopBar2";
import UserCard from "../../components/UserCard";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { testUsers } from "../../data/user";


function MyPage() {
  const user = testUsers[0];
  return (
    <div className="flex flex-col relative h-screen pt-10">
      <TopBar2 mainText={"마이페이지"} />
      <div className="flex-1 overflow-y-auto p-6">
        <UserCard user={user} disabled={true} className="mb-6"/>
        <nav className="py-4">
          <ul className="overflow-hidden rounded-lg bg-white shadow divide-y divide-gray-100">
            <li>
              <Link
                to="edit-profile"
                className="block w-full p-4 hover:bg-gray-50 transition-colors"
              >
                내 프로필 수정하기
              </Link>
            </li>
            <li>
              <Link
                to="edit-saju"
                className="block w-full p-4 hover:bg-gray-50 transition-colors"
              >
                사주 정보 수정하기
              </Link>
            </li>
            <li>
              <Link
                to="edit-couple"
                className="block w-full p-4 hover:bg-gray-50 transition-colors"
              >
                커플 정보 수정하기
              </Link>
            </li>
            <li>
              <Link
                to="liked"
                className="block w-full p-4 hover:bg-gray-50 transition-colors"
              >
                좋아요한 글
              </Link>
            </li>
            <li>
              <Link
                to="posts"
                className="block w-full p-4 hover:bg-gray-50 transition-colors"
              >
                내가 쓴 글
              </Link>
            </li>
            <li>
              <Link
                to="comments"
                className="block w-full p-4 hover:bg-gray-50 transition-colors"
              >
                내가 쓴 댓글
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <BottomNav />
    </div>
  );
}

export default MyPage;
