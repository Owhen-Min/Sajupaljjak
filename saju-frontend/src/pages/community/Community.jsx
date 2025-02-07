import { useState } from 'react';
import TopBar from "../../components/TopBar";
import BottomNav from "../../components/BottomNav";
import CommunityFilterBubble from "../../components/CommunityFilterBubble";
import ArticleList from "../../components/ArticleList";
import ArticleDetail from "../../components/ArticleDetail";

function Community() {
  const [selectedElement, setSelectedElement] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

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
          onArticleClick={(articleId) => setSelectedArticleId(articleId)}
        />
        {selectedArticleId && (
          <ArticleDetail 
            articleId={selectedArticleId}
            onClose={() => setSelectedArticleId(null)}
          />
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export default Community;
