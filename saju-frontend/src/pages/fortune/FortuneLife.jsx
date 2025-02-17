import { TopBar2 } from "../../components/TopBar2";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SajuGrid from "../../components/SajuGrid";
import { useGet } from "../../hooks/useApi";

const FortuneLife = () => {
  const { data:lifeData, isPending, error } = useGet("/api/fortune/lifetime");
  const { data:sajuData, isPending : isPendingSaju, error : errorSaju } = useGet("/api/fortune/info");

  const [data, setData] = useState({
    id: 0,
    siju: "",
    ilju: "",
    characteristic: "",
    flow: "",
    danger: "",
    advice: "",
  });

  const [saju, setSaju] = useState({
    year: "을해",
    month: "기묘",
    day: "임자",
    time: "정미",
  });

  useEffect(() => {
    if (lifeData) {
      setData(lifeData);
    }
  }, [lifeData]);

  useEffect(() => {
    if (sajuData) {
      setSaju(sajuData.saju);
    }
  }, [sajuData]);

  if (isPending) return <div>로딩중 ...</div>;
  if (error) return <div>에러 : {error.message}</div>;
  if (isPendingSaju) return <div>사주 로딩중 ...</div>;
  if (errorSaju) return <div> 사주 에러 : {errorSaju.message}</div>;
  return (
    <div className="fortune flex flex-col items-center relative mx-auto max-w-3xl pt-10 pb-5">
      <TopBar2 url="/fortune" mainText="평생 운세" />
      <div className="px-4">
        <SajuGrid saju={saju} />

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
              <ReactMarkdown>{data.danger}</ReactMarkdown>
            </div>
          </div>

          {/* 요약 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 요약
            </h3>
            <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
              <ReactMarkdown>{data.advice}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortuneLife;
