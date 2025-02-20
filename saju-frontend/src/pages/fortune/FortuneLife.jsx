import { TopBar2 } from "../../components/TopBar2";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SajuGrid from "../../components/SajuGrid";
import { useGet } from "../../hooks/useApi";
import { Header } from "../../components/Header";


const FortuneLife = () => {
  const [data, setData] = useState({
    id: 0,
    siju: "",
    ilju: "",
    characteristic: "",
    flow: "",
    danger:"",
    advice:"",
  });
  const [saju, setSaju] = useState();

  const { data:data1, isLoading, error } = useGet("/api/fortune/lifetime");
  const { data:saju1, isLoadingSaju, errorSaju } = useGet("/api/fortune/info");

  
  useEffect(() => {
    if (data1) {
     setData(data1);
    }
  }, [data1]);
  
  useEffect(() => {
    if (saju1) {
      setSaju(saju1);
    }
  }, [saju1]);
  
  if (isLoading) return <div>로딩중 ...</div>;
  if (error) return <div>에러 : {error.message}</div>;

  if (isLoadingSaju) return <div>사주 로딩중 ...</div>;
  if (errorSaju) return <div> 사주 에러 : {errorSaju.message}</div>;
  

  return (
    <div className="font-NanumR flex flex-col items-center relative mx-auto">
      <Header />
      <div className="px-4">
        <div className="mt-6">
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <SajuGrid saju={saju} />
          </div>

          <div className="space-y-4">
            {/* 각 섹션의 스타일 통일 */}
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
    </div>
  );
};

export default FortuneLife;
