import SajuColumn from './SajuColumn';
import ElementChart from './ElementChart';

function SajuGrid({ saju, className, title=true, ...props }) {
  // 천간과 지지의 원소 매핑
  const skyStemMapping = {
    '갑': '목', '을': '목', '병': '화', '정': '화', 
    '무': '토', '기': '토', '경': '금', '신': '금',
    '임': '수', '계': '수'
  };

  const earthBranchMapping = {
    '인': '목', '묘': '목', '진': '토', '사': '화',
    '오': '화', '미': '토', '신': '금', '유': '금',
    '술': '토', '해': '수', '자': '수', '축': '토'
  };
  
  return (
    <>
      <div className={`bg-white rounded-xl p-4 shadow-sm ${className}`} {...props}>
        {title && (
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📊 사주 팔자
          </h3>
        )}
        <div className="grid grid-cols-4 gap-1 text-center">
          <SajuColumn 
            label="시주"
            top={saju?.time?.[0]}
            bottom={saju?.time?.[1]}
          />
          <SajuColumn 
            label="일주"
            top={saju?.day?.[0]}
            bottom={saju?.day?.[1]}
          />
          <SajuColumn 
            label="월주"
            top={saju?.month?.[0]}
            bottom={saju?.month?.[1]}
          />
          <SajuColumn 
            label="연주"
            top={saju?.year?.[0]}
            bottom={saju?.year?.[1]}
          />
        </div>
      </div>
    </>
  );
}

export default SajuGrid; 