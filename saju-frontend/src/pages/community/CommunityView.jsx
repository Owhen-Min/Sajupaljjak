import { useParams, useNavigate } from 'react-router-dom';
import TopBar2 from '../../components/TopBar2';
import Input from '../../components/Input';
import SajuUserBubble from '../../components/SajuUserBubble';

// formatRelativeTime 함수 추가
function formatRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  } else {
    return dateString;
  }
}

function CommunityView() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const article = {
    "articleId": postId,
    "createdAt": "2025-02-07 00:00:00",
    "boardType": "신금",
    "celestialStem": "무토",
    "title": "어쩌지?",
    "content": "신금 친구랑 싸웠는데, 이 성격 대체 어떻게 이해해야 할까요?\n\n정말 이해가 안 되는데 어떻게 해결해야 할까요? 고민이 많습니다...\n\n도와주세요 ㅠㅠ",
    "likeCount": 7,
    "commentCount": 4
  };

  // 댓글 데이터 예시
  const comments = [
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
  ];

  return (
    <div className="community-view-page flex flex-col h-screen">
      <TopBar2/>
      <div className="flex-grow overflow-y-auto py-5">
        <div className="article-detail px-4 pb-4">
          <div className="flex items-center py-1">
            <span className="font-dokrip"><SajuUserBubble skyElement={article.boardType} /> 게시판</span>
          </div>
          <div className="article-card bg-white p-4 rounded-lg shadow mb-4 justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCm6U-R7Dh4WAGASSJFN9RaPTnxmDeV1cVqitzJ1yXslCORiVstDy8rB0YgI5YCRkCJo&usqp=CAU"
                  alt="Profile"
                  className="w-8 h-8"
                />
                <SajuUserBubble skyElement={article.celestialStem} size="normal" />
              </div>

              <span className="text-sm text-gray-500">{formatRelativeTime(article.createdAt)}</span>
            </div>
            <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
            <p className="text-gray-700 whitespace-pre-wrap mt-2">{article.content}</p>
            

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                좋아요 {article.likeCount}
              </span>
              <span className="text-sm text-gray-500">
                신고
              </span>
            </div>
          </div>

          <div className="comments-section">
            <div className="text-sm font-semibold mb-2 px-1">
              댓글 {comments.length}개
            </div>
            {comments.map((comment) => (
              <div 
                key={comment.commentId} 
                className="comment-card bg-white p-3 rounded-lg shadow mb-2"
              >
                <div className="flex items-end mb-2 justify-between">
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
              </div>
            ))}
          </div>
          {/* 댓글 입력 섹션 추가 */}
          <div className="flex comment-input-section bg-white p-4 rounded-lg justify-between shadow mb-4">
            <Input
              placeholder="댓글을 입력하세요"
              className="w-4/5"
            />
            <button 
              className="px-3 h-auto bg-[#ffffff] outline-2 outline-offset-2 outline-solid text-black rounded-lg hover:bg-[#ff8562] transition-colors"
            >
              확인
            </button>


          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityView;
