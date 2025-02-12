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

  return (
    <div className="community community-page h-screen flex flex-col">
      <TopBar />
      <div className="flex-grow overflow-y-auto relative">
        <CommunityFilterBubble 
          selectedElement={selectedElement} 
          selectedPillar={selectedPillar}
          onElementSelect={setSelectedElement}
          onPillarSelect={setSelectedPillar}
        />
        <div className="flex items-center gap-3 px-4 pt-2">
          <Input 
            type="text" 
            placeholder="게시글 검색하기" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-[7px]"
          />
          <MainButton 
            children="⌕"
            onClick={() => console.log(searchQuery)}
            className="w-[50px] h-[40px] text-2xl"
          />
        </div>
        <ArticleList 
          selectedElement={selectedElement}
          selectedPillar={selectedPillar}
          onArticleClick={(articleId) => navigate(`/community/${articleId}`)}
          className="pb-12"
        />
      </div>
      <MainButton 
        children="✎"
        onClick={() => navigate('/community/write')}
        className="fixed bottom-[calc(17%)] right-[calc(50%-180px+1rem)] w-[60px] h-[60px] rounded-full text-2xl shadow-lg max-[400px]:right-5 max-[320px]:right-5"
      />
      <BottomNav />
    </div>
  );
}

export default Community;
