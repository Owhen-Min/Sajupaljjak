import SajuGrid from "../../components/SajuGrid";
import TopBar2 from "../../components/TopBar2";
import ElementChart from "../../components/ElementChart";
import { useGet } from "../../hooks/useApi";
import { useEffect, useState } from "react";

function FortuneMy() {
  // 천간과 지지의 원소 매핑
  const skyStemMapping = {
    갑: "목",
    을: "목",
    병: "화",
    정: "화",
    무: "토",
    기: "토",
    경: "금",
    신: "금",
    임: "수",
    계: "수",
  };

  const earthBranchMapping = {
    인: "목",
    묘: "목",
    진: "토",
    사: "화",
    오: "화",
    미: "토",
    신: "금",
    유: "금",
    술: "토",
    해: "수",
    자: "수",
    축: "토",
  };

  const { data, isPending, error } = useGet("/api/fortune/info");

  const [saju, setSaju] = useState({
    year: "을해",
    month: "기묘",
    date: "임자",
    time: "정미",
  });

  useEffect(() => {
    if (data) {
      setSaju(data);
    }
  }, [data]);


  // 원소 개수 계산
  const calculateElementCounts = () => {
    if (!saju) return { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };  // saju가 없을 경우 기본값 반환
    
    const counts = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };

    Object.values(saju).forEach((pillar) => {
      const skyElement = skyStemMapping[pillar[0]];
      const earthElement = earthBranchMapping[pillar[1]];
      if (skyElement) counts[skyElement]++;
      if (earthElement) counts[earthElement]++;
    });

    return counts;
  };

  if (isPending) return <div>로딩중...</div>;
  if (error) return <div>`에러 : ${error}` </div>;
  
  const elementCounts = calculateElementCounts();
  
  return (
    <div className="font-NanumR flex flex-col items-center relative mx-auto">
      <Header />
      <div className="px-4">
        <div className="mt-6">
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <SajuGrid saju={saju} />
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              원소 분석
            </h3>
            <ElementChart elementCounts={elementCounts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="relative h-12 w-full flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">나의 사주</h1>
      <div
        className="absolute left-4 text-xl cursor-pointer text-white "
        onClick={() => navigate("/fortune")}
      >
        <IoArrowBack />
      </div>
    </header>
  );
}

export default FortuneMy;
