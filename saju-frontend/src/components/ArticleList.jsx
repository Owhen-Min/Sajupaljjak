import SajuUserBubble from './SajuUserBubble';
import { useNavigate } from 'react-router-dom';

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

const ArticleList = ({ articles, className }) =>{

  const navigate = useNavigate();

   return (
     <div className={`article-list p-4 ${className}`}>
       {articles.map((article) => (
         <div
<<<<<<< HEAD
           key={article.boardId}
           className="article-card bg-white p-4 mb-4 rounded-lg shadow cursor-pointer opacity-90"
           onClick={() => navigate(`/community/${article.boardId}`)}
=======
           key={article.articleId}
           className="article-card bg-white p-4 mb-4 rounded-lg shadow cursor-pointer opacity-90"
           onClick={() => navigate(`/community/${article.articleId}`)}
>>>>>>> front
         >
           <div className="flex items-end gap-2 mb-2">
             <SajuUserBubble skyElement={article.subType} />
             <h3 className="text-lg font-semibold">{article.title}</h3>
           </div>
           <p className="text-gray-700 line-clamp-2">{article.content}</p>
           <div className="flex justify-between items-center mt-2">
             <span className="text-sm text-gray-500">
               좋아요 {article.likeCount} · 댓글 {article.commentCount}
             </span>
             <span className="text-sm text-gray-500">{formatRelativeTime(article.createdAt)}</span>
           </div>
         </div>
       ))}
     </div>
   );
}

export default ArticleList;