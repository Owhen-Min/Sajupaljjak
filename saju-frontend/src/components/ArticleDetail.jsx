import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { get } from '../api/apiClient';

function ArticleDetail({ articleId, onClose }) {
//   const { data: article, isLoading, isError } = useQuery({
//     queryKey: ['article', articleId],
//     queryFn: async () => {
//       const { data } = await get(`api/articles/${articleId}`);
//       return data;
//     },
//     enabled: !!articleId,
//   });

  const article = {
    "articleId": articleId,
    "createdAt": "2025-02-07 00:00:00",
    "boardType": "갑목",
    "celestialStem": "무토",
    "title": "어쩌지?",
    "content": "신금 친구랑 싸웠는데, 이 성격 대체 어떻게 이해해야 할까요?\n\n정말 이해가 안 되는데 어떻게 해결해야 할까요? 고민이 많습니다...\n\n도와주세요 ㅠㅠ",
    "likeCount": 7,
    "commentCount": 4
  };

//   if (isLoading) return <div className="p-4">로딩 중...</div>;
//   if (isError) return <div className="p-4">에러가 발생했습니다.</div>;
//   if (!article) return null;

  return (
    <div className="article-detail fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="p-4">
        <button 
          onClick={onClose}
          className="mb-4 text-gray-600"
        >
          ← 뒤로가기
        </button>
        
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

export default ArticleDetail; 