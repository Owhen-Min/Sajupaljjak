import { TopBar2 } from "../../components/TopBar2";
import Input from "../../components/Input";
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from "react";
import SajuUserBubble from '../../components/SajuUserBubble';
import MainButton from "../../components/MainButton";

function CommunityModify() {
  const { postId } = useParams();

  const article = {
    "articleId": postId,
    "createdAt": "2025-02-07 00:00:00",
    "boardType": "신금",
    "celestialStem": "무토",
    "title": "어쩌지?",
    "content": "신금 친구랑 싸웠는데, 이 성격 대체 어떻게 이해해야 할까요?\n\n정말 이해가 안 되는데 어떻게 해결해야 할까요? 고민이 많습니다...\n\n도와주세요 ㅠㅠ",
    "likeCount": 7,
    "commentCount": 4
  };

  const [formData, setFormData] = useState({
    title: article.title,
    content: article.content,
    celestialStem: article.boardType,
  });

  const [errors, setErrors] = useState({
    title: false,
    content: false,
    celestialStem: false,
  });

  const validateForm = () => {
    const newErrors = {
      title: formData.title.trim() === '',
      content: formData.content.trim() === '',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    console.log('게시글 작성:', formData);
    // TODO: API 호출 로직 추가
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="community-write flex flex-col h-screen">
      <TopBar2 
        url="/community"
        mainText="게시글 작성"
      />
      

      <div className="flex flex-col p-4 gap-4">
        <div className="flex items-center py-1">
          <span className="font-dokrip">
            <SajuUserBubble skyElement={article.boardType} size={"large"}/> 게시판
          </span>
        </div>
        <div>
          <Input
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full"
          />
          {errors.title && <ErrorBubble>제목을 입력해주세요</ErrorBubble>}
        </div>
        
        <div>
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full h-[300px] px-4 py-[15px] text-base border border-gray-300 rounded-lg resize-none
              focus:outline-none focus:border-[#ff6842] focus:ring-2 focus:ring-[#4CAF50]/20"
          />
          {errors.content && <ErrorBubble>내용을 입력해주세요</ErrorBubble>}
        </div>

        <MainButton 
          className="w-full py-3"
          onClick={handleSubmit}
        >
          수정하기
        </MainButton>
      </div>
    </div>
  );
}

export default CommunityModify;