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
import { useGet, usePost, usePut, useDelete } from "../../hooks/useApi";

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
  console.log(diffInYears);
  return `${diffInYears}년 전`;
}

function CommunityView() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const mutation = usePost();
  const deleteMutation = useDelete();

  const { data, isPending, error } = useGet(`/api/community/${postId}`);

const [article, setArticle] = useState({
  articleId: "",
  createdAt: "2025-01-20 23:12:00",
  boardType: "무토",
  celestialStem: "경금",
  title: "안녕하세요",
  content: "반갑습니다",
  likeCount: 100,
  isLiked: false,
  commentCount: 999,
  comments: [
    {
      commentId: 1,
      createdAt: "2025-02-07 12:30:00",
      celestialStem: "갑목",
      content: "",
    },
  ],
});
 
useEffect(() => {
  if (data) 
    setArticle(data);
}, [data]);

  const [comments, setComments] = useState([
    {
      commentId: 1,
      createdAt: "2025-02-07 12:30:00",
      celestialStem: "갑목",
      content: "gdgd",
    },
  ]);

  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    mutation.mutate(
      { uri: `/api/community/${postId}/like`, payload: { liked: liked } },
      {
        onSuccess: () => {
          console.log("좋아요 요청 성공");
        },
        onError: (error) => {
          console.error("좋아요 요청 실패:", error);
        },
      }
    );
    console.log(liked);
  };

   if (error) {
     alert("유효하지 않은 접근입니다");
     navigate("/community");
   }
  // const handleComment = () => {
  //   mutation.mutate(
  //     { uri: `/api/community/${postId}/reply`, payload: {  } },
  //     {
  //       onSuccess: () => {
  //         console.log("댓글 등록 성공");
  //       },
  //       onError: (error) => {
  //         console.error("댓글 등록록 실패:", error);
  //       },
  //     }
  //   );
  // }

  // useEffect(() => {
  //   if (data) {
  //     setArticle(data);
  //     setComments(data.comments || []);
  //   }
  // }, [data]);

  // if (isPending) {
  //   return (
  //     <div className="h-screen flex items-center justify-center font-NanumR">
  //       <p>댓글을 불러오는 중...</p>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div className="h-screen flex items-center justify-center font-NanumR">
  //       <p>댓글을 불러오는 중 오류가 발생했습니다.</p>
  //     </div>
  //   );
  // }

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
          <span className="text-xs ">
            <span
              className="cursor-pointer"
              onClick={() => {
                navigate(`/community/${postId}/modify`);
              }}
            >
              수정
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                deleteMutation({ uri: `/community/${postId}` });
                navigate("/community");
              }}
            >
              삭제
            </span>
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
            <span
              onClick={() => {
                handleLike();
              }}
              className={`text-xs ${liked ? "text-red-500" : "text-gray-700"}`}
              style={{ cursor: "pointer" }}
            >
              좋아요 {article.likeCount}
            </span>
            <span className="text-xs text-gray-700">
              댓글 {comments.length}개
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
              onClick={
                // () => {handleComment();}
                () => {
                  if (!comment.trim()) return;
                  // setComments([
                  //   ...comments,
                  //   {
                  //     commentId: comments.length + 1,
                  //     createdAt: new Date().toISOString(),
                  //     celestialStem: "임수",
                  //     content: comment,
                  //   },
                  // ]);
             
                  // 댓글 작성성
                  // mutation.mutate(
                  //   {
                  //     uri: `/api/community/${postId}/reply`,
                  //     payload: {}, //이거 댓글에 맞게 수정하고
                  //   },
                  //   {
                  //     onSuccess: () => {
                  //       console.log("댓글 작성 성공");
                  //     },
                  //     onError: (error) => {
                  //       console.error("댓글 작성 실패:", error);
                  //     },
                  //   }
                  // );
                  setComment("");
                }
              }
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
