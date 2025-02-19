import { TopBar2 } from "../../components/TopBar2";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import SajuColumn from "../../components/SajuColumn";
import { useGet } from "../../hooks/useApi";

function CoupleCompatibility() {
  const { data: coupleData, isPending, error } = useGet(`/api/fortune/couple-lifetime`);
  useEffect(() => {
    if (coupleData) {
      setData(coupleData);
    }
  }, [coupleData]);

  const [data, setData] = useState({
    "id": 0,
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
        mainText="커플 궁합"
      />
      <div className="px-4 space-y-4 mt-3">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            ✨ 총운
          </h3>
          <div className="text-gray-600 text-[15px] leading-7">
            <ReactMarkdown>{data.harmony}</ReactMarkdown>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🌟 케미
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
  );
}

export default CoupleCompatibility;