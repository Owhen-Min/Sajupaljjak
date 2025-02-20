import SajuUserBubble from "./SajuUserBubble";
import { useNavigate } from "react-router-dom";

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

function convertSubTypeToKorean(subType) {
  const subTypeMap = {
    'GAP_MOK': '갑목',
    'EUL_MOK': '을목',
    'BYEONG_HWA': '병화',
    'JEONG_HWA': '정화',
    'GYE_SU': '계수',
    'IM_SU': '임수',
    'SHIN_GUM': '신금',
    'GYEONG_GUM': '경금',
    'GI_TO': '기토',
    'MU_TO': '무토',
  };
  
  return subTypeMap[subType] || subType;
}

const ArticleList = ({ articles, className }) => {
  const navigate = useNavigate();
  console.log(articles);
  return (
    <div className={`article-list font-NanumR p-2 ${className}`}>
      {articles.map((article) => (
        <div
          key={article.boardId}
          className="text-sm article-card bg-white p-4 mb-2 rounded-lg shadow cursor-pointer opacity-90"
          onClick={() => navigate(`/community/${article.boardId}`)}
        >
          <div className="flex items-center gap-x-2 mb-2">
            <SajuUserBubble skyElement={convertSubTypeToKorean(article.subType)} />
            <h3 className="text-base text-gray-800 font-semibold">
              {article.title}
            </h3>
          </div>
          <p className="text-gray-600 line-clamp-2">{article.content}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              좋아요 {article.likeCount} · 댓글 {article.commentCount}
            </span>
            <span className="text-sm text-gray-500">
              {formatRelativeTime(article.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
