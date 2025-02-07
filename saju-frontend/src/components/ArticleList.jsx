import { useInfiniteQuery } from '@tanstack/react-query';
import { get } from '../api/apiService';

function ArticleList({ selectedElement, onArticleClick }) {
//   const {
//     data,
//     isLoading,
//     isError,
//     hasNextPage,
//     fetchNextPage,
//   } = useInfiniteQuery({
//     queryKey: ['articles', selectedElement],
//     queryFn: async ({ pageParam = null }) => {
//       const { data } = await get(`/api/community?type=${selectedElement}&cursor=${pageParam || ''}`);
//       return data;
//     },
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//   });

//   if (isLoading) return <div className="p-4">로딩 중...</div>;
//   if (isError) return <div className="p-4">에러가 발생했습니다.</div>;
//   const articles = data?.pages.flatMap(page => page.content) || [];

    const articles = [{
        "articleId": 1,
        "createdAt": "2025-01-20 23:12:00",
        "boardId": 1,
        "boardType": "경금",
        "celestialStem": "기토",
        "title": "경금 뭐임?",
        "content": "나 경금남자 만나봤는데 무슨 생각하는지 1도 모르겠음... 속을 모르겠음... 제발 알려 줘 얄 아려 줘 알목木 알 알 려 줘 알려주며ㅕㄴ 올해안에여자생김ㅅㄱ",
        "likeCount": 3,
        "commentCount": 2
      },
      {
        "articleId": 2,
        "createdAt": "2025-01-20 23:12:00",
        "boardType": "신금",
        "celestialStem": "기토",
        "title": "이게 뭐임?",
        "content": "뭐임 이게???????????????????????????????????",
        "likeCount": 3,
        "commentCount": 2
      }];

  return (
    <div className="article-list p-4">
      {articles.map((article) => (
        <div 
          key={article.articleId}
          className="article-card bg-white p-4 mb-4 rounded-lg shadow cursor-pointer"
          onClick={() => onArticleClick(article.articleId)}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">{article.boardType}</span>
            <span className="text-sm text-gray-500">{article.celestialStem}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-700 line-clamp-2">{article.content}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              좋아요 {article.likeCount} · 댓글 {article.commentCount}
            </span>
            <span className="text-sm text-gray-500">{article.createdAt}</span>
          </div>
        </div>
      ))}
      {/* {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          className="w-full p-2 bg-gray-100 rounded-lg mt-4"
        >
          더 보기
        </button>
      )} */}
    </div>
  );
}

export default ArticleList; 