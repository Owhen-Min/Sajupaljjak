import { TopBar2 } from "../../components/TopBar2";
import useFetchData from '../../hooks/useFetchData';
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import SajuGrid from '../../components/SajuGrid';

function FortuneLife() {
  const [data, setData] = useState({
    "id": 1,
    "characteristic": "당신의 사주는 매우 독특한 특징을 가지고 있습니다. 기본적으로 강한 의지력과 창의성이 돋보이며, 이는 당신의 인생 전반에 걸쳐 큰 영향을 미칠 것입니다...",
    "flow": "당신의 인생은 크게 세 단계로 나눌 수 있습니다. 초반기(20대~30대)에는 학습과 성장이 주를 이루며, 중반기(40대~50대)에는 안정과 성취를, 후반기(60대 이후)에는 지혜와 여유를 얻게 될 것입니다...",
    "caution": "인생을 살아가면서 특히 주의해야 할 점들이 있습니다. 첫째, 감정적인 판단을 조심해야 합니다. 둘째, 건강관리에 특별한 주의를 기울여야 합니다...",
    "summary": "전반적으로 당신의 사주는 긍정적인 기운을 가지고 있습니다. 강점을 잘 활용하고 약점을 보완한다면, 풍요롭고 의미 있는 삶을 살아갈 수 있을 것입니다...",
  });

  const saju = {
    saju: {
      year: { top: '을', bottom: '해' },
      month: { top: '기', bottom: '묘' },
      day: { top: '임', bottom: '자' },
      time: { top: '정', bottom: '미' },
    }
  };

  // const { data: fetchedData, isLoading, error } = useFetchData('/api/fortune/lifetime', "FortuneLife");

  // useEffect(() => {
  //   if (fetchedData) {
  //     setData(fetchedData);
  //   }
  // }, [fetchedData]);

  return (
    <div className="container mx-auto max-w-3xl pb-5">
      <TopBar2
        url='/fortune'
        mainText="평생 운세"
      />
      <div className="px-4">
        <SajuGrid saju={saju.saju} />
        
        <div className="mt-6 space-y-6">
          {/* 주요 특징 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ✨ 사주의 주요 특징
            </h3>
            <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
              <ReactMarkdown>{data.characteristic}</ReactMarkdown>
            </div>
          </div>

          {/* 운세의 흐름 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🌊 평생 운세의 흐름
            </h3>
            <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
              <ReactMarkdown>{data.flow}</ReactMarkdown>
            </div>
          </div>

          {/* 유의할 점 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ⚠️ 유의할 점
            </h3>
            <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
              <ReactMarkdown>{data.caution}</ReactMarkdown>
            </div>
          </div>

          {/* 요약 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 요약
            </h3>
            <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
              <ReactMarkdown>{data.summary}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FortuneLife;