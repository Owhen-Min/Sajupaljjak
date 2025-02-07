function SajuColumn({ label = '', top, bottom, horizontal = false }) {
  const containerClasses = `flex ${horizontal ? 'flex-row gap-2' : 'flex-col'}`;
  const characterBoxClasses = "w-[80px] h-[80px] flex items-center justify-center rounded-2xl overflow-hidden border";

  // 천간 오행 매핑
  const skyStemMapping = {
    '갑': { element: '목', hanja: '甲' },
    '을': { element: '목', hanja: '乙' },
    '병': { element: '화', hanja: '丙' },
    '정': { element: '화', hanja: '丁' },
    '무': { element: '토', hanja: '戊' },
    '기': { element: '토', hanja: '己' },
    '경': { element: '금', hanja: '庚' },
    '신': { element: '금', hanja: '辛' },
    '임': { element: '수', hanja: '壬' },
    '계': { element: '수', hanja: '癸' }
  };

  // 지지 오행 매핑
  const earthBranchMapping = {
    '인': { element: '목', hanja: '寅' },
    '묘': { element: '목', hanja: '卯' },
    '사': { element: '화', hanja: '巳' },
    '오': { element: '화', hanja: '午' },
    '진': { element: '토', hanja: '辰' },
    '술': { element: '토', hanja: '戌' },
    '축': { element: '토', hanja: '丑' },
    '미': { element: '토', hanja: '未' },
    '신': { element: '금', hanja: '申' },
    '유': { element: '금', hanja: '酉' },
    '해': { element: '수', hanja: '亥' },
    '자': { element: '수', hanja: '子' }
  };

  // 오행 색상 매핑 추가
  const elementColors = {
    '목': 'bg-green-100 text-green-800',
    '화': 'bg-red-100 text-red-800',
    '토': 'bg-yellow-100 text-yellow-800',
    '금': 'bg-gray-50 text-gray-800',
    '수': 'bg-gray-800 text-white'
  };

  const renderCharacterWithElement = (char, mapping) => {
    const info = mapping[char];
    if (!info) return char;

    const colorClasses = elementColors[info.element];

    return (
      <div className={`text-center ${colorClasses} w-full h-full flex flex-col items-center justify-center`}>
        <div className="text-sm">{info.element}</div>
        <div className="text-2xl">{info.hanja}</div>
        <div className="text-sm opacity-75">{char}</div>
      </div>
    );
  };

  return (
    <div className={`${containerClasses} font-dokrip`}>
      <div className="text-lg text-gray-600 mb-1">{label}</div>
      <div className={`${!horizontal && 'rounded-b-none'} py-2`}>
        <div className="flex justify-center">
          {[...top].map((char, index) => (
            <div key={`top-${index}`} className={characterBoxClasses}>
              {renderCharacterWithElement(char, skyStemMapping)}
            </div>
          ))}
        </div>
      </div>
      <div className={`${!horizontal && 'rounded-t-none'} py-2`}>
        <div className="flex justify-center">
          {[...bottom].map((char, index) => (
            <div key={`bottom-${index}`} className={characterBoxClasses}>
              {renderCharacterWithElement(char, earthBranchMapping)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SajuColumn; 