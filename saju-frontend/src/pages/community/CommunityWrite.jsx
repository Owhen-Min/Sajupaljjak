import { TopBar2 } from "../../components/TopBar2";
import CommunityFilterBubble from "../../components/CommunityFilterBubble";
import { useState } from "react";

function CommunityWrite() {
  const [selectedElement, setSelectedElement] = useState('전체');
  return (
    <div>
      <TopBar2 
        url="/community"
        mainText="게시글 작성"
      />
      <CommunityFilterBubble
        selectedElement={selectedElement}
        onElementSelect={setSelectedElement}
        selectingElement={false}
        showAll={false}
      />


      <h1>글쓰기</h1>
    </div>
  );
}


export default CommunityWrite;