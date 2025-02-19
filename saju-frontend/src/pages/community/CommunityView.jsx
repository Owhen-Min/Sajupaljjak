// CommunityView.js
import { useParams, useNavigate } from "react-router-dom";
import TopBar3 from "../../components/TopBar3";
import Input from "../../components/Input";
import SajuUserBubble from "../../components/SajuUserBubble";
import SajuAuthorBubble from "../../components/SajuAuthorBubble";
import MainButton from "../../components/MainButton";
import { useState, useEffect } from "react";
// articleDetail.json 파일을 import합니다.
import articleDetails from "../../data/articlesDetail.json";
import { IoArrowBack } from "react-icons/io5";
import { FaCommentDots } from "react-icons/fa";
import { useGet } from "../../hooks/useApi";

// 상대적 시간 표시 함수
function formatRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  if (diffInDays < 30) return `${diffInDays}일 전`;
  if (diffInMonths < 12) return `${diffInMonths}달 전`;
  return `${diffInYears}년 전`;
}

function CommunityView() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data, isPending, error } = useGet(`/community/${postId}`);

  const [article, setArticle] = useState({
    articleId: "",
    createdAt: "",
    boardType: "",
    celestialStem: "",
    title: "",
    content: "",
    likeCount: 999,
    commentCount: 999,
    comments: [
      {
        commentId: 1,
        createdAt: "2025-02-07 12:30:00",
        celestialStem: "갑목",
        content: "",
      },
      {
        commentId: 2,
        createdAt: "2025-02-07 13:45:00",
        celestialStem: "임수",
        content: "",
      },
    ],
  });

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (data) {
      setArticle(data);
      setComments(data.comments || []);
    }
  }, [data]);











  if (!article) {
    return (
      <div className="h-screen flex items-center justify-center font-NanumR">
        <p>게시글을 불러오는 중...</p>
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center font-NanumR">
        <p>댓글을 불러오는 중...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center font-NanumR">
        <p>댓글을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }






  return (
    <div className="h-screen flex flex-col bg-gray-50 font-NanumR">
      <Header article={article} />
      <div className="flex-1 overflow-y-auto  px-2">
        {/* 게시글 상세 */}
        <div className="bg-white rounded-md shadow-md p-4 mt-3 border-gray-300">
          <span className="inline-block py-1  text-black text-xs rounded-lg">
            <SajuAuthorBubble
              skyElement={article.celestialStem}
              size="normal"
            />
          </span>
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-base font-semibold text-gray-800">
              {article.title}
            </h3>
            <span className="text-xs text-gray-500">
              {formatRelativeTime(article.createdAt)}
            </span>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">
            {article.content}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-700">
              좋아요 {article.likeCount}
            </span>
            <span className="text-xs text-gray-700">
              {/* 댓글 {comments.length}개 */}
            </span>
          </div>
        </div>

        {/* 댓글 목록 (divider로 구분) */}
        <div className="flex  flex-row items-center gap-x-1 px-1 mt-6 text-sm text-gray-600">
          <FaCommentDots />
          댓글 {comments.length}개
        </div>
        <div className="divide-y divide-gray-300 mt-1 p-2 bg-white shadow-md rounded-md">
          {comments.map((c) => (
            <div key={c.commentId} className="py-3 px-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <SajuAuthorBubble
                    skyElement={c.celestialStem}
                    size="normal"
                  />
                  <span className="text-xs text-gray-400">
                    {formatRelativeTime(c.createdAt)}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-black active:scale-95 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-700 mt-2">{c.content}</p>
            </div>
          ))}
          {/* 댓글 입력창 안으로 넣음 */}
          <div className="bg-white mt-3 rounded-lg shadow flex items-center space-x-2">
            <Input
              placeholder="댓글을 입력하세요"
              className="border-none flex-1 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#4caf50]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <MainButton
              className="px-3 border-none py-2 bg-[#ff7070] text-white rounded-md text-sm hover:opacity-90 active:scale-95 transition"
              onClick={() => {
                if (!comment.trim()) return;
                setComments([
                  ...comments,
                  {
                    commentId: comments.length + 1,
                    createdAt: new Date().toISOString(),
                    celestialStem: "임수",
                    content: comment,
                  },
                ]);
                setComment("");
              }}
            >
              확인
            </MainButton>
          </div>
        </div>

        {/* 댓글 입력창
        // <div className="bg-white p-3 mt-4 rounded-lg shadow flex items-center space-x-2">
        //   <Input
        //     placeholder="댓글을 입력하세요"
        //     className="flex-1 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#4caf50]"
        //     value={comment}
        //     onChange={(e) => setComment(e.target.value)}
        //   />
        //   <MainButton
        //     className="px-3 py-2 bg-[#4caf50] text-white rounded-md text-sm hover:opacity-90 active:scale-95 transition"
        //     onClick={() => {
        //       if (!comment.trim()) return;
        //       setComments([
        //         ...comments,
        //         {
        //           commentId: comments.length + 1,
        //           createdAt: new Date().toISOString(),
        //           celestialStem: "임수",
        //           content: comment,
        //         },
        //       ]);
        //       setComment("");
        //     }}
        //   >
        //     확인
        //   </MainButton>
        // </div> */}
      </div>
    </div>
  );
}
function Header({ article }) {
  const navigate = useNavigate();

  return (
    <header className="relative h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <div className="flex gap-x-1 items-center justify-center">
        <SajuUserBubble skyElement={article.boardType} size="large" />
        <div className="text-lg font-bold">게시판</div>
      </div>
      <div
        className="absolute left-4 text-xl text-white cursor-pointer "
        onClick={() => navigate("/community")}
      >
        <IoArrowBack />
      </div>
    </header>
  );
}

export default CommunityView;
