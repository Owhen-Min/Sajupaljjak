import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from "../../components/TopBar";
import BottomNav from "../../components/BottomNav";
import CommunityFilterBubble from "../../components/CommunityFilterBubble";
import ArticleList from "../../components/ArticleList";

function Community() {
  const [selectedElement, setSelectedElement] = useState('all');
  const navigate = useNavigate();

  return (
    <div className="community-page flex flex-col h-screen">
      <TopBar />
      <div className="flex-grow overflow-y-auto">
        <CommunityFilterBubble 
          selectedElement={selectedElement} 
          onElementSelect={setSelectedElement}
        />
        <ArticleList 
          selectedElement={selectedElement}
          onArticleClick={(articleId) => navigate(`/community/${articleId}`)}
        />
      </div>
      <BottomNav />
    </div>
  );
}

export default Community;
