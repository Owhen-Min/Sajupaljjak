import { useInfiniteQuery } from '@tanstack/react-query';
import useGet from '../hooks/useGet';
import SajuUserBubble from './SajuUserBubble';

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

function ArticleList({ selectedElement, selectedPillar, onArticleClick, className }) {
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

    const articles = [
        {
          "articleId": 20,
          "createdAt": "2025-02-11 09:30:00",
          "boardId": 1,
          "boardType": "갑목",
          "celestialStem": "무토",
          "title": "어쩌지?",
          "content": "신금 친구랑 싸웠는데, 이 성격 대체 어떻게 이해해야 할까요?",
          "likeCount": 7,
          "commentCount": 4
        },
        {
          "articleId": 19,
          "createdAt": "2025-02-11 00:00:00",
          "boardId": 4,
          "boardType": "을목",
          "celestialStem": "을목",
          "title": "내 팔자는?",
          "content": "경금이랑 신금이랑 뭐가 다름? 이해가 안됨.",
          "likeCount": 10,
          "commentCount": 5
        },
        {
          "articleId": 8,
          "createdAt": "2025-02-09 00:00:00",
          "boardId": 1,
          "boardType": "병화",
          "celestialStem": "갑목",
          "title": "궁금해요",
          "content": "신금 친구랑 싸웠는데, 이 성격 대체 어떻게 이해해야 할까요?",
          "likeCount": 1,
          "commentCount": 5
        },
        {
          "articleId": 7,
          "createdAt": "2025-02-08 00:00:00",
          "boardId": 3,
          "boardType": "정화",
          "celestialStem": "무토",
          "title": "내 팔자는?",
          "content": "하... 점괘 보고 왔는데 뭔가 답답함. 누가 좀 알려줘요.",
          "likeCount": 7,
          "commentCount": 0
        },
        {
          "articleId": 6,
          "createdAt": "2025-02-05 00:00:00",
          "boardId": 2,
          "boardType": "무토",
          "celestialStem": "갑목",
          "title": "오늘의 운세",
          "content": "하... 점괘 보고 왔는데 뭔가 답답함. 누가 좀 알려줘요.",
          "likeCount": 10,
          "commentCount": 0
        },
        {
          "articleId": 5,
          "createdAt": "2025-01-23 00:00:00",
          "boardId": 3,
          "boardType": "경금",
          "celestialStem": "무토",
          "title": "내 팔자는?",
          "content": "오늘 기분이 이상한데 이거 운세랑 관련 있을까요?",
          "likeCount": 0,
          "commentCount": 0
        },
        {
          "articleId": 4,
          "createdAt": "2025-01-22 00:00:00",
          "boardId": 4,
          "boardType": "신금",
          "celestialStem": "갑목",
          "title": "어쩌지?",
          "content": "운세 보면 다 나쁜 말만 나오는 거 같은데 왜 그런 거죠?",
          "likeCount": 6,
          "commentCount": 5
        },
        {
          "articleId": 3,
          "createdAt": "2025-01-21 00:00:00",
          "boardId": 1,
          "boardType": "임수",
          "celestialStem": "을목",
          "title": "이거 맞아?",
          "content": "운세 보면 다 나쁜 말만 나오는 거 같은데 왜 그런 거죠?",
          "likeCount": 4,
          "commentCount": 0
        },
        {
          "articleId": 2,
          "createdAt": "2025-01-20 23:12:00",
          "boardType": "계수",
          "celestialStem": "기토",
          "title": "이게 뭐임?",
          "content": "뭐임 이게???????????????????????????????????",
          "likeCount": 3,
          "commentCount": 2
        },
        {
          "articleId": 1,
          "createdAt": "2025-01-20 23:12:00",
          "boardId": 1,
          "boardType": "기토",
          "celestialStem": "기토",
          "title": "경금 뭐임?",
          "content": "나 경금남자 만나봤는데 무슨 생각하는지 1도 모르겠음... 속을 모르겠음... 제발 알려 줘 얄 아려 줘 알목木 알 알 려 줘 알려주며ㅕㄴ 올해안에여자생김ㅅㄱ",
          "likeCount": 3,
          "commentCount": 2
        }
      ];

  // 필터링 로직 추가
  const filteredArticles = articles.filter(article => {
    // '전체' 선택시 모든 게시글 표시
    if (selectedElement === '전체' || !selectedElement) {
      return true;
    }

    // selectedPillar가 있는 경우 정확히 일치하는 게시글만 표시
    if (selectedPillar) {
      return article.boardType === selectedPillar;
    }

    // selectedElement만 있는 경우 해당 원소를 포함하는 게시글 표시
    // 예: '목' 선택시 '갑목'과 '을목' 모두 표시
    return article.boardType.includes(selectedElement);
  });

  return (
    <div className={`article-list p-4 ${className}`}>
      {filteredArticles.map((article) => (
        <div 
          key={article.articleId}
          className="article-card bg-white p-4 mb-4 rounded-lg shadow cursor-pointer opacity-90"
          onClick={() => onArticleClick(article.articleId)}
        >
          <div className="flex items-end gap-2 mb-2">
            <SajuUserBubble skyElement={article.boardType}/>
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