import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from "../../components/TopBar";
import BottomNav from "../../components/BottomNav";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import CommunityFilterBubble from "../../components/CommunityFilterBubble";
import ArticleList from "../../components/ArticleList";
import { useInfiniteGet } from "../../hooks/useInfiniteGet";
import articles from "../../data/articles.json";

function Community() {
  const [selectedElement, setSelectedElement] = useState('전체');
  const [selectedPillar, setSelectedPillar] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  // const { data, fetchNextPage, hasNextPage, isLoading, error } = useInfiniteGet("/api/community", { type: "", query: "" });
  // if (isLoading) return <div>로딩중 ...</div>;
  // if (error) return <div>에러 : {error.message}</div>;
  const data = articles;
  return (
    <div className="community community-page h-screen flex flex-col relative py-14">
      <TopBar />
      <div className="flex-grow overflow-y-auto relative scrollbar-hidden">
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
<<<<<<< HEAD
            children="⌕"
            onClick={() => console.log(searchQuery)}
            className="w-[50px] h-[40px] text-2xl"
=======
            children="🔍"
            onClick={() => console.log(searchQuery)}
            className="w-[50px] h-[40px] text-2xl py-0 bg-[#f8f8f7] hover:bg-[#a9a59f] border border-gray-300"
>>>>>>> front
          />
        </div>
        <ArticleList 
          articles={data}
        />
      </div>
      <MainButton 
<<<<<<< HEAD
        children="✎"
        onClick={() => navigate('/community/write')}
        className="fixed bottom-[calc(17%)] right-[calc(50%-180px+1rem)] w-[60px] h-[60px] rounded-full text-2xl shadow-lg max-[400px]:right-5 max-[320px]:right-5"
=======
        children="✏️"
        onClick={() => navigate('/community/write')}
        className="fixed bg-[#bcb8b1] hover:bg-[#a9a59f] bottom-[calc(17%)] right-[calc(50%-180px+1rem)] w-[60px] h-[60px] rounded-full text-4xl shadow-lg max-[400px]:right-5 max-[320px]:right-5 text-center"
>>>>>>> front
      />
      <BottomNav />
    </div>
  );
}

export default Community;
