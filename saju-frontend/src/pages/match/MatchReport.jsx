import { useParams } from "react-router-dom";
import useGet from "../../hooks/useGet";

// 테스트 데이터
import { testUsers } from "../../data/user";
import BottomNav from "../../components/BottomNav";
import TopBar2 from "../../components/TopBar2";
import SajuGrid from "../../components/SajuGrid";

function MatchReport() {


   const { userId } = useParams();
   const user = testUsers.find((user) => user.id === parseInt(userId));

  // const { data, isLoading, error } = useGet(
  //   `/api/match/${userId}`,
  //   "matchData"
  // );
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading match data</p>;


    
    const saju =  {
      year: { top: '을', bottom: '해' },
      month: { top: '기', bottom: '묘' },
      day: { top: '임', bottom: '자' },
      time: { top: '정', bottom: '미' },
    };

  return (
    <div>
      <TopBar2 />
      <div>
        <img src={user.profileImage} alt={`${user.name}'s profile`} />
      </div>
      <div className="bg-white h-dvh rounded-t-3xl translate-y-[-2%] p-10">
        <div className="mb-2 text-2xl font-semibold font-a">
          {user.nickname}
        </div>
        <div className="mb-2 text-2xl font-semibold font-gapyeong">
          {user.nickname}
        </div>
        <div className="mb-2 text-2xl font-medium font-dokrip">
          {user.nickname}
        </div>
        <SajuGrid saju={saju} />
        <p>{user.score}</p>
        <p>{user.region}</p>
        <p>{user.age}</p>
        <p>{user.memberType}</p>
        <p>{user.introduction}</p>
      </div>

      <BottomNav />
    </div>
  );
}

export default MatchReport;
