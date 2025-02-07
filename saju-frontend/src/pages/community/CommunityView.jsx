import { useParams, useNavigate } from 'react-router-dom';
import TopBar2 from '../../components/TopBar2';

function CommunityView() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const article = {
    "articleId": postId,
    "createdAt": "2025-02-07 00:00:00",
    "boardType": "갑목",
    "celestialStem": "무토",
    "title": "어쩌지?",
    "content": "신금 친구랑 싸웠는데, 이 성격 대체 어떻게 이해해야 할까요?\n\n정말 이해가 안 되는데 어떻게 해결해야 할까요? 고민이 많습니다...\n\n도와주세요 ㅠㅠ",
    "likeCount": 7,
    "commentCount": 4
  };

  return (
    <div className="article-detail overflow-y-auto">
      <TopBar2/>
      <div className="p-4">
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">{article.boardType}</span>
          <span className="text-sm text-gray-500">{article.celestialStem}</span>
        </div>
        
        <h2 className="text-xl font-bold mb-4">{article.title}</h2>
        <p className="text-gray-800 whitespace-pre-wrap mb-4">{article.content}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            좋아요 {article.likeCount} · 댓글 {article.commentCount}
          </span>
          <span className="text-sm text-gray-500">{article.createdAt}</span>
        </div>
      </div>
    </div>
  );
}

export default CommunityView;
