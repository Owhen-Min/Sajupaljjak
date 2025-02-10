import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from "../../components/TopBar";
import BottomNav from "../../components/BottomNav";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import CommunityFilterBubble from "../../components/CommunityFilterBubble";
import ArticleList from "../../components/ArticleList";

function Community() {
  const [selectedElement, setSelectedElement] = useState('전체');
  const [selectedPillar, setSelectedPillar] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const pillars = [
    '전체', '갑목', '을목', '병화', '정화', '무토',
    '기토', '경금', '신금', '임수', '계수'
  ];


  return (
    <div className="community-page flex flex-col h-screen">
      <TopBar />
      <div className="flex-grow overflow-y-auto">
        <CommunityFilterBubble 
          selectedElement={selectedElement} 
          selectedPillar={selectedPillar}
          onElementSelect={setSelectedElement}
          onPillarSelect={setSelectedPillar}
          onClick={() => {
            console.log(selectedElement);
            console.log(selectedPillar);
          }
          }
        />
        <div className="flex items-center gap-3 px-4 pt-4 mb-2">
          <Input 

            type="text" 
            placeholder="게시글 검색하기" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-4/5"
          />
          <MainButton 
            children="검색"

            onClick={() => navigate('/community/write')}
            half={true}
            className="w-1/5 py-4"
          />
        </div>
        <div className="px-4 py-2 flex items-center justify-between gap-3">
          <MainButton 
            children="글쓰기"
            onClick={() => navigate('/community/write')}
            half={true}
            className="w-full py-2"
          />
        </div>
        <ArticleList 
          onArticleClick={(articleId) => navigate(`/community/${articleId}`)}
          className="pb-12"
        />
      </div>
      <BottomNav />
    </div>
  );
}

export default Community;
