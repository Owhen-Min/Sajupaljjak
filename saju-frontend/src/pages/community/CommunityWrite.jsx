import { TopBar2 } from "../../components/TopBar2";
import Input from "../../components/Input";
import CommunityFilterBubble from "../../components/CommunityFilterBubble";
import { useState } from "react";
import SajuUserBubble from '../../components/SajuUserBubble';
import MainButton from "../../components/MainButton";

function ErrorBubble({ children }) {
  return (
    <div className="text-red-500 bg-red-50 px-3 py-2 rounded relative mt-2 text-sm before:content-[''] before:absolute before:-top-1.5 before:left-5 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-red-50">
      {children}
    </div>
  );
}

function CommunityWrite() {
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    celestialStem: '',
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
      celestialStem: !selectedPillar,
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

  // pillar가 선택될 때 formData도 함께 업데이트하는 함수
  const handlePillarSelect = (pillar) => {
    setSelectedPillar(pillar);
    setFormData(prev => ({
      ...prev,
      celestialStem: pillar,
    }));
  };

  return (
    <div className="community community-write flex flex-col relative h-screen pt-12">
      <TopBar2 
        url="/community"
        mainText="게시글 작성"
      />
      
      <CommunityFilterBubble
        selectedElement={selectedElement}
        onElementSelect={setSelectedElement}
        onPillarSelect={handlePillarSelect}
        showAll={false}
        selectingElement={false}
      />

      {selectedPillar && <div className="flex flex-col p-4 gap-4">
        {selectedPillar && (
          <div className="flex items-center py-1">
            <span className="font-dokrip">
              <SajuUserBubble skyElement={selectedPillar} size={"large"}/> 게시판
            </span>
          </div>
        )}

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
          작성하기
        </MainButton>
      </div>
      }
    </div>
  );
}

export default CommunityWrite;