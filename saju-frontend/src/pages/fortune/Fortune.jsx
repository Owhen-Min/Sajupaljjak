import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { FortuneButton } from "../../components/FortuneButton";
import { useGet } from "../../hooks/useApi";
import { useEffect, useState } from "react";

function Fortune() {
   const { data, isPending, error } = useGet("/api/fortune/today");

  const [data1, setData1] = useState([]);
  useEffect(() => {
    // const data = {
    //   totalScore: 60,
    //   wealthScore: 100,
    //   healthScore: 40,
    //   loveScore: 10,
    //   studyScore: 60,
    //   content: {
    //     total:
    //       "매사에 조심 또 조심하는 것이 좋습니다. 오늘은 그저 근신하듯 생활반경 안에서 생활해야 합니다. 일상적으로 다니는 곳에서 벗어난다면 작은 사고가 일어나게 됩니 다. 여행을 하실 분은 오늘은 피하는 것이 좋겠고 피치 못하게 꼭 가야하는 상황이면 되도록 대중교통을 이용 하시기 바랍니다. 전체적으로 볼 때 당신의 오늘 운세는 이제 막 우물 밖을 벗어난 개구리에 비교될 수 있습니 다. 특히 대인관계에서 상대방을 헐뜯게 되는 실수를 함으로써 문제가 커질 수도 있습니다. 경거망동을 삼가하고 알게 된지 얼마 안된 사람과는 어느 정도의 거리를 두도록 하세요.",
    //     wealth:
    //       "어둠이 거치고 햇살이 드는 형국입니다. 어려움에도 불구하고 인내하고 지내온 덕분에 금전적으로 많은 이득이 생길 것입니다. 물론 기대한 것보다는 작을 수 있으나 이는 자신의 그릇 때문이라 여기는 것이 어떨까 합니다.",
    //     love: "서두르지 말고 편안한 마음을 지녀야 합니다. 만일 조급하게 행동한다면 상대는 당신을 다시 보게 될 것이고 마이너스 효과만 가져올 것입니다. 지금 상대가 바라는 것은 뭔가 여유로운 모습이라고 볼 수 있습니다.",
    //     health:
    //       "외부 환경 자극에 민감한 때입니다. 따라서 여느 때보다 철저한 몸 관리로 사전 예방이 필요합니다. 만약 건강관리가 소홀해지게 되면 지병이 재발되거나 합병증으로 고생할 수 있으며 쉽게 완치가 되기 어려우니 주의를 요합니다.",
    //     study:
    //       "마음이 안정되면서 좋은 성과가 예상됩니다.이전까지 노력을 했는데 좋은 결과가 생기지 않았다면 지금의 순간을 위한 것이라 여겨도 좋습니다. 이전의 노력을 어느 정도 보상받으며 보다 더 의욕도 생길 것입니다.",
    //   },
    // };
    if (data) {
      setData1([
        { subject: "총운", value: data.totalScore, fullMark: 100 },
        { subject: "재물운", value: data.wealthScore, fullMark: 100 },
        { subject: "건강운", value: data.healthScore, fullMark: 100 },
        { subject: "연애운", value: data.loveScore, fullMark: 100 },
        { subject: "학업운", value: data.studyScore, fullMark: 100 },
      ]);
    }
  // }, []);
  }, [data]);

  if (isPending) return <div>로딩중 ...</div>;
  if (error) return <div>에러 : {error.message}</div>;
  return (
    <div className="fortune flex relative py-[60px] flex-col min-h-screen justify-center gap-y-5 items-center">
      <TopBar />
      <div className="flex flex-col justify-center items-center w-11/12 bg-white rounded-2xl p-5 pb-0 my-2 mb-4 shadow-md bg-opacity-60">
        <div className="flex w-2/5 text-lg bg-gray-50 rounded-3xl font-gapyeong border border-black px-2 items-center text-center justify-center">
          {/* <h1>오늘의 운세 : {data1.totalScore}점</h1> */}
          <h1>오늘의 운세 : 80점</h1>
        </div>
        <PentagonChart data={data1} />
      </div>

      {/* <div className="w-11/12 bg-white rounded-2xl p-6 mt-4 shadow-md bg-opacity-60"> */}
      <div className="flex flex-wrap justify-center gap-4 w-full mx-auto">
        <FortuneButton content="오늘의 운세" url="/fortune/today" />
        <FortuneButton content="나의 사주" url="/fortune/my" />
        <FortuneButton content="신년 운세" url="/fortune/year" />
        <FortuneButton content="평생 운세" url="/fortune/life" />
      </div>
      {/* </div> */}
      <BottomNav />
    </div>
  );
}

// PentagonChart를 별도의 컴포넌트로 분리
const PentagonChart = ({ className, data }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center pb-0">
      <RadarChart className="group" width={350} height={280} data={data}>
        <PolarGrid radialLines={false} innerRadius={0} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fill: "#666666",
            fontSize: 17,
            fontFamily: "dokrip",
            className:
              "transition-all duration-300 ease-in-out hover:-translate-y-1",
          }}
        />
        <Radar
          name="능력치"
          dataKey="value"
          stroke="#f4cccc"
          fill="#f4cccc"
          fillOpacity={0.4}
        />
      </RadarChart>
    </div>
  );
};

export default Fortune;
