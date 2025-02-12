import { useParams } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import TopBar2 from "../../components/TopBar2";
import SajuGrid from "../../components/SajuGrid";
import { useGet } from "../../hooks/useApi";

function MatchReport() {
    const { partnerId} = useParams();

    const { data: user, isLoading, error } = useGet(`/api/match/${partnerId}`);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data.</p>;
    console.log(user);
    
    const saju =  {
      year: '을해',
      month: '기묘',
      day: '임자',
      time: '정미'
    };

  return (
    <div>
      <TopBar2 />
      {/* <div>
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
      </div> */}
      
      <BottomNav />
    </div>
  );
}

export default MatchReport;
