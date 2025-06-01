import { TopBar2 } from "../../components/TopBar2";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import SajuColumn from "../../components/SajuColumn";
import { useGet } from "../../hooks/useApi";

function CoupleFortuneYear() {
  const { data: coupleData, isPending, error } = useGet(`/api/fortune/couple-new-year`);
    useEffect(() => {
      if (coupleData) {
        setData(coupleData);
      }
    }, [coupleData]);
  
    const [data, setData] = useState({
      "id": 12,
      "siju": "해",
      "ilju": "갑자",
      "harmony": "",
      "chemi": "",
      "good": "",
      "bad": "",
      "advice": ""
    });
    if (isPending) return <div>로딩중</div>;
    if (error) return <div>{error}</div>;

  return (
    <div className="fortune flex flex-col items-center relative pt-[60px] pb-5">
      <TopBar2
        url='/couple'
        mainText="2025년 커플 운세"
      />
      <div className="px-4 mt-3 space-y-6">
        <div className="bg-white rounded-2xl py-2 p-6 text-center justify-center">
          <h2 className="text-xl font-bold text-gray-800">2025년 사주</h2>
          <div className="flex justify-center items-center">
            <SajuColumn 
              top='을'
              bottom='사'
              horizontal={true}
            />
          </div>
          <div className="text-start text-gray-600 text-[15px] leading-7">
            <ReactMarkdown>2025년은 **을목**과 **사화**의 해입니다.</ReactMarkdown>
            <ReactMarkdown>**을목**은 부드럽지만 강한 생명력을 가진 나무로, 성장과 협력, 창의성을 상징합니다.</ReactMarkdown>
            <ReactMarkdown>**사화**는 여름의 불꽃처럼 활발하고 열정적인 기운을 지니며, 기술 발전과 도전적인 분위기를 이끕니다.</ReactMarkdown>
          </div>
        </div>

        {/* 상세 운세 내용 */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ✨ 올해의 총운
            </h3>
            <div className="text-gray-600 text-[15px] leading-7">
              <ReactMarkdown>{data.harmony}</ReactMarkdown>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🌟 올해의 케미
            </h3>
            <div className="text-gray-600 text-[15px] leading-7">
              <ReactMarkdown>{data.chemi}</ReactMarkdown>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🎶 좋은 점
            </h3>
            <div className="text-gray-600 text-[15px] leading-7">
              <ReactMarkdown>{data.good}</ReactMarkdown>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ⚠️ 주의사항
            </h3>
            <div className="text-gray-600 text-[15px] leading-7">
              <ReactMarkdown>{data.bad}</ReactMarkdown>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 조언
            </h3>
            <div className="text-gray-600 text-[15px] leading-7">
              <ReactMarkdown>{data.advice}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoupleFortuneYear;