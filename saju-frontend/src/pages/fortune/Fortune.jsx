import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';

function Fortune() {
  const PentagonChart = () => {
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
      <div className="w-full flex justify-center items-center p-4">
        <RadarChart width={300} height={300} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name="능력치"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
        <hr/>
      </div>
    );
  };
  return (
    <div>
      <TopBar />
      <div className="text-lg flex justify-between px-8 py-4 font-gapyeong pt-20 px-20">
        <h1>오늘의 운세</h1>
        <h1>80점</h1>
      </div>
      <PentagonChart/>
      <BottomNav />
    </div>
  );
}

export default Fortune;
