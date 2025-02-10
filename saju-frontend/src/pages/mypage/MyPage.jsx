import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserCard from "../../components/UserCard";
import { testUsers } from "../../data/user";
import { Link } from "react-router-dom"; // React Router 사용 시

function MyPage() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex-1 overflow-y-auto p-6 pt-10">
        <UserCard user={testUsers[0]} className="mb-6" />

        <nav className="p-4">
          <ul className="pt-4 space-y-4 text-lg">
          <li>
              <Link
                to="edit-profile"
                className="blockcursor-pointer">
                내 정보 수정하기
              </Link>
            </li>
            <li>
              <Link
                to="edit-saju"
                className="blockcursor-pointer">
                사주 정보 수정하기
              </Link>
            </li>
            <li>
              <Link
                to="edit-couple"
                className="blockcursor-pointer">
                커플 정보 수정하기
              </Link>
            </li>
            <li>
              <Link
                to="liked"
                className="blockcursor-pointer">
                좋아요한 글
              </Link>
            </li>
            <li>
              <Link
                to="posts"
                className="blockcursor-pointer">
                내가 쓴 글
              </Link>
            </li>
            <li>
              <Link
                to="comments"
                className="blockcursor-pointer">
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
