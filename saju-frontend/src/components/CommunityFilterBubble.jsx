import { useState, useEffect } from 'react';
import SajuUserBubble from './SajuUserBubble';

function CommunityFilterBubble({ 
  selectedElement, 
  selectedPillar,
  onElementSelect, 
  onPillarSelect,
  selectingElement = true, // true: 천간만 선택 가능, false: 오행도 선택 가능
  showAll = true, // 전체 옵션 표시 여부
  ...props 
}) {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // 오행 필터 옵션 - showAll prop에 따라 필터링
  const elementFilters = [
    ...(showAll ? [{ id: 'all', label: '전체', color: 'bg-white text-gray-800 border-gray-300' }] : []),
    { id: '목', label: '목', color: 'bg-green-100 text-green-800 border-green-300' },
    { id: '화', label: '화', color: 'bg-red-100 text-red-800 border-red-300' },
    { id: '토', label: '토', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { id: '금', label: '금', color: 'bg-gray-50 text-gray-800 border-gray-300' },
    { id: '수', label: '수', color: 'bg-gray-800 text-white border-gray-900' }
  ];

  // 오행별 천간 매핑
  const elementToSkyElements = {
    '목': ['갑목', '을목'],
    '화': ['병화', '정화'],
    '토': ['무토', '기토'],
    '금': ['경금', '신금'],
    '수': ['임수', '계수']
  };

  const handleButtonClick = (filterId) => {
    if (selectingElement && filterId !== 'all') {
      // 오행 버튼 클릭 시 드롭다운만 토글
      onElementSelect(filterId);
      onPillarSelect(null); // pillar 선택 초기화
      setOpenDropdownId(openDropdownId === filterId ? null : filterId);
    } else {
      // '전체' 버튼이나 selectingElement가 false일 때는 element 선택
      onElementSelect(filterId);
      onPillarSelect(null); // pillar 선택 초기화
      setOpenDropdownId(null);
    }
  };

  const handleSkyElementClick = (skyElement) => {
    onPillarSelect(skyElement);
    setOpenDropdownId(null);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.relative')) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId) {
      document.addEventListener('click', closeDropdown);
    }

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [openDropdownId]);

  return (
    <div className="flex flex-col items-center gap-3" {...props}>
      <div className="flex gap-3 pt-5 pb-0 justify-center">
        {elementFilters.map((filter) => (
          <div key={filter.id} className="relative">
            <button
              onClick={() => handleButtonClick(filter.id)}
              className={`
                px-4 py-2 rounded-full border
                ${filter.color}
                ${selectedElement === filter.id ? 'ring-2 ring-offset-2' : ''}
                transition-all duration-200 
                hover:opacity-80 cursor-pointer
                font-dokrip text-sm
              `}
            >
              {filter.label}
            </button>
            
            {/* 드롭다운 메뉴 */}
            {filter.id !== 'all' && openDropdownId === filter.id && (
              <div className="absolute z-10 mt-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
                  {elementToSkyElements[filter.id]?.map((skyElement) => (
                    <div 
                      key={skyElement}
                      onClick={() => handleSkyElementClick(skyElement)}
                      className={`cursor-pointer ${selectedPillar === skyElement ? 'ring-2 ring-offset-2' : ''}`}
                    >
                      <SajuUserBubble skyElement={skyElement} size="small" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityFilterBubble;
