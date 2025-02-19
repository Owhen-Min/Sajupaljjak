// Fortune.jsx
import React, { useEffect, useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import BottomNav from "../../components/BottomNav";
import { FiSun, FiUser, FiCalendar, FiTrendingUp } from "react-icons/fi";
import { useGet } from "../../hooks/useApi";

// API로부터 받아온 운세 데이터 (예시)

const Fortune = () => {
  const navigate = useNavigate();
  const [sajuToday, setSajuToday] = useState({ content: "" });
  const [fortuneData, setFortuneData] = useState({
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
  const [radarData, setRadarData] = useState([
    { subject: "총점", value: 0, fullMark: 100 },
    { subject: "재물운", value: 0, fullMark: 100 },
    { subject: "건강운", value: 0, fullMark: 100 },
    { subject: "연애운", value: 0, fullMark: 100 },
    { subject: "학업운", value: 0, fullMark: 100 },
  ]);

  const { data: sajuData, isPending: sajuIsPending, error: sajuError } = useGet("/api/fortune");
  const {
    data: today,
    isPending: todayIsPending,
    error: todayError,
  } = useGet("/api/fortune/today");

  // 첫 번째 API 응답 처리
  useEffect(() => {
    if (sajuData) {
      setSajuToday(sajuData.content);
    }
  }, [sajuData]);

  // 두 번째 API 응답 처리
  useEffect(() => {
    if (today) {
      setFortuneData(today);
      setRadarData([
        { subject: "총점", value: today.totalScore, fullMark: 100 },
        { subject: "재물운", value: today.wealthScore, fullMark: 100 },
        { subject: "건강운", value: today.healthScore, fullMark: 100 },
        { subject: "연애운", value: today.loveScore, fullMark: 100 },
        { subject: "학업운", value: today.studyScore, fullMark: 100 },
      ]);
    }
  }, [today]);

  // 첫 번째 API가 실패하면 전체 에러 표시
  if (sajuError) return <div>sajuData 에러: {sajuError.message}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-NanumR pb-10">
      <Header />

      <div className="flex-grow overflow-y-auto pt-5 px-4 flex flex-col items-center">
        {/* 상단 오늘의 운세 메시지 */}
        <div className="mt-2 text-left w-full max-w-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            오늘의 운세 요약
          </h2>
        </div>
        <div className="w-full bg-white rounded-md shadow p-4 mb-4">
          <p className="text-sm text-gray-800">
            {sajuIsPending ? "로딩 중..." : sajuData.content}
          </p>
        </div>

        {/* 운세 점수 섹션 */}
        <div className="mt-2 text-left w-full max-w-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            오늘의 운세 점수
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-md p-2 mb-4">
          {todayError ? (
            <div className="text-red-500 text-center p-4">데이터를 불러오는데 실패했습니다.</div>
          ) : (
            <>
              <div className="w-full p-2 mb-2">
                <h1 className="text-center text-xl font-semibold text-gray-700">
                  {todayIsPending ? "로딩 중..." : `오늘의 운세 총점 : ${fortuneData.totalScore}점`}
                </h1>
              </div>

              {!todayIsPending && (
                <div className="w-full flex justify-center">
                  <RadarChart width={350} height={250} data={radarData}>
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#666666", fontSize: 14, fontFamily: "NanumR" }}
                    />
                    <Radar
                      name="운세"
                      dataKey="value"
                      stroke="#ff7070"
                      fill="#ff7070"
                      fillOpacity={0.5}
                      domain={[0, 100]}
                    />
                  </RadarChart>
                </div>
              )}
            </>
          )}
        </div>

        {/* 하단 메뉴: 각 버튼 개별 구성 */}
        <div className="mt-2 text-left w-full max-w-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            소름 돋는 정확한 사주 풀이
          </h2>
        </div>
        <div className="flex bg-white  p-2 shadow-md justify-between items-center w-full rounded-md">
          <button
            onClick={() => navigate("today")}
            className="bg-white justify-center  w-[80px] h-[80px] rounded-md flex flex-col items-center transition text-gray-800"
          >
            <FiSun className="text-2xl mb-2 text-red-700" />
            <span className="text-sm ">오늘의 운세</span>
          </button>
          <button
            onClick={() => navigate("my")}
            className="bg-white justify-center w-[80px] h-[80px] rounded-md flex flex-col items-center transition text-gray-800"
          >
            <FiUser className="text-2xl mb-2" />
            <span className="text-sm">나의 사주</span>
          </button>
          <button
            onClick={() => navigate("year")}
            className="bg-white justify-center w-[80px] h-[80px] rounded-md flex flex-col items-center transition text-gray-800"
          >
            <FiCalendar className="text-2xl mb-2 text-" />
            <span className="text-sm">신년 운세</span>
          </button>
          <button
            onClick={() => navigate("life")}
            className="bg-white justify-center  w-[80px] h-[80px] rounded-md flex flex-col items-center transition text-gray-800"
          >
            <FiTrendingUp className="text-2xl mb-2 text-blue-700" />
            <span className="text-sm">평생 운세</span>
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

function Header() {
  return (
    <header className="h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">운세</h1>
    </header>
  );
}
export default Fortune;
