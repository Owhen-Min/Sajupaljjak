import { TopBar2 } from "../../components/TopBar2";
import Input from "../../components/Input";
import CommunityFilterBubble from "../../components/CommunityFilterBubble";
import { useState } from "react";
import SajuUserBubble from '../../components/SajuUserBubble';
import MainButton from "../../components/MainButton";
import Dropdown from "../../components/Dropdown";

function ErrorBubble({ children }) {
  return (
    <div className="text-red-500 bg-red-50 px-3 py-2 rounded relative mt-2 text-sm before:content-[''] before:absolute before:-top-1.5 before:left-5 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-red-50">
      {children}
    </div>
  );
}

function CommunityWrite() {
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('게시판을 선택해주세요');
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

  const skyElementOptions = ['갑목', '을목', '병화', '정화', '무토', '기토', '경금', '신금', '임수', '계수'];
    

  const handleSkyElementChange = (e) => {
    handlePillarSelect(e.target.value);
  };

  return (
    <div className="community community-write flex flex-col relative h-screen pt-[60px]">
      <TopBar2 
        url="/community"
        mainText="게시글 작성"
      />
      
      <div className="flex flex-col p-4 gap-4">
        <div className="flex items-center py-1 gap-2">

        <li className="group relative dropdown px-3 py-2 text-black-300 hover:text-black-500 cursor-pointer font-bold text-base uppercase list-none tracking-wide border rounded-lg shadow-sm bg-white">
          {skyElementOptions.includes(selectedPillar) ? (
            <div className="flex items-center gap-2">
              <SajuUserBubble skyElement={selectedPillar} size="normal"/>
              <span>게시판</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {selectedPillar}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
          <div className="group-hover:block dropdown-menu absolute hidden h-auto">

          <ul className="top-0 w-30 bg-white shadow px-6 py-8 :hover-translate-y-1">
              {skyElementOptions.map(option => (
                <li className="py-1" key={option}>
                  <div onClick={() => handlePillarSelect(option)}>
                    <SajuUserBubble skyElement={option} size="normal"/>
                  </div>
                </li>
              ))}
          </ul>
          </div>
      </li>
      {/* <Dropdown
        options={skyElementOptions}
        value={selectedPillar}
        onChange={handleSkyElementChange}
        placeholder="천간을 선택하세요"
        className="w-40"
      />
          <span className="font-dokrip">
            {selectedPillar && <SajuUserBubble skyElement={selectedPillar} size={"large"}/>} 게시판
          </span> */}
        </div>
        {errors.celestialStem && <ErrorBubble>천간을 선택해주세요</ErrorBubble>}

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
    </div>
  );
}

export default CommunityWrite;