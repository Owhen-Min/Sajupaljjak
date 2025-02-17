// Fortune.jsx
import React from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import BottomNav from "../../components/BottomNav";
import { FiSun, FiUser, FiCalendar, FiTrendingUp } from "react-icons/fi";

// API로부터 받아온 운세 데이터 (예시)

const sajuToday = {
  content:
    "오늘은 당신의 능력과 실력 그리고 성실성을 인정 받을 수 있는 날이 될 것입니다.",
};

const fortuneData = {
  totalScore: 70,
  wealthScore: 100,
  healthScore: 60,
  loveScore: 40,
  studyScore: 70,
  content: {
    total:
      "매사에 조심 또 조심하는 것이 좋습니다. 오늘은 그저 근신하듯 생활반경 안에서 생활해야 합니다. 일상적으로 다니는 곳에서 벗어난다면 작은 사고가 일어날 수 있습니다. 여행을 하실 분은 오늘은 피하는 것이 좋겠고, 피치 못하게 꼭 가야 하는 상황이면 대중교통을 이용하시기 바랍니다. 전체적으로 볼 때 당신의 오늘 운세는 이제 막 우물 밖을 벗어난 개구리에 비교될 수 있습니다. 특히 대인관계에서 상대방을 헐뜯게 되는 실수를 함으로써 문제가 커질 수도 있습니다. 경거망동을 삼가하고 알게 된지 얼마 안 된 사람과는 어느 정도의 거리를 두세요.",
    wealth:
      "어둠이 거치고 햇살이 드는 형국입니다. 어려움에도 불구하고 인내한 덕분에 금전적으로 많은 이득이 생길 것입니다.",
    love: "서두르지 말고 편안한 마음을 지녀야 합니다. 조급하게 행동한다면 상대가 다시 보게 될 것이고, 마이너스 효과만 가져올 것입니다.",
    health:
      "외부 자극에 민감한 때입니다. 철저한 몸 관리를 통해 사전 예방해야 합니다. 소홀하면 지병이 재발하거나 합병증이 생길 수 있습니다.",
    study:
      "마음이 안정되면서 좋은 성과가 예상됩니다. 이전 노력이 보상받으며 더 큰 의욕을 불러일으킬 것입니다.",
  },
};

// RadarChart에 사용할 데이터: 재물운, 건강운, 연애운, 학업운
const radarData = [
  { subject: "총점", value: fortuneData.totalScore, fullMark: 100 },
  { subject: "재물운", value: fortuneData.wealthScore, fullMark: 100 },
  { subject: "건강운", value: fortuneData.healthScore, fullMark: 100 },
  { subject: "연애운", value: fortuneData.loveScore, fullMark: 100 },
  { subject: "학업운", value: fortuneData.studyScore, fullMark: 100 },
];

const Fortune = () => {
  const navigate = useNavigate();

  if (isPending) return <div>로딩중 ...</div>;
  if (error) return <div>에러 : {error.message}</div>;
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-NanumR">
      <Header />

      <div className="flex-grow overflow-y-auto pt-5 px-4 flex flex-col items-center">
        {/* 상단 오늘의 운세 메시지 */}
        <div className="mt-2 text-left w-full max-w-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            오늘의 운세 요약
          </h2>
        </div>
        <div className="w-full bg-white rounded-md shadow p-4 mb-4">
          <p className=" text-sm text-gray-800">{sajuToday.content}</p>
        </div>
        <div className="mt-2 text-left w-full max-w-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            오늘의 운세 점수
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-md p-2 mb-4">
          {/* 총점 표시 */}
          <div className="w-full  p-2 mb-2">
            <h1 className="text-center text-xl font-semibold text-gray-700">
              오늘의 운세 총점 : {fortuneData.totalScore}점
            </h1>
          </div>

          {/* RadarChart */}

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
              />
            </RadarChart>
          </div>
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
