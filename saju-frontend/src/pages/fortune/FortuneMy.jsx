import SajuGrid from "../../components/SajuGrid";
import TopBar2 from "../../components/TopBar2";
import ElementChart from "../../components/ElementChart";

function FortuneMy() {
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

  // 테스트 데이터
  const data = {
    saju: {
      year: '을해',
      month: '기묘',
      day: '임자',
      time: '정미',
    }
  };

  // 원소 개수 계산
  const calculateElementCounts = () => {
    const counts = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
    
    Object.values(data.saju).forEach(pillar => {
      const skyElement = skyStemMapping[pillar[0]];
      const earthElement = earthBranchMapping[pillar[1]];
      if (skyElement) counts[skyElement]++;
      if (earthElement) counts[earthElement]++;
    });


    return counts;
  };

  const elementCounts = calculateElementCounts();

  return (
    <div>
      <TopBar2
        url='/fortune'
        mainText="나의 사주"
      />
      <div className="px-4">
        <SajuGrid 
          saju={data.saju} 
        />
      <ElementChart elementCounts={elementCounts} />
      </div>

    </div>
  );
}

export default FortuneMy;