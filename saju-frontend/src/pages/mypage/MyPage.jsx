import BottomNav from "../../components/BottomNav";
import TopBar2 from "../../components/TopBar2";
import UserCard from "../../components/UserCard";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { testUsers } from "../../data/user";
import {useGet} from "../../hooks/useApi";
import { useEffect } from "react";
import { FaUser, FaHeart, FaPen, FaCommentDots } from "react-icons/fa";
import { BsFillCalendarDateFill, BsPersonHearts } from "react-icons/bs";

function MyPage() {
  const user = testUsers[0];

  return (
    <div className="flex flex-col relative h-screen pt-[60px] pb-[70px]">
      <TopBar2 mainText={"마이페이지"} />
      <div className="grid grid-cols-2 gap-6 p-10 my-auto">
        <Link
          to="edit-profile"
          className="flex flex-col text-center items-center justify-center p-4 rounded-xl bg-white shadow hover:bg-gray-50 transition-colors border-2 border-gray-200 text-gray-500"
        >
          <FaUser className="text-4xl mb-2" />
          내 프로필<br/>수정하기
        </Link>
        <Link
          to="edit-saju"
          className="flex flex-col text-center items-center justify-center p-4 rounded-xl bg-white shadow hover:bg-gray-50 transition-colors border-2 border-gray-200 text-gray-500"
        >
          <BsFillCalendarDateFill className="text-4xl mb-2 text-yellow-500" />
          사주 정보<br/>수정하기
        </Link>
        <Link
          to="edit-couple"
          className="flex flex-col text-center items-center justify-center p-4 rounded-xl bg-white shadow hover:bg-gray-50 transition-colors border-2 border-gray-200 text-gray-500"
        >
          <BsPersonHearts className="text-4xl mb-2 text-red-200" />
          커플 정보<br/>수정하기
        </Link>
        <Link
          to="liked"
          className="flex flex-col text-center items-center justify-center p-4 rounded-xl bg-white shadow hover:bg-gray-50 transition-colors border-2 border-gray-200 text-gray-500"
        >
          <FaHeart className="text-4xl mb-2 text-red-500" />
          좋아요 한 <br/>글 보기
        </Link>
        <Link
          to="posts"
          className="flex flex-col text-center items-center justify-center p-4 rounded-xl bg-white shadow hover:bg-gray-50 transition-colors border-2 border-gray-200 text-gray-500"
        >
          <FaPen className="text-4xl mb-2 text-blue-500" />
          내가 쓴 <br/>글 보기
        </Link>
        <Link
          to="comments"
          className="flex flex-col text-center items-center justify-center p-4 rounded-xl bg-white shadow hover:bg-gray-50 transition-colors border-2 border-gray-200 text-gray-500"
        >
          <FaCommentDots className="text-4xl mb-2 text-green-500" />
          내가 쓴 <br/>댓글 보기
        </Link>
      </div>
      <BottomNav />
    </div>
  );
}

export default MyPage;
