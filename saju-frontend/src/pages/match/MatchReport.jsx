import { useParams } from "react-router-dom";
import useGet from "../../hooks/useGet";

// 테스트 데이터
import { testUsers } from "../../data/user";
import BottomNav from "../../components/BottomNav";
import TopBar2 from "../../components/TopBar2";

function MatchReport() {
   const { userId } = useParams();
   const user = testUsers.find((user) => user.id === parseInt(userId));

  // const { data, isLoading, error } = useGet(
  //   `/api/match/${userId}`,
  //   "matchData"
  // );
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading match data</p>;

  return (
    <div>
      <TopBar2/ >
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
