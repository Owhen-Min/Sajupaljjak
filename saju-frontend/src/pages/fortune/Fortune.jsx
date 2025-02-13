import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { FortuneButton } from "../../components/FortuneButton";

function Fortune() {
  const data = [
    {
      subject: '총운',
      value: 80,
      fullMark: 100,
    },
    {
      subject: '재물운',
      value: 90,
      fullMark: 100,
    },
    {
      subject: '건강운',
      value: 85,
      fullMark: 100,
    },
    {
      subject: '연애운',
      value: 75,
      fullMark: 100,
    },
    {
      subject: '학업운',
      value: 95,
      fullMark: 100,
    },
  ];

  return (
    <div className="fortune flex relative py-[60px] flex-col min-h-screen justify-center gap-y-5 items-center">
      <TopBar />
      <div className="flex flex-col justify-center items-center w-11/12 bg-white rounded-2xl p-5 pb-0 my-2 mb-4 shadow-md bg-opacity-60">
        <div className="flex w-2/5 text-lg bg-gray-50 rounded-3xl font-gapyeong border border-black px-2 items-center text-center justify-center">
          <h1>오늘의 운세<br/>80점</h1>
        </div>
        <PentagonChart data={data}/>
      </div>
      
      {/* <div className="w-11/12 bg-white rounded-2xl p-6 mt-4 shadow-md bg-opacity-60"> */}
        <div className="flex flex-wrap justify-center gap-4 w-full mx-auto">
          <FortuneButton content="오늘의 운세" url="/fortune/today"/>
          <FortuneButton content="나의 사주" url="/fortune/my"/>
          <FortuneButton content="신년 운세" url="/fortune/year"/>
          <FortuneButton content="평생 운세" url="/fortune/life"/>
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
            fill: '#666666',
            fontSize: 17,
            fontFamily: 'dokrip',
            className: 'transition-all duration-300 ease-in-out hover:-translate-y-1'
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
