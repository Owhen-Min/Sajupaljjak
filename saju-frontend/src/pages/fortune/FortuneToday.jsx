import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useGet } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function FortuneToday() {
  const { data, isPending, error } = useGet("/api/fortune/today");

  useEffect(() => {
    if (data) {
      setToday(data);
    }
  }, [data]);

  const [today, setToday] = useState({
    totalScore: 0,
    wealthScore: 0,
    healthScore: 0,
    loveScore: 0,
    studyScore: 0,
    content: {
      total: "",
      wealth: "",
      love: "",
      health: "",
      study: "",
    },
  });

  if (isPending) return <div>로딩중 ...</div>;
  if (error) return <div>에러 : {error.message}</div>;
  return (
    <div className="font-NanumR flex flex-col items-center relative mx-auto">
      <Header />
      <div className="px-4">
        {today && (
          <div className="mt-6 space-y-6">
            {/* 점수 개요 섹션 */}
            <div className="bg-gray-50 rounded-2xl p-6">
              {/* 총운 점수 */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">총운</h2>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {today.totalScore}점
                </div>
              </div>

              {/* 세부 점수 그리드 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-gray-700 font-semibold">재물운</h3>
                  <div className="text-2xl font-bold text-blue-500 mt-1">
                    {today.wealthScore}점
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-gray-700 font-semibold">건강운</h3>
                  <div className="text-2xl font-bold text-blue-500 mt-1">
                    {today.healthScore}점
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-gray-700 font-semibold">애정운</h3>
                  <div className="text-2xl font-bold text-blue-500 mt-1">
                    {today.loveScore}점
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="text-gray-700 font-semibold">학업운</h3>
                  <div className="text-2xl font-bold text-blue-500 mt-1">
                    {today.studyScore}점
                  </div>
                </div>
              </div>
            </div>

            {/* 상세 운세 내용 */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  🌟 총운
                </h3>
                <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
                  <ReactMarkdown>{today.content.total}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  💰 재물운
                </h3>
                <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
                  <ReactMarkdown>{today.content.wealth}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  ❤️ 애정운
                </h3>
                <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
                  <ReactMarkdown>{today.content.love}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  🏥 건강운
                </h3>
                <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
                  <ReactMarkdown>{today.content.health}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  📚 학업운
                </h3>
                <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
                  <ReactMarkdown>{today.content.study}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="relative h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">오늘의 운세</h1>
      <div
        className="absolute left-4 text-xl cursor-pointer text-white "
        onClick={() => navigate("/fortune")}
      >
        <IoArrowBack />
      </div>
    </header>
  );
}

export default FortuneToday;
