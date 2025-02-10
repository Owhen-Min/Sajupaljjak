import { useParams, useNavigate } from 'react-router-dom';
import TopBar2 from '../../components/TopBar2';
import Input from '../../components/Input';
import SajuUserBubble from '../../components/SajuUserBubble';
import MainButton from '../../components/MainButton';
import { useState } from 'react';

// formatRelativeTime 함수 추가
function formatRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}달 전`;
  } else {
    return `${diffInYears}년 전`;
  }
}


function CommunityView() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const article = {
    "articleId": postId,
    "createdAt": "2025-02-09 16:10:00",
    "boardType": "임수",
    "celestialStem": "무토",
    "title": "신금 친구랑 싸웠는데, ",
    "content": "신금 친구랑 싸웠는데, 이 성격 대체 어떻게 이해해야 할까요?\n\n정말 이해가 안 되는데 어떻게 해결해야 할까요? 고민이 많습니다...\n\n도와주세요 ㅠㅠ",
    "likeCount": 7,
    "commentCount": 4
  };

  // 댓글 데이터 예시
  const [comments, setComments] = useState([
    {
      commentId: 1,

      createdAt: "2025-02-07 12:30:00",
      celestialStem: "갑목",

      content: "저도 비슷한 경험이 있어요. 시간이 해결해 줄 거예요!",
      likeCount: 3
    },
    {
      commentId: 2,
      createdAt: "2025-02-07 13:45:00",
      celestialStem: "임수",
      content: "신금이랑은 거리를 두는 게 좋을 것 같네요...",
      likeCount: 1
    }
  ]);

  const [comment, setComment] = useState("");
  
  return (
    <div className="community-view-page flex flex-col h-screen">
      <TopBar2 
        mainText={
          <span className="flex items-center justify-center">
            <SajuUserBubble skyElement={article.boardType} size={"large"}/>
            <span className="ml-1">게시판</span>
          </span>
        }
      />
      <div className="flex-grow overflow-y-auto py-3">
        <div className="article-detail px-4 pb-4">
          <div className="article-card bg-white p-4 rounded-lg shadow mb-4 py-2">
            <span className="user-info items-center px-2 bg-yellow-100 rounded-lg text-black font-dokrip">익명의 {article.celestialStem}</span>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold w-4/5">{article.title}</h3>
              <span className="text-sm text-gray-500 w-1/5">{formatRelativeTime(article.createdAt)}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap mt-2">{article.content}</p>
            <div className="flex items-center justify-between mt-5">
            <span className="text-sm text-black">좋아요 {article.likeCount}</span>
            <span className="text-sm text-black">댓글 {comments.length}개</span>
            </div>
          </div>

          <div className="comments-section">
            {comments.map((comment) => (
              <div 
              key={comment.commentId} 
              className="comment-card bg-white p-3 rounded-lg shadow mb-2"
              >
                <div className="flex items-center mb-2 justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCm6U-R7Dh4WAGASSJFN9RaPTnxmDeV1cVqitzJ1yXslCORiVstDy8rB0YgI5YCRkCJo&usqp=CAU"
                      alt="Profile"
                      className="w-8 h-8"
                    />
                    <SajuUserBubble skyElement={comment.celestialStem} size="normal"/>
                  </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                  <button className="btn btn-ghost btn-xs btn-circle ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
            </div>))}
          </div>

          <div className="flex comment-input-section bg-white p-4 rounded-lg justify-between shadow mb-4">
            <Input
              placeholder="댓글을 입력하세요"
              className="w-4/5 mr-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <MainButton
              className="w-1/5"
              onClick={() => {
                setComments([...comments, {
                  commentId: comments.length + 1,
                  createdAt: new Date().toISOString(),
                  celestialStem: "임수",
                  content: comment,
                }]);
                setComment("");
              }}
            >
              확인
            </MainButton>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityView;
